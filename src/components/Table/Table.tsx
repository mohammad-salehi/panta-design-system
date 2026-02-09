"use client";

import React, { useMemo, useState, useCallback } from "react";

export type RowId = string;

export type Column<T> = {
  header: React.ReactNode;
  className?: string;
  cell?: (row: T) => React.ReactNode;
  accessorKey?: keyof T;
  align?: "start" | "center" | "end";
  width?: string | number;
};

export type ExpandableTableProps<T extends { id?: RowId; subRows?: T[] }> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  pageSize?: number;
  getRowId?: (row: T, path: string) => RowId;
  getSubRows?: (row: T) => T[] | undefined;
  onRowClick?: (row: T) => void;
  defaultExpandedIds?: RowId[];
  renderProgress?: (value: number) => React.ReactNode;
  rowDetails?: (row: T) => React.ReactNode | React.ReactNode[];
  rowDetailsClassName?: string;
  toolbarSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
};

function cn(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function getAlignClass(a?: "start" | "center" | "end") {
  if (a === "center") return "text-center";
  if (a === "end") return "text-left rtl:text-right ltr:text-right";
  return "text-right rtl:text-right ltr:text-left";
}

export function ExpandableTable<T extends { id?: RowId; subRows?: T[] }>(
  props: ExpandableTableProps<T>
) {
  const {
    data,
    columns,
    className,
    pageSize,
    getRowId,
    getSubRows = (r) => r.subRows,
    onRowClick,
    defaultExpandedIds = [],
    renderProgress,
    rowDetails,
    rowDetailsClassName,
    toolbarSlot,
    footerSlot,
  } = props;

  const computeId = useCallback(
    (row: T, path: string): RowId =>
      row.id ? String(row.id) : getRowId ? getRowId(row, path) : path,
    [getRowId]
  );

  type FlatRow = { row: T; level: number; id: RowId; path: string; parent?: RowId };

  const flatten = useCallback(
    (rows: T[], level = 0, parentPath = "", parentId?: RowId): FlatRow[] => {
      const out: FlatRow[] = [];
      rows.forEach((r, idx) => {
        const path = parentPath ? `${parentPath}.${idx}` : `${idx}`;
        const id = computeId(r, path);
        out.push({ row: r, level, id, path, parent: parentId });

        const children = getSubRows(r);
        if (children?.length) out.push(...flatten(children, level + 1, path, id));
      });
      return out;
    },
    [computeId, getSubRows]
  );

  const flat = useMemo(() => flatten(data), [data, flatten]);

  const [expanded, setExpanded] = useState<Set<RowId>>(new Set(defaultExpandedIds));
  const [page, setPage] = useState(1);

  const toggle = useCallback((id: RowId) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const childrenOf = useCallback((id: RowId) => flat.filter((f) => f.parent === id), [flat]);
  const roots = useMemo(() => flat.filter((f) => f.level === 0), [flat]);

  const total = roots.length;
  const pageCount = pageSize ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount);

  const paginated = useMemo(() => {
    if (!pageSize) return roots;
    const start = (currentPage - 1) * pageSize;
    return roots.slice(start, start + pageSize);
  }, [roots, pageSize, currentPage]);

  const renderCell = useCallback(
    (col: Column<T>, row: T): React.ReactNode => {
      if (col.cell) return col.cell(row);
      if (col.accessorKey) {
        const v = row[col.accessorKey];
        if (
          typeof v === "number" &&
          col.accessorKey.toString().toLowerCase().includes("progress") &&
          renderProgress
        ) {
          return renderProgress(v);
        }
        return String(v ?? "");
      }
      return null;
    },
    [renderProgress]
  );

  return (
    <div className={cn("w-full", className)}>
      {toolbarSlot && <div className="mb-4">{toolbarSlot}</div>}

      <div className="lux-table-wrap overflow-visible">
        <table className="lux-table w-full border-separate border-spacing-y-2">
          <thead className="lux-table-head">
            <tr>
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={cn("lux-th", getAlignClass(c.align))}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((node, rowIndex) => {
              const kids = childrenOf(node.id);
              const hasChildren = kids.length > 0;

              const detailNodes =
                hasChildren && rowDetails
                  ? kids.flatMap((k, ki) => {
                      const raw = React.Children.toArray(rowDetails(k.row as T));
                      return raw.map((child, i) => (
                        <React.Fragment key={`detail-${node.path}-${ki}-${i}`}>{child}</React.Fragment>
                      ));
                    })
                  : [];

              const hasDetails = detailNodes.length > 0;
              const canExpand = hasChildren && hasDetails;
              const isOpen = expanded.has(node.id);
              const showDetails = isOpen && hasDetails;

              return (
                <React.Fragment key={`row-${node.path}`}>
                  <tr
                    onClick={() => onRowClick?.(node.row)}
                    className={cn(
                      "group transition-colors",
                      rowIndex % 2 === 0
                        ? "[&>td]:bg-slate-50 dark:[&>td]:bg-slate-900/40"
                        : "[&>td]:bg-slate-100 dark:[&>td]:bg-slate-800/55",
                      "hover:[&>td]:!bg-sky-100 dark:hover:[&>td]:!bg-sky-900/35"
                    )}
                  >
                    {columns.map((c, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "lux-td px-4 py-3 align-middle transition-colors",
                          "first:rounded-r-xl last:rounded-l-xl",
                          "hover:!bg-inherit",
                          getAlignClass(c.align),
                          c.className
                        )}
                        style={c.width ? { width: c.width } : undefined}
                      >
                        {ci === 0 ? (
                          <div
                            className="flex items-center gap-2"
                            style={{ paddingInlineStart: `${node.level * 1.25}rem` }}
                          >
                            {canExpand ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggle(node.id);
                                }}
                                className={cn(
                                  "relative inline-flex h-9 w-9 items-center justify-center rounded-xl",
                                  "border border-solid border-slate-200/90 dark:border-slate-700/90",
                                  "bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
                                  "text-slate-600 dark:text-slate-200",
                                  "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.06)]",
                                  "transition-all duration-200",
                                  "hover:shadow-[0_2px_6px_rgba(14,165,233,0.18),0_10px_18px_rgba(14,165,233,0.14)]",
                                  "hover:border-sky-300 dark:hover:border-sky-700",
                                  "hover:text-sky-700 dark:hover:text-sky-300",
                                  "active:translate-y-0 active:scale-95",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/45"
                                )}
                                aria-label={isOpen ? "بستن جزئیات" : "باز کردن جزئیات"}
                                title={isOpen ? "بستن جزئیات" : "باز کردن جزئیات"}
                              >
                                <span className="absolute inset-0 rounded-xl bg-sky-400/0 transition-colors duration-200 hover:bg-sky-400/5" />
                                <svg
                                  viewBox="0 0 24 24"
                                  className={cn(
                                    "relative z-10 h-4 w-4 transition-transform duration-200",
                                    isOpen ? "rotate-90" : "rotate-0"
                                  )}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M9 6l6 6-6 6" />
                                </svg>
                              </button>
                            ) : null}
                            <span>{renderCell(c, node.row)}</span>
                          </div>
                        ) : (
                          renderCell(c, node.row)
                        )}
                      </td>
                    ))}
                  </tr>

                  {showDetails && (
                    <tr className="lux-details-row">
                      <td colSpan={columns.length} className="p-0">
                        <div
                          className={cn(
                            "mx-1 mb-2 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900",
                            rowDetailsClassName
                          )}
                        >
                          <div className="flex flex-col gap-3">{detailNodes}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-sm text-muted-foreground">
                  داده‌ای وجود ندارد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageSize && pageCount > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            صفحه {currentPage} از {pageCount}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="h-9 rounded-lg border border-border px-3 text-sm disabled:opacity-50"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              قبلی
            </button>
            <button
              className="h-9 rounded-lg border border-border px-3 text-sm disabled:opacity-50"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            >
              بعدی
            </button>
          </div>
        </div>
      )}

      {footerSlot}
    </div>
  );
}
