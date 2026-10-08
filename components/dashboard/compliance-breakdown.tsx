import { complianceData } from "@/lib/demo-data";

function getColor(type: string) {
  switch (type) {
    case "compliant":
      return "bg-emerald-500";

    case "risk":
      return "bg-amber-400";

    case "nonCompliant":
      return "bg-red-500";

    default:
      return "bg-slate-400";
  }
}

function getTextColor(type: string) {
  switch (type) {
    case "compliant":
      return "text-emerald-600";

    case "risk":
      return "text-amber-600";

    case "nonCompliant":
      return "text-red-600";

    default:
      return "text-slate-600";
  }
}

export default function ComplianceBreakdown() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900">
          Supplier Compliance
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Current supplier compliance distribution
        </p>
      </div>

      <div className="flex items-center justify-center py-3">
        <div className="relative h-40 w-40">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#10b981 0deg 270deg, #fbbf24 270deg 331.2deg, #ef4444 331.2deg 360deg)",
            }}
          />

          <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-3xl font-bold text-slate-900">
              128
            </span>

            <span className="text-xs text-slate-400">
              Suppliers
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {complianceData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getColor(
                    item.type
                  )}`}
                />

                <span className="text-sm font-medium text-slate-700">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {item.value}
                </span>

                <span
                  className={`text-xs font-medium ${getTextColor(
                    item.type
                  )}`}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${getColor(
                  item.type
                )}`}
                style={{
                  width: `${item.percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}