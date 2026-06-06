"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

export type DoubleLineChartDataItem = {
  label: string;
  x: number;
  y: number;
};

interface Props {
  data: DoubleLineChartDataItem[];
  assetLabel?: string;
  liabilityLabel?: string;
  height?: number;
  className?: string;
}

export const DoubleLineChart: React.FC<Props> = ({
  data,
  assetLabel = "دارایی",
  liabilityLabel = "بدهی",
  height = 320,
  className = "",
}) => {
  const formatCompact = (n: number) => {
    const abs = Math.abs(n);

    if (abs >= 1_000_000_000) {
      return `${Number((n / 1_000_000_000).toFixed(1))}B`;
    }

    if (abs >= 1_000_000) {
      return `${Number((n / 1_000_000).toFixed(1))}M`;
    }

    if (abs >= 1_000) {
      return `${Number((n / 1_000).toFixed(1))}K`;
    }

    return String(n);
  };

  const formatLabel = (value: unknown) => {
    const text = String(value ?? "");
    return text.length > 10 ? `${text.slice(0, 10)}…` : text;
  };

  return (
    <div className={`w-full max-w-full min-w-0 overflow-hidden ${className}`}>
      <div
        className="
          relative
          w-full
          max-w-full
          min-w-0
          overflow-hidden
          border
          border-white/30
          dark:border-white/10
          bg-white/70
          dark:bg-white/[0.04]
          backdrop-blur-2xl
          p-6
          shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]
          transition-all
        "
        style={{ height }}
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-emerald-400/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-rose-400/15 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/15" />

        {/* Legend */}
        <div className="pointer-events-none absolute left-6 top-5 z-10 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
            <span className="font-medium">{assetLabel}</span>
          </div>

          <div className="flex items-center gap-2 text-rose-500">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_16px_rgba(251,113,133,0.8)]" />
            <span className="font-medium">{liabilityLabel}</span>
          </div>
        </div>

        <div className="relative h-full w-full max-w-full min-w-0 overflow-hidden pt-7">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 18,
                right: 18,
                left: 8,
                bottom: 18,
              }}
            >
              <defs>
                {/* Line Gradients */}
                <linearGradient id="assetLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#6ee7b7" />
                </linearGradient>

                <linearGradient id="liabilityLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="50%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#fda4af" />
                </linearGradient>

                {/* Area Gradients */}
                <linearGradient id="assetAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.24} />
                  <stop offset="55%" stopColor="#34d399" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="liabilityAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" stopOpacity={0.22} />
                  <stop offset="55%" stopColor="#fb7185" stopOpacity={0.07} />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity={0} />
                </linearGradient>

                {/* Glow Filters */}
                <filter id="assetGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="liabilityGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="currentColor"
                opacity={0.06}
                strokeDasharray="4 8"
              />

              <XAxis
                dataKey="label"
                tick={{
                  fontSize: 12,
                  fill: "currentColor",
                }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
                tickFormatter={formatLabel}
                padding={{ left: 8, right: 8 }}
              />

              <YAxis
                width={55}
                tickFormatter={(v) => formatCompact(Number(v))}
                tick={{
                  fontSize: 12,
                  fill: "currentColor",
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                wrapperStyle={{
                  outline: "none",
                  zIndex: 50,
                  maxWidth: "calc(100% - 24px)",
                }}
                cursor={{
                  stroke: "rgba(148,163,184,0.35)",
                  strokeWidth: 1,
                  strokeDasharray: "4 6",
                }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;

                  const xVal =
                    payload.find((p: any) => p.dataKey === "x")?.value ?? 0;

                  const yVal =
                    payload.find((p: any) => p.dataKey === "y")?.value ?? 0;

                  return (
                    <div
                      className="
                        min-w-[180px]
                        rounded-2xl
                        border
                        border-white/30
                        dark:border-white/10
                        bg-white/90
                        dark:bg-[#0b0f15]/95
                        px-4
                        py-3
                        text-xs
                        text-titleText
                        dark:text-titleText-dark
                        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]
                        backdrop-blur-xl
                      "
                    >
                      <div className="mb-3 max-w-[180px] truncate text-sm font-semibold">
                        {String(label)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-2 text-emerald-500">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" />
                            <span className="font-medium">{assetLabel}</span>
                          </div>

                          <span dir="ltr" className="font-semibold">
                            {formatCompact(Number(xVal))}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-2 text-rose-500">
                            <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.85)]" />
                            <span className="font-medium">{liabilityLabel}</span>
                          </div>

                          <span dir="ltr" className="font-semibold">
                            {formatCompact(Number(yVal))}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              {/* Soft Areas */}
              <Area
                type="monotone"
                dataKey="x"
                fill="url(#assetAreaGradient)"
                stroke="none"
                activeDot={false}
                isAnimationActive
                animationDuration={800}
              />

              <Area
                type="monotone"
                dataKey="y"
                fill="url(#liabilityAreaGradient)"
                stroke="none"
                activeDot={false}
                isAnimationActive
                animationDuration={800}
              />

              {/* Lines */}
              <Line
                type="monotone"
                dataKey="x"
                name={assetLabel}
                stroke="url(#assetLineGradient)"
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 1,
                  stroke: "#10b981",
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#10b981",
                  fill: "#ffffff",
                }}
                filter="url(#assetGlow)"
                isAnimationActive
                animationDuration={900}
              />

              <Line
                type="monotone"
                dataKey="y"
                name={liabilityLabel}
                stroke="url(#liabilityLineGradient)"
                strokeWidth={2}
                dot={{
                  r: 3,
                  strokeWidth: 1,
                  stroke: "#e11d48",
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#e11d48",
                  fill: "#ffffff",
                }}
                filter="url(#liabilityGlow)"
                isAnimationActive
                animationDuration={900}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DoubleLineChart;
