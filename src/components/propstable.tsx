import { cn } from "@/lib/utils";

export function PropsTable({
  rows,
  className,
}: {
  rows: { prop: string; type: string; default: string; description: string }[];
  className?: string;
}) {
  return (
    <div className={cn("not-prose rounded-lg border", className)}>
      <div className="max-h-[32rem] overflow-auto scrollbar-hide rounded-lg">
        <table className="w-full min-w-[500px] text-sm">
          <thead className="sticky top-0 bg-background z-10">
            <tr className="border-b bg-muted">
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sm:px-4 min-w-[120px] lg:min-w-0 lg:w-auto">
                Property
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sm:px-4 min-w-[120px] lg:min-w-0 lg:w-auto">
                Type
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sm:px-4 min-w-[100px] lg:min-w-0 lg:w-auto">
                Default
              </th>
              <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sm:px-4 min-w-[200px] lg:min-w-0 lg:flex-1">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {rows.map((row) => (
              <tr
                key={row.prop}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 sm:p-4">
                  <code className="relative rounded bg-slate-900 dark:bg-white px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-white dark:text-slate-900 whitespace-nowrap">
                    {row.prop}
                  </code>
                </td>
                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 sm:p-4">
                  <span className="font-mono text-sm break-words">
                    {row.type}
                  </span>
                </td>
                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 sm:p-4">
                  <code className="relative rounded bg-slate-900 dark:bg-white px-[0.3rem] py-[0.2rem] font-mono text-sm text-white dark:text-slate-900 whitespace-nowrap">
                    {row.default}
                  </code>
                </td>
                <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 sm:p-4">
                  <div className="max-w-[500px]">{row.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
