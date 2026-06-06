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
  Cell,
} from "recharts";

export type DoubleBarChartDataItem = {
  label: string;
  x: number;
  y: number;
};

interface Props {
  data: DoubleBarChartDataItem[];
  assetLabel?: string;
  liabilityLabel?: string;
  height?: number;
  className?: string;
}

export const DoubleBarChart: React.FC<Props> = ({
  data,
  assetLabel = "دارایی",
  liabilityLabel = "بدهی",
  height = 320,
  className = "",
}) => {
  const formatCompact = (n: number) => {
    const abs = Math.abs(n);
    if (abs >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
    if (abs >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (abs >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
  };

  return (
    <div className={`w-full min-w-0 overflow-hidden ${className}`}>
      <div
        className="
        relative
        w-full
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
        {/* soft glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-none bg-emerald-400/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-none bg-rose-400/15 blur-[120px]" />

        <div className="relative h-full w-full min-w-0 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
              barCategoryGap="28%"
            >
              <defs>
                <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                <linearGradient id="liabilityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="currentColor"
                opacity={0.06}
              />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={10}
              />

              <YAxis
                width={55}
                tickFormatter={(v) => formatCompact(Number(v))}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;

                  const xVal =
                    payload.find((p: any) => p.dataKey === "x")?.value ?? 0;

                  const yVal =
                    payload.find((p: any) => p.dataKey === "y")?.value ?? 0;

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
                      <div className="mb-2 font-semibold text-sm">
                        {label}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between gap-6">
                          <span className="text-emerald-500 font-medium">
                            {assetLabel}
                          </span>
                          <span dir="ltr" className="font-semibold">
                            {formatCompact(Number(xVal))}
                          </span>
                        </div>

                        <div className="flex justify-between gap-6">
                          <span className="text-rose-500 font-medium">
                            {liabilityLabel}
                          </span>
                          <span dir="ltr" className="font-semibold">
                            {formatCompact(Number(yVal))}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              <Bar
                dataKey="x"
                fill="url(#assetGradient)"
                radius={[14, 14, 6, 6]}
                maxBarSize={42}
                animationDuration={600}
              />

              <Bar
                dataKey="y"
                fill="url(#liabilityGradient)"
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

export default DoubleBarChart;
