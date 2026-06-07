"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type SingleBarChartDataItem = {
  label: string;
  value: number;
};

interface SingleBarChartProps {
  data: SingleBarChartDataItem[];
  dataLabel?: string;
  height?: number;
  className?: string;
  barColor?: string;
}

export const SingleBarChart: React.FC<SingleBarChartProps> = ({
  data,
  dataLabel = "Value",
  height = 320,
  className = "",
  barColor = "#3b82f6",
}) => {
  const formatCompact = (n: number) => {
    const abs = Math.abs(n);
    if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
  };

  return (
    <div className={`w-full max-w-full min-w-0 overflow-hidden ${className}`}>
      <div
        className="relative w-full min-w-0 overflow-hidden border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] transition-all"
        style={{ height }}
      >
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-400/10 blur-[120px]" />

        <div className="relative h-full w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="singleBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={barColor} stopOpacity={1} />
                  <stop offset="100%" stopColor={barColor} stopOpacity={0.65} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="currentColor" opacity={0.06} />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={10}
              />

              <YAxis
                width={55}
                tickFormatter={(v) => formatCompact(Number(v))}
                tick={{ fontSize: 12, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
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
                        <span className="font-medium" style={{ color: barColor }}>
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

              <Bar
                dataKey="value"
                name={dataLabel}
                fill="url(#singleBarGradient)"
                radius={[14, 14, 6, 6]}
                maxBarSize={42}
                animationDuration={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SingleBarChart;
