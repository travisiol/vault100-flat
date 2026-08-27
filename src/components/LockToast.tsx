"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { demoLockEvents, type LockEvent } from "@/lib/data";
import { DemoBadge } from "./ui/DemoBadge";

function LockCard({ event }: { event: LockEvent }) {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold-500/25 bg-ink-elevated/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 font-serif text-sm text-gold-300"
          >
            V
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-white/70">
              VAULT100
            </p>
            <p className="text-[11px] text-warm-white/45">
              Liquidity locked
            </p>
          </div>
        </div>
        <DemoBadge label="Preview" />
      </div>
      <p className="mt-3 font-mono text-2xl text-gold-300">
        +${event.amountUsd.toFixed(2)}{" "}
        <span className="text-base text-gold-500/70">LOCKED FOREVER</span>
      </p>
    </div>
  );
}

/**
 * Reusable lock-notification component, styled like a modern brokerage
 * push notification. Intended to (a) later bind to real lock events once
 * the vault mechanism is live, and (b) work well as a standalone screenshot
 * for social. Always carries a visible "Preview" badge while running on
 * demo data — never remove the badge to make demo output look real.
 */
export function LockToast({ event }: { event: LockEvent }) {
  return <LockCard event={event} />;
}

export function LockToastShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % demoLockEvents.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const event = demoLockEvents[index];

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <LockCard event={event} />
        </motion.div>
      </AnimatePresence>
      <p className="max-w-sm text-center text-xs text-warm-white/40">
        Illustrative preview only — no lock mechanism is live yet. This will
        connect to real onchain lock events once {"$V100"} launches and the
        vault mechanism goes live.
      </p>
    </div>
  );
}
