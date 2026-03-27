# ⚡ European Electricity Price Monitor

**Real-time electricity prices from 15 European countries**

This Apify actor monitors day-ahead electricity spot prices across Europe using official data sources (ENTSO-E Transparency Platform with Energy-Charts fallback).

Perfect for energy traders, industrial consumers, data analysts, and smart home automation.

---

## 🌍 Supported Countries

| Country | Code | Bidding Zone | Coverage |
|---------|------|--------------|----------|
| 🇩🇪 Germany | DE | 10Y1001A1001A83F | ✅ Full |
| 🇫🇷 France | FR | 10YFR-RTE------C | ✅ Full |
| 🇦🇹 Austria | AT | 10YAT-APG------L | ✅ Full |
| 🇭🇺 Hungary | HU | 10YHU-MAVIR----U | ✅ Full |
| 🇨🇿 Czechia | CZ | 10YCZ-CEPS-----N | ✅ Full |
| 🇸🇰 Slovakia | SK | 10YSK-SEPS-----K | ✅ Full |
| 🇷🇴 Romania | RO | 10YRO-TEL------P | ✅ Full |
| 🇵🇱 Poland | PL | 10YPL-AREA-----S | ✅ Full |
| 🇮🇹 Italy | IT | 10Y1001A1001A73I | ✅ North zone |
| 🇪🇸 Spain | ES | 10YES-REE------0 | ✅ Full |
| 🇳🇱 Netherlands | NL | 10YNL----------L | ✅ Full |
| 🇧🇪 Belgium | BE | 10YBE----------2 | ✅ Full |
| 🇨🇭 Switzerland | CH | 10YCH-SWISSGRIDZ | ✅ Full |
| 🇸🇮 Slovenia | SI | 10YSI-ELES-----O | ✅ Full |
| 🇭🇷 Croatia | HR | 10YHR-HEP------M | ✅ Full |

---

## ✨ Features

- **Official EU data source** (ENTSO-E Transparency Platform)
- **Automatic fallback** to Energy-Charts if ENTSO-E unavailable
- **96 data points per day** (hourly resolution for most markets)
- **Email alerts** when prices exceed threshold
- **No rate limits** on ENTSO-E API (use your own token)
- **Reliable** - runs in Apify's cloud infrastructure

---

## 📥 Input

```json
{
  "countries": ["HU", "AT", "CZ", "DE"],
  "priceThreshold": 200,
  "emailTo": "alerts@example.com",
  "emailFrom": "monitor@example.com",
  "gmailUser": "your-gmail@gmail.com",
  "gmailPass": "your-app-password"
}
```

### Input Parameters

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `countries` | `array` | No | All 15 countries | Which countries to monitor (e.g., `["HU", "DE", "FR"]`) |
| `priceThreshold` | `number` | No | `200` | Alert threshold in EUR/MWh |
| `emailTo` | `string` | No | - | Recipient email for alerts |
| `emailFrom` | `string` | No | `gmailUser` | Sender email address |
| `gmailUser` | `string` | No | - | Gmail address for SMTP |
| `gmailPass` | `string` | No | - | Gmail app password (not regular password!) |

**Note:** Email alerts are optional. If you don't provide Gmail credentials, the actor will still fetch and save data without sending emails.

---

## 📤 Output

```json
{
  "timestamp": "2026-03-27T18:03:45.123Z",
  "date": "2026-03-27",
  "totalCountries": 15,
  "successfulFetches": 15,
  "failedFetches": 0,
  "alertsSent": 12,
  "priceThreshold": 200,
  "primarySource": "ENTSO-E",
  "fallbackSource": "Energy-Charts",
  "countries": [
    {
      "country": "HU",
      "date": "2026-03-27",
      "maxPrice": 277.46,
      "minPrice": 71.65,
      "avgPrice": 141.83,
      "currency": "EUR/MWh",
      "dataPoints": 96,
      "source": "ENTSO-E"
    },
    {
      "country": "DE",
      "date": "2026-03-27",
      "maxPrice": 185.32,
      "minPrice": 45.12,
      "avgPrice": 98.55,
      "currency": "EUR/MWh",
      "dataPoints": 96,
      "source": "ENTSO-E"
    }
  ]
}
```

### Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `country` | `string` | 2-letter country code |
| `date` | `string` | Date in YYYY-MM-DD format |
| `maxPrice` | `number` | Maximum price for the day (EUR/MWh) |
| `minPrice` | `number` | Minimum price for the day (EUR/MWh) |
| `avgPrice` | `number` | Average price for the day (EUR/MWh) |
| `currency` | `string` | Always "EUR/MWh" |
| `dataPoints` | `number` | Number of hourly data points (typically 96 = 4 per hour) |
| `source` | `string` | Data source: "ENTSO-E" or "Energy-Charts" |

---

## 🚀 Use Cases

### 1. **Energy Trading**
Monitor arbitrage opportunities across European markets in real-time.

```javascript
// Example: Find countries with >20% price difference
const data = await Actor.call('your-username/european-electricity-price-monitor');
const prices = data.defaultDatasetId.countries.map(c => ({
  country: c.country,
  price: c.maxPrice
}));
```

### 2. **Industrial Load Shifting**
Schedule energy-intensive operations when prices are lowest.

### 3. **Smart Home Automation**
Automatically charge EVs, run heat pumps, or trigger appliances during cheap electricity hours.

### 4. **Data Analysis & Forecasting**
Build price prediction models using historical patterns.

### 5. **Price Alert Dashboard**
Integrate with Slack/Discord/Telegram for instant notifications.

---

## ⚠️ Limitations

1. **Italy (IT)** - Only covers the North bidding zone (`10Y1001A1001A73I`). Italy has multiple zones; southern zones may differ.
2. **Germany (DE)** - Occasionally experiences ENTSO-E timeouts during peak times. Energy-Charts fallback usually handles this.
3. **Email sending** - Requires a Gmail app password (not your regular Gmail password). Enable 2FA on your Google account first.
4. **Historical data** - This actor fetches **today's prices** only. For historical data, schedule repeated runs and store results in a database.

---

## 📊 Data Sources

### Primary: ENTSO-E Transparency Platform
- **Official EU electricity market data**
- **Token required:** Get yours at https://transparency.entsoe.eu/
- **Format:** XML (parsed automatically by this actor)
- **Reliability:** ~99% uptime, but occasional delays during market updates

### Fallback: Energy-Charts API
- **Open-source project by Fraunhofer ISE**
- **No token needed**
- **Format:** JSON
- **Coverage:** 15 European countries

---

## 🔗 Links

- **GitHub Repository:** https://github.com/Mukedlii/global-electricity-price-monitor
- **Landing Page:** https://energy-saas-landing.vercel.app
- **ENTSO-E Portal:** https://transparency.entsoe.eu/
- **Energy-Charts:** https://www.energy-charts.info/

---

## 📧 Email Alert Setup

### Step 1: Enable Gmail App Passwords

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication (required)
3. Search for "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### Step 2: Configure Actor Input

```json
{
  "emailTo": "your-email@example.com",
  "gmailUser": "your-gmail@gmail.com",
  "gmailPass": "abcd efgh ijkl mnop"
}
```

**Security Note:** Never commit your Gmail app password to GitHub. Use Apify secrets instead.

---

## 🛠️ Development

### Local Testing

```bash
# Clone the repository
git clone https://github.com/Mukedlii/global-electricity-price-monitor.git
cd global-electricity-price-monitor

# Install dependencies
npm install

# Set environment variables (optional)
export APIFY_TOKEN=your_token_here

# Run locally
apify run
```

### Input Example (for local testing)

Create `INPUT.json`:
```json
{
  "countries": ["HU", "AT", "DE"],
  "priceThreshold": 150
}
```

---

## 📜 License

Apache-2.0

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

**Ideas for improvement:**
- Add more bidding zones (e.g., Italy South, Spain islands)
- Support webhook notifications (Slack, Discord, Telegram)
- Add 7-day price forecasting
- Export to CSV/Google Sheets

---

## 📞 Support

- **Email:** mukedlii.project@gmail.com
- **GitHub Issues:** https://github.com/Mukedlii/global-electricity-price-monitor/issues

---

## 🌟 Credits

Built with:
- [Apify SDK](https://sdk.apify.com/)
- [Axios](https://axios-http.com/)
- [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)
- [Nodemailer](https://nodemailer.com/)

Data sources:
- ENTSO-E Transparency Platform (official EU data)
- Energy-Charts by Fraunhofer ISE

---

**⚡ Monitor the pulse of European energy markets!**
