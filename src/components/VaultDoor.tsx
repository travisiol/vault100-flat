"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * A CSS-only "3D-looking" vault door, built from layered radial gradients
 * (door face, bolt ring, center dial) with a mouse-tracked tilt and a slow
 * light sweep. No WebGL / 3D library required.
 */
export function VaultDoor() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(360px circle at ${glowX}% ${glowY}%, rgba(244,231,193,0.3), transparent 70%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 20);
    rotateX.set((0.5 - py) * 16);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const bolts = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);

  return (
    <div
      className="relative mx-auto w-full max-w-md select-none"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.26), transparent 75%)",
        }}
      />

      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto aspect-square w-full max-w-[280px] cursor-pointer rounded-full"
      >
        {/* outer ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg, #8A6A18, #EFDA9D, #A97F1F, #FBF0CE, #8A6A18)",
            boxShadow:
              "0 30px 70px -15px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.4)",
          }}
        />
        {/* door face */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #F4E7C1 0%, #DCB95F 30%, #A97F1F 62%, #6E5514 100%)",
            boxShadow:
              "inset 0 4px 18px rgba(255,255,255,0.35), inset 0 -18px 30px rgba(0,0,0,0.45)",
          }}
        />
        {/* bolt ring */}
        {bolts.map((deg) => (
          <span
            key={deg}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-[#3a2d0d]/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"
            style={{
              transform: `rotate(${deg}deg) translate(0, -118px) translate(-50%, -50%)`,
            }}
          />
        ))}
        {/* center dial */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #6E5514 0%, #3a2d0d 70%)",
            boxShadow:
              "0 6px 14px rgba(0,0,0,0.5), inset 0 2px 2px rgba(255,255,255,0.15)",
          }}
        />
        <div className="absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-1">
          <span
            className="font-serif text-lg tracking-[0.2em] text-black/40 sm:text-xl"
            style={{ textShadow: "0 1px 0 rgba(255,255,255,0.3)" }}
          >
            VAULT100
          </span>
        </div>
        {/* moving light sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay"
          style={{
            background:
              "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.5) 32%, transparent 44%)",
            backgroundSize: "260% 100%",
          }}
          animate={{ backgroundPositionX: ["120%", "-40%"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        />
        {/* cursor-follow glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: glowBackground }}
        />
      </motion.div>
    </div>
  );
}
