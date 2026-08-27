# VAULT100

**TRADE MEMES. LOCK THE FLOOR.**

A Robinhood Chain memecoin site: every trade is designed to permanently lock
a little more liquidity into the vault, through a mechanism that will be
disclosed and made independently verifiable once it's live. Built as a fast,
premium, mobile-first MVP — no complex DeFi mechanics, no fabricated numbers.
Same visual identity as its sibling project GOLDR (deep black, metallic
gold, premium brokerage feel), reused deliberately for brand consistency
across launches.

## Status: pre-launch

`$V100` has **not launched yet**. The Buy button shows "VAULT100 Not Live
Yet" and every dashboard/transparency figure is either `0` or "Coming at
launch" until real values exist. See `.env.example` for the switches that
turn this on once the token and vault mechanism are real:

- `NEXT_PUBLIC_V100_LIVE` — flips the Buy button to a real link once true
- `NEXT_PUBLIC_V100_TOKEN_ADDRESS` / `..._VAULT_ADDRESS` — shown in the
  Transparency section once set
- `NEXT_PUBLIC_V100_PONS_URL` / `..._BUY_URL` — where Buy/PONS links route
- `NEXT_PUBLIC_V100_LOCK_MECHANISM` — one-line description of the lock
  mechanism, shown once decided

Live on-chain stats (liquidity locked, vault reserves, volume, holders) are
wired through `src/lib/data.ts` and intentionally return `0`/demo values
with a visible badge — swap in real reads (an indexer, subgraph, or direct
contract calls) when the vault mechanism exists. **Never replace the demo
badge with real-looking numbers that aren't backed by verifiable on-chain
data.**

## Important: verify before trusting any address in this repo

- **Robinhood Chain** network details (chain ID `4663`, RPC, explorer) in
  `src/lib/chain.ts` were gathered from public third-party sources, not
  from `docs.robinhood.com/chain` directly. Re-confirm against the official
  docs before mainnet use.
- **PONS** contract/factory addresses are deliberately **not hardcoded**
  anywhere in this codebase. Confirm current addresses directly from PONS's
  own docs/app, then set `NEXT_PUBLIC_PONS_FACTORY_ADDRESS`.
- Robinhood Chain reportedly has **no native gas token** — gas is paid in
  ETH, and there is no official Robinhood Chain airdrop token.

## Stack

Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 + Framer Motion +
wagmi v3 / viem for wallet connect and Robinhood Chain network handling.
No backend.

## Structure

```
src/
  app/            routes, metadata, OG image, icon, robots/sitemap
  components/     Hero, VaultDoor (CSS "3D" vault door visual),
                  StatsDashboard, HowItWorks, LockToast (+ showcase),
                  Transparency, Navbar, Footer, WalletConnect, BuyButton
  lib/
    chain.ts        Robinhood Chain viem chain definition
    wagmiConfig.ts   wagmi config (injected connector only)
    site-config.ts   site copy + launch/PONS config (env-driven)
    data.ts          demo dashboard stats + demo lock events
```

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build & deploy

```bash
npm run build
npm run start
```

Deploys as a standard Next.js app on Vercel — connect the repo, set the env
vars from `.env.example` in the Vercel project settings, deploy.
