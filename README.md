# StockPriceData-API

The aim of this API is to provide any public data relating to stocks.

## Heatmaps

### Summary

Provides the % price change for companies in the FTSE350 over a number of time periods.

### Endpoint

/api/heatmap/:timePeriod

### Supported Time Periods

- one_month
- three_month
- six_month
- one_year
- two_year

### Example Response

```
[
  {
    "change": -28.857715430861717,
    "ticker": "RAT.L"
  },
  {
    "change": 11.286764705882348,
    "ticker": "EWI.L"
  },
  ...
]
```
