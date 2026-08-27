export const siteConfig = {
  name: "VAULT100",
  ticker: "$V100",
  tagline: "TRADE MEMES. LOCK THE FLOOR.",
  altTagline: "The memecoin whose floor only goes up.",
  description:
    "A Robinhood Chain memecoin designed around a simple idea: every trade permanently locks a little more liquidity into the vault — a floor that can only rise.",
  seoDescription:
    "A liquidity-locking memecoin experiment built for Robinhood Chain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vault100.example",
  x: null as string | null,
} as const;

/**
 * Launch / integration surface. None of these are confirmed live values —
 * everything here is either "not yet configured" or sourced from public
 * research that still needs to be reconfirmed against official docs before
 * go-live. See README for details. Do not treat any address below as
 * verified — they are wired through env vars precisely so nothing here
 * ends up hardcoded and shipped by accident.
 */
function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

export const launchConfig = {
  isLive: process.env.NEXT_PUBLIC_V100_LIVE === "true",
  tokenAddress: envOrNull(process.env.NEXT_PUBLIC_V100_TOKEN_ADDRESS),
  vaultAddress: envOrNull(process.env.NEXT_PUBLIC_V100_VAULT_ADDRESS),
  ponsLaunchUrl: envOrNull(process.env.NEXT_PUBLIC_V100_PONS_URL),
  buyUrl: envOrNull(process.env.NEXT_PUBLIC_V100_BUY_URL),
  lockMechanismDescription: envOrNull(
    process.env.NEXT_PUBLIC_V100_LOCK_MECHANISM,
  ),
} as const;

export const pons = {
  name: "PONS",
  homepage: "https://ponslaunchpad.com/",
  // Contract addresses for the PONS factory/router are intentionally NOT
  // hardcoded here. Confirm current, audited addresses directly from PONS's
  // own documentation/app before wiring any live launch logic, then set
  // them via env vars.
  factoryAddress: envOrNull(process.env.NEXT_PUBLIC_PONS_FACTORY_ADDRESS),
} as const;
