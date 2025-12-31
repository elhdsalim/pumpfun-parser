# pumpfun-parser
Real-time gRPC transaction listener for Solana that extracts structured Pump.fun events.


## What it does
- Connects to a Solana gRPC endpoint
- Detects Pump.fun program instructions via its contract address
- Decodes instruction data
- Outputs normalized events (BUY / SELL)

Example output:
```json
BUY {
  amount: '35764356',
  maxSol: '1990',
  user: 'skars6xP3BoGkGCadQ1WTEtsMiakxRWxK84qyQt5bSS',
  mint: '9rSuKeHvmvPBzaHQAU6aZC6EVJ66uZf5pS4LLqcmpump'
}
SELL {
  amount: '18398570342400',
  minSol: '119524320',
  user: '21bHKRzLuZHDuxKt7KgWJzszS4PF7adhV5t7ViTiY5jz',
  mint: 'F7zgpPVHFbByoYcYoGjWRK2boKs5arcXTkPYKPVMpump'
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