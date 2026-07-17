export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-[9px]"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(150deg,#9a8bff,#55b8ff)",
        boxShadow: "0 4px 14px -4px var(--accent-glow)",
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 2.5 14.6 9l6.9.4-5.3 4.4 1.8 6.7L12 17l-5.9 3.5 1.8-6.7L2.5 9.4 9.4 9 12 2.5Z"
          fill="#fff"
          fillOpacity="0.95"
        />
      </svg>
    </span>
  );
}
