"use client";

import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

export type SingleLineChartDataItem = {
  label: string;
  value: number;
};

interface SingleLineChartProps {
  data: SingleLineChartDataItem[];
  dataLabel?: string;
  height?: number;
  className?: string;
  color?: string;
}

export const SingleLineChart: React.FC<SingleLineChartProps> = ({
  data,
  dataLabel = "Value",
  height = 320,
  className = "",
  color = "#10b981",
}) => {
  const formatCompact = (n: number) => {
    const abs = Math.abs(n);
    if (abs >= 1_000_000_000) return `${Number((n / 1_000_000_000).toFixed(1))}B`;
    if (abs >= 1_000_000) return `${Number((n / 1_000_000).toFixed(1))}M`;
    if (abs >= 1_000) return `${Number((n / 1_000).toFixed(1))}K`;
    return String(n);
  };

  const formatLabel = (value: string) =>
    value.length > 10 ? `${value.slice(0, 10)}…` : value;

  return (
    <div className={`w-full max-w-full min-w-0 overflow-hidden ${className}`}>
      <div
        className="relative w-full min-w-0 overflow-hidden border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] transition-all"
        style={{ height }}
      >
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />

        <div className="relative h-full w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="singleLineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
                <filter id="singleLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <CartesianGrid vertical={false} stroke="currentColor" opacity={0.06} />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
                tickFormatter={formatLabel}
              />

              <YAxis
                width={55}
                tickFormatter={(v) => formatCompact(Number(v))}
                tick={{ fontSize: 12, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.12, strokeWidth: 1 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;

                  const val = payload[0]?.value ?? 0;

                  return (
                    <div
                      className="
                        rounded-2xl
                        border
                        border-white/30
                        dark:border-white/10
                        bg-white/90
                        dark:bg-[#0b0f15]
                        px-4
                        py-3
                        text-xs
                        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]
                        backdrop-blur-xl
                      "
                    >
                      <div className="mb-2 font-semibold text-sm">{label}</div>

                      <div className="flex justify-between gap-6">
                        <span className="font-medium" style={{ color }}>
                          {dataLabel}
                        </span>
                        <span dir="ltr" className="font-semibold">
                          {formatCompact(Number(val))}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill="url(#singleLineGradient)"
                isAnimationActive
              />

              <Line
                type="monotone"
                dataKey="value"
                name={dataLabel}
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0, fill: color }}
                filter="url(#singleLineGlow)"
                animationDuration={600}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleLineChart;
