import type { ReactNode } from "react";
import { site } from "@/data/site";
import {
  renderText,
  type Mat,
  type Pipeline,
  type PipelineView,
} from "@/lib/transformer";

/* ---------------- shared bits ---------------- */

const MAX_MAP = 6;

function attnAlpha(w: number) {
  return (0.08 + 0.72 * Math.pow(w, 0.9)).toFixed(2);
}

function cellColor(alpha: string | number) {
  return `light-dark(rgb(79 70 229 / ${alpha}), rgb(129 140 248 / ${alpha}))`;
}

function StageCard({
  stage,
  title,
  active = false,
  children,
}: {
  stage: string;
  title: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      data-stage={stage}
      className={`relative rounded-lg border p-4 transition-colors duration-200 ${
        active ? "border-nn-violet/50 bg-nn-violet/[0.04]" : "border-nn-line bg-nn-panel"
      }`}
    >
      <h2 className="mb-3 text-sm font-semibold text-nn-fg">{title}</h2>
      {children}
    </section>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="caret-blink ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[2px] rounded-[2px] bg-nn-violet/80"
    />
  );
}

const Quiet = ({ children }: { children: ReactNode }) => (
  <p className="text-xs leading-relaxed text-nn-muted/70">{children}</p>
);

/* ---------------- prompt ---------------- */

export function PromptCard({
  p,
  v,
  value,
  onChange,
  onRun,
  onReset,
  onSkip,
  examples,
  running,
  done,
}: {
  p: Pipeline | null;
  v: PipelineView | null;
  value: string;
  onChange: (value: string) => void;
  onRun: (value: string) => void;
  onReset: () => void;
  onSkip: () => void;
  examples: readonly string[];
  running: boolean;
  done: boolean;
}) {
  return (
    <StageCard stage="prompt" title="Prompt">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRun(value);
        }}
      >
        <label htmlFor="prompt-input" className="sr-only">
          Your question
        </label>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onRun(value);
            }
          }}
          rows={3}
          placeholder="Ask about projects, skills, or contact…"
          className="min-h-24 w-full resize-none rounded-lg border border-nn-line bg-nn-bg p-3 text-sm leading-relaxed text-nn-fg outline-none transition-colors placeholder:text-nn-muted/60 focus:border-nn-violet/70"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={running || !value.trim()}
            className="h-11 flex-1 rounded-lg bg-nn-violet px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:text-nn-bg"
          >
            Ask {site.name} →
          </button>
          {running ? (
            <button
              type="button"
              onClick={onSkip}
              className="h-11 rounded-lg border border-nn-line px-3 text-xs text-nn-muted transition-colors hover:border-nn-cyan hover:text-nn-cyan"
            >
              skip ▸▸
            </button>
          ) : null}
          {done ? (
            <button
              type="button"
              onClick={onReset}
              className="h-11 rounded-lg border border-nn-line px-3 text-xs text-nn-muted transition-colors hover:border-nn-rose hover:text-nn-rose"
            >
              reset ↺
            </button>
          ) : null}
        </div>
      </form>
      {p && v ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px]">
          {p.tokens.map((t, i) => (
            <span
              key={i}
              className={`transition-opacity duration-200 ${
                i < v.tokensShown ? "text-nn-muted" : "text-nn-muted/30"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {examples.map((q) => (
          <button
            key={q}
            type="button"
            disabled={running}
            onClick={() => onRun(q)}
            className="text-xs text-nn-muted transition-colors hover:text-nn-violet disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </StageCard>
  );
}

/* ---------------- encoder ---------------- */

function AttentionMap({
  tokens,
  weights,
  rowsShown,
}: {
  tokens: string[];
  weights: Mat;
  rowsShown: number;
}) {
  let bi = 0;
  let bj = 0;
  let bw = -1;
  weights.forEach((row, i) =>
    row.forEach((w, j) => {
      if (w > bw) {
        bw = w;
        bi = i;
        bj = j;
      }
    }),
  );

  return (
    <div
      role="img"
      aria-label="Attention weights between tokens"
      className="mx-auto grid w-full gap-[3px]"
      style={{
        gridTemplateColumns: `repeat(${tokens.length}, minmax(0, 1fr))`,
        maxWidth: 270,
      }}
    >
      {weights.flatMap((row, i) =>
        row.map((w, j) => {
          const shown = i < rowsShown;
          const isMax = shown && i === bi && j === bj;
          return (
            <span
              key={`${i}-${j}`}
              title={
                shown
                  ? `${tokens[i]} → ${tokens[j]}: ${(w * 100).toFixed(1)}%`
                  : undefined
              }
              className={`aspect-square rounded-[4px] transition-all duration-200 ${
                shown ? "" : "bg-nn-panel2"
              } ${isMax ? "ring-2 ring-nn-violet/70" : ""}`}
              style={
                shown ? { backgroundColor: cellColor(attnAlpha(w)) } : undefined
              }
            />
          );
        }),
      )}
    </div>
  );
}

export function EncoderCard({
  p,
  v,
}: {
  p: Pipeline | null;
  v: PipelineView | null;
}) {
  const active = v?.phase === "encoding";
  const tokens = p ? p.tokens.slice(0, MAX_MAP) : [];
  const weights = p
    ? p.weights.slice(0, MAX_MAP).map((row) => row.slice(0, MAX_MAP))
    : [];
  const rowsShown = v ? Math.min(v.attnRows, MAX_MAP) : 0;

  let bi = 0;
  let bj = 0;
  let bw = -1;
  weights.forEach((row, i) =>
    row.forEach((w, j) => {
      if (w > bw) {
        bw = w;
        bi = i;
        bj = j;
      }
    }),
  );

  return (
    <StageCard stage="encoder" title="Encoder" active={active}>
      {p && v ? (
        <>
          <AttentionMap tokens={tokens} weights={weights} rowsShown={rowsShown} />
          <div className="mt-3 flex items-center justify-between gap-2 font-mono text-[10px] text-nn-muted">
            <span>
              rows = query · cols = key
              {p.tokens.length > MAX_MAP
                ? ` · +${p.tokens.length - MAX_MAP} more`
                : ""}
            </span>
            <span className="flex shrink-0 items-center gap-[3px]">
              {[0.15, 0.35, 0.55, 0.75, 0.95].map((a) => (
                <span
                  key={a}
                  className="size-2 rounded-[2px]"
                  style={{ backgroundColor: cellColor(a) }}
                />
              ))}
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] text-nn-muted">
            max: “{tokens[bi]}” → “{tokens[bj]}” · {(bw * 100).toFixed(1)}%
          </p>
        </>
      ) : (
        <Quiet>The attention map appears when you ask a question.</Quiet>
      )}
    </StageCard>
  );
}

/* ---------------- decoder ---------------- */

export function DecoderCard({
  p,
  v,
}: {
  p: Pipeline | null;
  v: PipelineView | null;
}) {
  const active = v?.phase === "decoding";
  const decoded = v?.decoded ?? 0;
  const recent = p
    ? p.answerTokens.slice(Math.max(0, decoded - 6), decoded)
    : [];

  return (
    <StageCard stage="decoder" title="Decoder" active={active}>
      <p className="font-mono text-[10px] text-nn-muted">
        step {decoded} / {p ? p.answerTokens.length : "–"}
      </p>
      {p && v ? (
        <div className="mt-3 flex flex-wrap items-center gap-1 font-mono text-[11px]">
          {recent.length === 0 ? (
            <span className="px-1 text-nn-muted/60">⟨start⟩</span>
          ) : null}
          {recent.map((t, i) => {
            const isActive = i === recent.length - 1;
            return (
              <span
                key={decoded - recent.length + i}
                className={`rounded px-1 py-0.5 ${
                  isActive ? "bg-nn-violet/10 text-nn-violet" : "text-nn-muted"
                }`}
              >
                {t}
              </span>
            );
          })}
          {!v.done ? <Caret /> : null}
        </div>
      ) : (
        <Quiet>Generated tokens appear here, one per step.</Quiet>
      )}
    </StageCard>
  );
}

/* ---------------- answer ---------------- */

export function AnswerCard({
  p,
  v,
}: {
  p: Pipeline | null;
  v: PipelineView | null;
}) {
  const active = v?.phase === "decoding";

  return (
    <StageCard stage="answer" title="Answer" active={active}>
      {p && v ? (
        <>
          <p className="min-h-16 text-[15px] leading-relaxed text-nn-fg">
            {renderText(p.answerTokens, v.decoded)}
            {!v.done ? <Caret /> : null}
          </p>
          {v.probs ? (
            <details className="group mt-4">
              <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 font-mono text-[10px] text-nn-muted transition-colors hover:text-nn-violet [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden
                  className="inline-block transition-transform group-open:rotate-90"
                >
                  ▸
                </span>
                attention details
              </summary>
              <div className="mt-2 grid gap-1 font-mono text-[10px] text-nn-muted">
                {v.probs.map((d) => (
                  <div
                    key={d.token}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <span className={d.token === v.lastToken ? "text-nn-fg" : ""}>
                      {d.token}
                    </span>
                    <span>{(d.p * 100).toFixed(1)}%</span>
                  </div>
                ))}
                <p className="pt-1 text-nn-muted/70">
                  matched “{p.faq.id}” · {v.decoded} of {p.answerTokens.length}{" "}
                  tokens
                </p>
              </div>
            </details>
          ) : null}
        </>
      ) : (
        <p className="text-sm leading-relaxed text-nn-muted/70">
          The answer appears here, one token at a time.
        </p>
      )}
    </StageCard>
  );
}
