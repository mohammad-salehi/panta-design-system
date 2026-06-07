"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

type CircleChartItem = {
  label: string;
  value: number;
  color?: string;
};

export type CircleChartProps = {
  unit?: string;
  data: CircleChartItem[];
  height?: number;
  dir?: "rtl" | "ltr";
  className?: string;
};

const DEFAULT_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#84CC16",
  "#F97316",
];

const formatValue = (value: number, unit?: string) =>
  `${value.toLocaleString()}${unit ? ` ${unit}` : ""}`;

export function CircleChart({
  unit,
  data,
  height = 340,
  dir = "ltr",
  className = "",
}: CircleChartProps) {
  const safeData = useMemo(
    () =>
      (data || []).map((d, i) => ({
        ...d,
        value: Number.isFinite(d.value) ? d.value : 0,
        color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      })),
    [data]
  );

  const total = useMemo(
    () => safeData.reduce((acc, cur) => acc + cur.value, 0),
    [safeData]
  );

  return (
    <div
      dir={dir}
      className={`w-full min-w-0 overflow-hidden rounded-2xl ${className}`}
      style={{ maxWidth: "100%" }}
    >
      <div className="w-full min-w-0" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Pie
              data={safeData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="78%"
              paddingAngle={0} // فاصله بین تکه‌ها کمتر/نازک‌تر
              stroke="rgba(255,255,255,0.9)" // خط جداکننده
              strokeWidth={0} // نازک‌تر شدن خطوط
              isAnimationActive={false}
              labelLine={false}
              label={({ percent }) =>
                percent && percent >= 0.06 ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {safeData.map((entry, idx) => (
                <Cell key={`${entry.label}-${idx}`} fill={entry.color} />
              ))}

              {/* مقدار کل داخل مرکز نمودار */}
              <Label
                position="center"
                content={({ viewBox }: any) => {
                  const { cx, cy } = viewBox || {};
                  if (cx == null || cy == null) return null;

                  return (
                    <g>
                      <text
                        x={cx}
                        y={cy - 8}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }}
                      >
                        Total
                      </text>
                      <text
                        x={cx}
                        y={cy + 14}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: 14, fill: "#111827", fontWeight: 700 }}
                      >
                        {formatValue(total, unit)}
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>

            <Tooltip
              formatter={(value: number, _name, item: any) => [
                formatValue(value, unit),
                item?.payload?.label ?? "",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{
                fontSize: 12,
                lineHeight: "20px",
                paddingTop: 8,
              }}
              formatter={(value: string, entry: any) => {
                const v = entry?.payload?.value ?? 0;
                return `${value} (${formatValue(v, unit)})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
