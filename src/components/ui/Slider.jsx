export default function Slider({ value, max, onChange, label }) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <input type="range" aria-label={label} className="bar" min="0" max={max || 0} step="any"
      value={value} style={{ "--p": `${pct}%` }} onChange={(e) => onChange(Number(e.target.value))} />
  );
}