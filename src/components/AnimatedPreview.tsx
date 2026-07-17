import type { AnimKind } from "@/lib/previews";

// Deterministic particle layout (no Math.random → no hydration mismatch).
const PARTICLES = [
  { l: 8, t: 72, s: 3, d: 0, dur: 9 },
  { l: 20, t: 40, s: 2, d: 1.4, dur: 11 },
  { l: 32, t: 84, s: 4, d: 2.1, dur: 8 },
  { l: 46, t: 30, s: 2, d: 0.6, dur: 12 },
  { l: 58, t: 66, s: 3, d: 3.2, dur: 10 },
  { l: 70, t: 22, s: 2, d: 1.1, dur: 13 },
  { l: 82, t: 78, s: 4, d: 2.6, dur: 9 },
  { l: 90, t: 48, s: 2, d: 0.3, dur: 11 },
  { l: 14, t: 18, s: 2, d: 3.8, dur: 14 },
  { l: 64, t: 90, s: 3, d: 1.9, dur: 8 },
  { l: 38, t: 56, s: 2, d: 2.9, dur: 12 },
  { l: 76, t: 12, s: 3, d: 0.9, dur: 10 },
];

export function AnimatedPreview({
  kind,
  gradient,
  className = "",
}: {
  kind: AnimKind;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={`mfp ${className}`}
      style={{ background: gradient }}
      aria-hidden
    >
      <div className="mfp-vignette" />
      {renderLayer(kind)}
    </div>
  );
}

function renderLayer(kind: AnimKind) {
  switch (kind) {
    case "aurora":
      return (
        <div className="mfp-aurora">
          <span />
          <span />
          <span />
        </div>
      );

    case "particles":
      return (
        <div className="mfp-particles">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={{
                left: `${p.l}%`,
                top: `${p.t}%`,
                width: p.s,
                height: p.s,
                animationDelay: `${p.d}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>
      );

    case "neon":
      return (
        <div className="mfp-neon">
          <div className="mfp-neon-grid" />
          <span className="mfp-neon-bar" />
          <span className="mfp-neon-bar mfp-neon-bar-2" />
        </div>
      );

    case "liquid":
      return (
        <div className="mfp-liquid">
          <span />
          <span />
          <span />
        </div>
      );

    case "grid":
      return (
        <div className="mfp-synth">
          <span className="mfp-sun" />
          <div className="mfp-floor" />
        </div>
      );

    case "terminal":
      return (
        <div className="mfp-term">
          <div className="mfp-term-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="mfp-term-body">
            <span className="mfp-line l1" />
            <span className="mfp-line l2" />
            <span className="mfp-line l3" />
            <span className="mfp-caret" />
          </div>
        </div>
      );

    case "orbit":
      return (
        <div className="mfp-orbit">
          <span className="mfp-core" />
          <div className="mfp-ring r1">
            <i />
          </div>
          <div className="mfp-ring r2">
            <i />
          </div>
          <div className="mfp-ring r3">
            <i />
          </div>
        </div>
      );

    case "device":
      return (
        <div className="mfp-device">
          <div className="mfp-phone">
            <span className="mfp-notch" />
            <span className="mfp-shine" />
            <span className="mfp-ring-progress" />
          </div>
        </div>
      );

    case "marquee":
      return (
        <div className="mfp-marquee">
          <div className="mfp-row">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="mfp-row rev">
            <span /><span /><span /><span /><span /><span />
          </div>
          <div className="mfp-row">
            <span /><span /><span /><span /><span /><span />
          </div>
        </div>
      );

    case "glass":
      return (
        <div className="mfp-glass">
          <span className="mfp-pane p1" />
          <span className="mfp-pane p2" />
          <span className="mfp-sweep" />
        </div>
      );

    case "tilt3d":
      return (
        <div className="mfp-tilt">
          <span className="mfp-card c1" />
          <span className="mfp-card c2" />
          <span className="mfp-card c3" />
        </div>
      );

    case "foliage":
      return (
        <div className="mfp-foliage">
          <span className="mfp-leaf f1" />
          <span className="mfp-leaf f2" />
          <span className="mfp-leaf f3" />
          <span className="mfp-leaf f4" />
        </div>
      );

    case "mono":
      return (
        <div className="mfp-mono">
          <span className="mfp-mono-l w1" />
          <span className="mfp-mono-l w2" />
          <span className="mfp-mono-underline" />
        </div>
      );

    case "chart":
      return (
        <div className="mfp-chart">
          <span className="mfp-bar b1" />
          <span className="mfp-bar b2" />
          <span className="mfp-bar b3" />
          <span className="mfp-bar b4" />
          <span className="mfp-bar b5" />
          <span className="mfp-trend" />
        </div>
      );

    default:
      return null;
  }
}
