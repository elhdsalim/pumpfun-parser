# pumpfun-parser
Real-time gRPC transaction listener for Solana that extracts structured Pump.fun events.


## What it does
- Connects to a Solana gRPC endpoint
- Detects Pump.fun program instructions via its contract address
- Decodes instruction data
- Outputs normalized events (BUY / SELL)

Example output:
```json
{
  "type": "BUY",
  "mint": "...",
  "user": "...",
  "amount": "12345",
  "maxSol": "100000000"
}
```

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Environment
Create a `.env` file and set your RPC / gRPC endpoints.

### 3. Run the parser
```bash
npm run dev
```
---

## Notes

This is an educational / experimental project focused on low-level Solana transaction parsing.