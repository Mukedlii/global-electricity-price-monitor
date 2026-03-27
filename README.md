# European Electricity Price Monitor

⚡ Real-time electricity prices for 15 European countries via Energy-Charts API.

## Features

- 15 countries in parallel (DE, FR, AT, HU, CZ, SK, RO, PL, IT, ES, NL, BE, CH, SI, HR)
- 96 data points/day per country (EUR/MWh)
- Max, min, avg price per country
- Email alert if any country exceeds threshold
- No API key required
- Completes in ~15 seconds

## Input

- countries: array, default all 15
- priceThreshold: integer, default 200 EUR/MWh
- emailTo, gmailUser, gmailPass

## Output

```json
{
  "totalCountries": 15,
  "successfulFetches": 15,
  "alertsSent": 2,
  "countries": [
    {
      "country": "DE",
      "maxPrice": 245.30,
      "minPrice": 87.50,
      "avgPrice": 156.20,
      "currency": "EUR/MWh",
      "dataPoints": 96
    }
  ]
}
```

## Use cases

- Energy traders: arbitrage between countries
- Crypto miners: mine where electricity is cheapest
- Smart home: schedule appliances on cheap hours
- IoT developers: energy-aware automation
- Industrial: optimize production schedules

## Source

**Primary**: ENTSO-E Transparency Platform (official EU)  
**Fallback**: Energy-Charts API (public)

Automatic failover ensures 99%+ uptime.
