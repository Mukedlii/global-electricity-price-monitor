import { Actor } from 'apify';
import axios from 'axios';
import nodemailer from 'nodemailer';

const SUPPORTED_COUNTRIES = ['DE', 'FR', 'AT', 'HU', 'CZ', 'SK', 'RO', 'PL', 'IT', 'ES', 'NL', 'BE', 'CH', 'SI', 'HR'];

await Actor.main(async () => {
    const input = await Actor.getInput();
    const {
        countries = SUPPORTED_COUNTRIES,
        priceThreshold = 200,
        emailTo,
        emailFrom,
        gmailUser,
        gmailPass
    } = input;

    const today = new Date().toISOString().split('T')[0];
    const results = [];
    const alerts = [];

    // Párhuzamos lekérdezés minden országra
    const promises = countries.map(async (country) => {
        try {
            const url = `https://api.energy-charts.info/price?bzn=${country}&start=${today}&end=${today}`;
            
            const response = await axios.get(url, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            const data = response.data;

            if (data.price && Array.isArray(data.price)) {
                const validPrices = data.price.filter(p => p !== null && !isNaN(p));
                
                if (validPrices.length > 0) {
                    const maxPrice = Math.max(...validPrices);
                    const minPrice = Math.min(...validPrices);
                    const avgPrice = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;

                    const result = {
                        country,
                        date: today,
                        maxPrice: parseFloat(maxPrice.toFixed(2)),
                        minPrice: parseFloat(minPrice.toFixed(2)),
                        avgPrice: parseFloat(avgPrice.toFixed(2)),
                        currency: 'EUR/MWh',
                        dataPoints: validPrices.length,
                        source: 'Energy-Charts'
                    };

                    // Alert ha ár > threshold
                    if (maxPrice > priceThreshold) {
                        alerts.push({
                            country,
                            maxPrice: parseFloat(maxPrice.toFixed(2)),
                            threshold: priceThreshold
                        });
                    }

                    console.log(`${country}: OK - ${validPrices.length} prices, max ${maxPrice.toFixed(2)} EUR/MWh`);
                    return result;
                }
            }

            console.log(`${country}: No valid price data`);
            return null;

        } catch (error) {
            console.log(`${country}: Failed - ${error.message}`);
            return {
                country,
                date: today,
                error: error.message,
                source: 'Energy-Charts'
            };
        }
    });

    const fetchedResults = await Promise.all(promises);
    results.push(...fetchedResults.filter(r => r !== null));

    // Email alert küldés ha van riasztás
    if (alerts.length > 0 && emailTo && gmailUser && gmailPass) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: gmailUser,
                    pass: gmailPass
                }
            });

            const alertList = alerts.map(a => 
                `<li><strong>${a.country}</strong>: ${a.maxPrice} EUR/MWh (threshold: ${a.threshold})</li>`
            ).join('');

            await transporter.sendMail({
                from: emailFrom || gmailUser,
                to: emailTo,
                subject: `⚡ Electricity Price Alert - ${alerts.length} Country(s) Above Threshold`,
                html: `
                    <h2>⚡ Global Electricity Price Alert</h2>
                    <p><strong>${alerts.length}</strong> country(s) exceeded the price threshold of <strong>${priceThreshold} EUR/MWh</strong>:</p>
                    <ul>${alertList}</ul>
                    <p><small>Date: ${today} | Source: Energy-Charts</small></p>
                `
            });

            console.log(`Alert sent for ${alerts.length} country(s)`);
        } catch (emailError) {
            console.log('Email send failed:', emailError.message);
        }
    }

    // Output mentése
    await Actor.pushData({
        timestamp: new Date().toISOString(),
        date: today,
        totalCountries: countries.length,
        successfulFetches: results.filter(r => !r.error).length,
        failedFetches: results.filter(r => r.error).length,
        alertsSent: alerts.length,
        priceThreshold,
        countries: results
    });

    console.log(`Done: ${results.length} countries, ${alerts.length} alerts`);
});
