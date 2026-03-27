# Global Electricity Price Monitor

Monitor real-time electricity prices across 15 European countries simultaneously. Get instant email alerts when prices spike above your threshold. Perfect for energy traders, smart home developers, data analysts, and cryptocurrency miners.

## 🌍 Supported Countries

Monitor electricity prices in **15 European countries**:

- 🇩🇪 **Germany (DE)**
- 🇫🇷 **France (FR)**
- 🇦🇹 **Austria (AT)**
- 🇭🇺 **Hungary (HU)**
- 🇨🇿 **Czech Republic (CZ)**
- 🇸🇰 **Slovakia (SK)**
- 🇷🇴 **Romania (RO)**
- 🇵🇱 **Poland (PL)**
- 🇮🇹 **Italy (IT)**
- 🇪🇸 **Spain (ES)**
- 🇳🇱 **Netherlands (NL)**
- 🇧🇪 **Belgium (BE)**
- 🇨🇭 **Switzerland (CH)**
- 🇸🇮 **Slovenia (SI)**
- 🇭🇷 **Croatia (HR)**

## ✨ Features

- **Multi-Country Monitoring**: Query all 15 countries in parallel with a single run
- **Real-time Data**: 96 hourly data points per country per day (15-minute intervals)
- **Price Analytics**: Automatic calculation of max, min, and average prices
- **Smart Alerts**: Email notifications when any country exceeds your threshold
- **Fast Performance**: Parallel API calls with 10-second timeout
- **Reliable Source**: Uses Energy-Charts public API (no registration required)
- **EUR/MWh Standard**: All prices in European market standard units

## 📊 Output Format

Each run produces comprehensive data for all monitored countries:

```json
{
  "timestamp": "2026-03-27T08:43:29Z",
  "date": "2026-03-27",
  "totalCountries": 15,
  "successfulFetches": 15,
  "failedFetches": 0,
  "alertsSent": 2,
  "priceThreshold": 200,
  "countries": [
    {
      "country": "DE",
      "date": "2026-03-27",
      "maxPrice": 245.30,
      "minPrice": 87.50,
      "avgPrice": 156.20,
      "currency": "EUR/MWh",
      "dataPoints": 96,
      "source": "Energy-Charts"
    },
    {
      "country": "FR",
      "date": "2026-03-27",
      "maxPrice": 189.40,
      "minPrice": 65.30,
      "avgPrice": 132.10,
      "currency": "EUR/MWh",
      "dataPoints": 96,
      "source": "Energy-Charts"
    }
  ]
}
```

## 🔧 Input Configuration

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `countries` | array | No | All 15 | Country codes to monitor (e.g., ["DE", "FR", "HU"]) |
| `priceThreshold` | integer | No | 200 | Alert threshold in EUR/MWh |
| `emailTo` | string | No | - | Recipient email for alerts |
| `emailFrom` | string | No | - | Sender email (optional) |
| `gmailUser` | string | No | - | Gmail SMTP username |
| `gmailPass` | string | No | - | Gmail app-specific password |

### Gmail Setup for Alerts

1. Enable **2-factor authentication** on your Google account
2. Generate an **app-specific password**: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use this app password in the `gmailPass` field (not your regular password)

## 💡 Use Cases

### Energy Traders
- Monitor price trends across multiple European markets simultaneously
- Identify arbitrage opportunities between countries
- Get instant alerts on unusual price spikes
- Track regional price correlations

### Data Analysts & Researchers
- Collect historical electricity price data for analysis
- Compare energy markets across Europe
- Build predictive models with comprehensive datasets
- Track renewable energy impact on prices

### Smart Home & IoT Developers
- Optimize energy consumption based on real-time prices
- Schedule high-power appliances during low-price periods
- Build energy-aware automation systems
- Reduce electricity costs intelligently

### Cryptocurrency Miners
- Maximize mining profitability by following cheap electricity
- Automatically switch mining locations based on prices
- Avoid high-cost periods across multiple regions
- Optimize data center operations

### Business Intelligence
- Monitor energy costs for multi-country operations
- Forecast energy expenses across European facilities
- Optimize production schedules based on electricity prices
- Track market volatility and trends

## 🚀 How It Works

1. **Parallel Fetching**: Queries Energy-Charts API for all selected countries simultaneously using `Promise.all()`
2. **Data Processing**: Calculates max, min, and average prices from 96 hourly data points per country
3. **Alert Detection**: Identifies countries exceeding the price threshold
4. **Email Notification**: Sends a single consolidated email with all alerts
5. **Data Storage**: Saves complete results to Apify dataset for analysis

## ⏰ Recommended Schedules

- **Hourly**: For active trading and real-time monitoring
- **Every 6 hours**: For regular price tracking
- **Daily at 00:00 UTC**: For daily reports and analytics
- **Every 15 minutes**: For high-frequency trading strategies

## 🛡️ Error Handling

Robust error handling ensures reliability:
- **10-second timeout** per country prevents hanging
- **Graceful degradation**: Failed countries don't stop others
- **Error logging**: All failures reported in output
- **Continues on error**: Actor always completes successfully

## 📈 Performance

- **Fast**: Parallel API calls complete in ~10-15 seconds
- **Efficient**: Single run monitors all 15 countries
- **Scalable**: Add or remove countries as needed
- **Reliable**: Built-in retry logic and error handling

## 🔗 API Source

Data sourced from **Energy-Charts API** (`api.energy-charts.info`):
- Public API, no registration required
- Updated hourly with fresh market data
- Covers major European electricity markets
- Industry-standard EUR/MWh pricing

## 📦 Example Use Case: Multi-Region Mining Optimizer

```javascript
// Pseudocode example
const results = await runApifyActor('global-electricity-price-monitor');
const cheapestCountry = results.countries
  .filter(c => !c.error)
  .sort((a, b) => a.avgPrice - b.avgPrice)[0];

console.log(`Best mining location today: ${cheapestCountry.country}`);
console.log(`Average price: ${cheapestCountry.avgPrice} EUR/MWh`);
// Redirect mining operations to cheapest location
```

## 📄 License

Apache-2.0

## 🔗 Links

- **GitHub**: [github.com/Mukedlii/global-electricity-price-monitor](https://github.com/Mukedlii/global-electricity-price-monitor)
- **Apify Store**: Coming soon
- **Support**: Open an issue on GitHub

---

**Keywords**: electricity prices, energy monitoring, European energy market, electricity price alerts, smart home automation, cryptocurrency mining optimization, energy trading, IoT energy management, real-time electricity data, EUR/MWh prices
