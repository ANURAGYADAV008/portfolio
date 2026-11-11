"use client";

import { useEffect, useRef, useState } from "react";

const LOOK_RADIUS = 300;
const MAX_LOOK_X = 2.8;
const MAX_LOOK_Y = 2.2;
const SHAPES = ["circle", "kite", "rectangle"] as const;
const IDLE_MS = 15_000;
const HAPPY_MS = 1_200;
const WAKE_THROTTLE_MS = 400;

export function Bot({
  className = "size-44 sm:size-52",
}: {
  className?: string;
}) {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const pokeRef = useRef<HTMLSpanElement>(null);
  const eyesRef = useRef<HTMLSpanElement>(null);
  const happyTimer = useRef<number | null>(null);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [sleeping, setSleeping] = useState(false);
  const [happy, setHappy] = useState(false);
  const shape = SHAPES[shapeIndex];
  const mood = happy ? "happy" : sleeping ? "sleepy" : "idle";

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      avatar.style.setProperty("--bot-look-x", `${targetX.toFixed(2)}px`);
      avatar.style.setProperty("--bot-look-y", `${targetY.toFixed(2)}px`);
      avatar.style.setProperty(
        "--bot-tilt",
        `${(targetX / MAX_LOOK_X).toFixed(2)}deg`,
      );
    };

    const queueRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = avatar.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - distance / LOOK_RADIUS);

      if (pull === 0) {
        targetX = 0;
        targetY = 0;
        queueRender();
        return;
      }

      const length = Math.max(distance, 1);
      targetX = (dx / length) * MAX_LOOK_X * pull;
      targetY = (dy / length) * MAX_LOOK_Y * pull;
      queueRender();
    };

    const reset = () => {
      targetX = 0;
      targetY = 0;
      queueRender();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let idleTimer: number | undefined;
    let lastWake = 0;

    const scheduleSleep = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setSleeping(true), IDLE_MS);
    };

    const wake = () => {
      const now = Date.now();
      if (now - lastWake < WAKE_THROTTLE_MS) return;
      lastWake = now;
      setSleeping(false);
      scheduleSleep();
    };

    scheduleSleep();

    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("pointerdown", wake, { passive: true });
    window.addEventListener("keydown", wake);
    window.addEventListener("scroll", wake, { passive: true });

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("scroll", wake);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (happyTimer.current) window.clearTimeout(happyTimer.current);
    };
  }, []);

  const handlePoke = () => {
    setShapeIndex((index) => (index + 1) % SHAPES.length);
    setSleeping(false);
    setHappy(true);

    if (happyTimer.current) window.clearTimeout(happyTimer.current);
    happyTimer.current = window.setTimeout(() => setHappy(false), HAPPY_MS);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pokeRef.current?.animate(
      [
        { transform: "scale(1, 1) translateY(0)" },
        { transform: "scale(1.08, .88) translateY(3px)", offset: 0.18 },
        { transform: "scale(.94, 1.08) translateY(-3px)", offset: 0.42 },
        { transform: "scale(1.03, .97) translateY(0)", offset: 0.68 },
        { transform: "scale(1, 1) translateY(0)" },
      ],
      {
        duration: 560,
        easing: "cubic-bezier(.22, 1, .36, 1)",
      },
    );

    eyesRef.current?.querySelectorAll(".bot-eye").forEach((eye, index) => {
      eye.animate(
        [
          { transform: "scaleY(1)" },
          { transform: "scaleY(.12)", offset: 0.35 },
          { transform: "scaleY(1)" },
        ],
        {
          duration: 260,
          delay: index * 35,
          easing: "ease-out",
        },
      );
    });
  };

  return (
    <div className={`relative shrink-0 select-none ${className}`}>
      <div className="bot-float absolute inset-0">
        <button
          ref={avatarRef}
          type="button"
          data-shape={shape}
          data-mood={mood}
          className="bot-avatar absolute inset-0 rounded-full border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={handlePoke}
          onPointerEnter={() => setSleeping(false)}
          onFocus={() => setSleeping(false)}
          aria-label={`Bot mascot is ${mood}. Activate to change shape — currently ${shape}.`}
          title="Tap to wake the bot or change its shape"
        >
          <span className="bot-idle absolute inset-0">
            <span ref={pokeRef} className="bot-poke absolute inset-0">
              <span className="bot-blob absolute inset-0">
                <span className="bot-antenna" aria-hidden="true">
                  <span className="bot-antenna-tip" />
                </span>

                <span className="bot-shape" aria-hidden="true">
                  <span className="bot-grain" />
                </span>

                <span
                  className="bot-cheeks"
                  aria-hidden="true"
                >
                  <span className="bot-cheek" />
                  <span className="bot-cheek" />
                </span>

                <span ref={eyesRef} className="bot-eyes" aria-hidden="true">
                  <span className="bot-eye" />
                  <span className="bot-eye" />
                </span>

                <span className="bot-mouth" aria-hidden="true" />

                <span className="bot-zzz" aria-hidden="true">
                  <span>z</span>
                  <span>z</span>
                  <span>z</span>
                </span>
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
