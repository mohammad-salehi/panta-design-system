"use client";

import React, { useMemo, useState } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

export type TreeChartDataItem = {
  name: string;
  value: number;
  symbol?: string;
};

interface TreeMapChartProps {
  data: TreeChartDataItem[];
  height?: number;
  className?: string;
  aspectRatio?: number;
  valueUnit?: string;
  valueLabel?: string;
  shareLabel?: string;
  showValueInCell?: boolean;
  showShareInCell?: boolean;
  formatValue?: (n: number) => string;
}

const PALETTE = [
  ["#4F46E5", "#6366F1"],
  ["#0EA5E9", "#06B6D4"],
  ["#14B8A6", "#22C55E"],
  ["#84CC16", "#A3E635"],
  ["#F59E0B", "#F97316"],
  ["#EF4444", "#F43F5E"],
  ["#D946EF", "#A855F7"],
  ["#8B5CF6", "#6366F1"],
];

const defaultFormat = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return Number(n).toLocaleString("en-US");
};

type CellProps = any & {
  total: number;
  hoveredKey: string | null;
  setHoveredKey: (k: string | null) => void;
  showValueInCell: boolean;
  showShareInCell: boolean;
  valueUnit?: string;
  formatValue: (n: number) => string;
};

const TreemapCell: React.FC<CellProps> = ({
  x,
  y,
  width,
  height,
  index,
  depth,
  payload,
  name,
  value,
  total,
  hoveredKey,
  setHoveredKey,
  showValueInCell,
  showShareInCell,
  valueUnit,
  formatValue,
}) => {
  const cellName = String(payload?.name ?? name ?? "");
  const symbol = String(payload?.symbol ?? cellName ?? "");
  const v = Number(payload?.value ?? value ?? 0);
  const pct = total > 0 ? (v / total) * 100 : 0;

  const key = `${cellName}-${symbol}-${index}`;
  const isHovered = hoveredKey === key;
  const isDimmed = hoveredKey !== null && !isHovered;

  const showMain = width > 84 && height > 46;
  const showSub = width > 120 && height > 78;

  const [c1, c2] = PALETTE[index % PALETTE.length];
  const gradId = `tm-grad-${index}`;
  const glowId = `tm-glow-${index}`;

  // parent node fallback
  if (depth !== 1) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={10}
          ry={10}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.14)"
        />
      </g>
    );
  }

  return (
    <g
      onMouseEnter={() => setHoveredKey(key)}
      onMouseLeave={() => setHoveredKey(null)}
      style={{ transition: "all .18s ease" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity={isDimmed ? 0.55 : 0.95} />
          <stop offset="100%" stopColor={c2} stopOpacity={isDimmed ? 0.5 : 0.9} />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={isHovered ? "8" : "5"} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        ry={12}
        fill={`url(#${gradId})`}
        stroke={isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)"}
        strokeWidth={isHovered ? 1.4 : 1}
        filter={`url(#${glowId})`}
        opacity={isDimmed ? 0.55 : 1}
      />

      <rect
        x={x + 5}
        y={y + 5}
        width={Math.max(0, width - 10)}
        height={Math.max(0, height - 10)}
        rx={9}
        ry={9}
        fill="rgba(0,0,0,0.08)"
        opacity={showMain ? 1 : 0}
      />

      {showMain && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          style={{
            paintOrder: "stroke",
            stroke: "rgba(0,0,0,0.30)",
            strokeWidth: 3,
          }}
        >
          <tspan x={x + width / 2} dy={showSub ? "-0.85em" : "-0.2em"} fontSize={13} fontWeight={800}>
            {symbol}
          </tspan>

          {showSub && showValueInCell && (
            <tspan x={x + width / 2} dy="1.35em" fontSize={11} fontWeight={600} opacity={0.98}>
              {formatValue(v)}{valueUnit ? ` ${valueUnit}` : ""}
            </tspan>
          )}

          {showSub && showShareInCell && (
            <tspan x={x + width / 2} dy="1.2em" fontSize={11} fontWeight={500} opacity={0.9}>
              {pct.toFixed(1)}%
            </tspan>
          )}
        </text>
      )}
    </g>
  );
};

export const TreeChart: React.FC<TreeMapChartProps> = ({
  data,
  height = 340,
  className = "",
  aspectRatio = 4 / 3,
  valueUnit = "",
  valueLabel = "Value",
  shareLabel = "Share",
  showValueInCell = true,
  showShareInCell = true,
  formatValue = defaultFormat,
}) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const safeData = data ?? [];

  const total = useMemo(
    () => safeData.reduce((s, i) => s + Number(i.value || 0), 0),
    [safeData]
  );

  return (
    <div className={`w-full min-w-0 max-w-full overflow-hidden ${className}`} style={{ height }}>
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-2">
        {/* subtle background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-indigo-500/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-cyan-500/20 blur-[80px]" />

        <div className="relative h-full w-full">
          {safeData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              داده‌ای برای نمایش وجود ندارد.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={safeData}
                dataKey="value"
                nameKey="symbol"
                aspectRatio={aspectRatio}
                isAnimationActive
                animationDuration={500}
                content={(props) => (
                  <TreemapCell
                    {...props}
                    total={total}
                    hoveredKey={hoveredKey}
                    setHoveredKey={setHoveredKey}
                    showValueInCell={showValueInCell}
                    showShareInCell={showShareInCell}
                    valueUnit={valueUnit}
                    formatValue={formatValue}
                  />
                )}
              >
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload as TreeChartDataItem;
                    const v = Number(d?.value || 0);
                    const pct = total > 0 ? (v / total) * 100 : 0;

                    return (
                      <div
                        className="
                          rounded-2xl border border-white/30 dark:border-white/10
                          bg-white/90 dark:bg-[#0b0f15]
                          px-4 py-3 text-xs
                          shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]
                          backdrop-blur-xl
                        "
                      >
                        <div className="mb-2 font-semibold text-sm">
                          {d?.name} {d?.symbol ? <span className="opacity-70">({d.symbol})</span> : null}
                        </div>

                        <div className="flex justify-between gap-6">
                          <span className="font-medium">{valueLabel}</span>
                          <span dir="ltr" className="font-semibold">
                            {formatValue(v)}{valueUnit ? ` ${valueUnit}` : ""}
                          </span>
                        </div>

                        <div className="mt-1 flex justify-between gap-6">
                          <span className="font-medium opacity-80">{shareLabel}</span>
                          <span dir="ltr" className="font-semibold">{pct.toFixed(1)}%</span>
                        </div>
                      </div>
                    );
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeChart;
