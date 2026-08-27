/**
 * ALL values in this file are placeholders for layout/demo purposes only.
 *
 * Per product requirement: never present fabricated numbers as live
 * blockchain statistics. Real stats stay at 0 / null and are clearly
 * badged "Awaiting launch" in the UI until wired to a real indexer or
 * contract reads. Wire real data fetching in once VAULT100 has an
 * on-chain presence.
 */
export const LIVE_DATA_ENABLED = false;

export interface DashboardStats {
  liquidityLockedUsd: number;
  vaultReservesUsd: number;
  totalVolumeUsd: number;
  holders: number;
}

export const dashboardStats: DashboardStats = {
  liquidityLockedUsd: 0,
  vaultReservesUsd: 0,
  totalVolumeUsd: 0,
  holders: 0,
};

export interface LockEvent {
  id: string;
  amountUsd: number;
}

/**
 * Sample lock events used ONLY to preview the notification component
 * (see components/LockToast.tsx). These are explicitly labeled "Preview"
 * in the UI itself and are not derived from any real transaction. Do not
 * remove the preview badge when reusing this component.
 */
export const demoLockEvents: LockEvent[] = [
  { id: "demo-1", amountUsd: 142.0 },
  { id: "demo-2", amountUsd: 36.75 },
  { id: "demo-3", amountUsd: 891.2 },
];
