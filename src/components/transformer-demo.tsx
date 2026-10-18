"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnswerCard,
  DecoderCard,
  EncoderCard,
  PromptCard,
} from "@/components/transformer-panels";
import { EXAMPLE_QUESTIONS } from "@/data/qa";
import {
  buildPipeline,
  stageDelay,
  viewOf,
  type Pipeline,
} from "@/lib/transformer";

const STAGES = ["prompt", "encoder", "decoder", "answer"] as const;
type Link = { key: string; d: string };

export function TransformerDemo() {
  const [input, setInput] = useState<string>(EXAMPLE_QUESTIONS[0]);
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [applied, setApplied] = useState(0);

  const view = useMemo(
    () => (pipeline ? viewOf(pipeline, applied) : null),
    [pipeline, applied],
  );

  const running = pipeline !== null && applied < pipeline.stages.length;
  const done = pipeline !== null && applied >= pipeline.stages.length;

  // Replay the precomputed timeline one stage at a time.
  useEffect(() => {
    if (!pipeline || applied >= pipeline.stages.length) return;
    const t = setTimeout(
      () => setApplied((a) => a + 1),
      stageDelay(pipeline.stages[applied]),
    );
    return () => clearTimeout(t);
  }, [pipeline, applied]);

  function run(text: string) {
    const question = text.trim();
    if (!question) return;
    setInput(question);
    const p = buildPipeline(question);
    setPipeline(p);
    setApplied(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? p.stages.length
        : 0,
    );
  }

  function reset() {
    setPipeline(null);
    setApplied(0);
  }

  /* ------- SVG signal lines between the stage cards ------- */

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    function measure() {
      if (!root) return;
      const base = root.getBoundingClientRect();
      const round = (x: number) => Math.round(x * 10) / 10;
      const rects = STAGES.map((stage) => {
        const node = root.querySelector(`[data-stage="${stage}"]`);
        if (!node) return null;
        const r = node.getBoundingClientRect();
        return {
          left: r.left - base.left,
          top: r.top - base.top,
          right: r.right - base.left,
          bottom: r.bottom - base.top,
          cx: r.left - base.left + r.width / 2,
          cy: r.top - base.top + r.height / 2,
        };
      });

      const next: Link[] = [];
      for (let i = 0; i < rects.length - 1; i++) {
        const a = rects[i];
        const b = rects[i + 1];
        if (!a || !b) continue;
        if (b.top >= a.bottom + 8) {
          // stacked (or wrapped to next row): connect bottom → top
          const y1 = round(a.bottom + 6);
          const y2 = round(b.top - 6);
          const my = round((y1 + y2) / 2);
          next.push({
            key: `${STAGES[i]}-${STAGES[i + 1]}`,
            d: `M ${round(a.cx)} ${y1} C ${round(a.cx)} ${my} ${round(b.cx)} ${my} ${round(b.cx)} ${y2}`,
          });
        } else {
          // side by side: connect right → left
          const x1 = round(a.right + 6);
          const x2 = round(b.left - 6);
          const mx = round((x1 + x2) / 2);
          next.push({
            key: `${STAGES[i]}-${STAGES[i + 1]}`,
            d: `M ${x1} ${round(a.cy)} C ${mx} ${round(a.cy)} ${mx} ${round(b.cy)} ${x2} ${round(b.cy)}`,
          });
        }
      }
      setLinks(next);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    for (const stage of STAGES) {
      const node = root.querySelector(`[data-stage="${stage}"]`);
      if (node) observer.observe(node);
    }
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="mt-14">
      <div
        ref={wrapRef}
        className="relative grid items-start gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-[3fr_2fr_2fr_4fr]"
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <marker
              id="pipeline-arrow"
              viewBox="0 0 10 10"
              refX="7.5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="var(--nn-cyan)" />
            </marker>
          </defs>
          {links.map((l) => (
            <path
              key={l.key}
              d={l.d}
              className="flow-line"
              markerEnd="url(#pipeline-arrow)"
            />
          ))}
        </svg>

        <PromptCard
          p={pipeline}
          v={view}
          value={input}
          onChange={setInput}
          onRun={run}
          onReset={reset}
          onSkip={() => pipeline && setApplied(pipeline.stages.length)}
          examples={EXAMPLE_QUESTIONS}
          running={running}
          done={done}
        />
        <EncoderCard p={pipeline} v={view} />
        <DecoderCard p={pipeline} v={view} />
        <AnswerCard p={pipeline} v={view} />
      </div>
    </div>
  );
}
