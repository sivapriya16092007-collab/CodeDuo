import { recentActivities } from "@/lib/demo-data";

function ActivityIcon({
  type,
}: {
  type: (typeof recentActivities)[number]["type"];
}) {
  const iconClass = "h-4 w-4";

  switch (type) {
    case "verified":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClass}
        >
          <path
            d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m8.5 12 2.2 2.2 4.8-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "shipment":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClass}
        >
          <path
            d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M3.5 7.5 12 12l8.5-4.5M12 12v9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "emission":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClass}
        >
          <path
            d="M20 4C12 4 5 7 5 14c0 3.31 2.69 6 6 6 7 0 10-7 9-16Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 20c3-5 7-8 13-11"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "compliance":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClass}
        >
          <path
            d="M4 12h16M12 4v16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "ledger":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={iconClass}
        >
          <path
            d="M5 4h14v16H5z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 8h8M8 12h8M8 16h5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function getIconStyle(type: string) {
  switch (type) {
    case "verified":
      return "bg-emerald-50 text-emerald-600";

    case "shipment":
      return "bg-blue-50 text-blue-600";

    case "emission":
      return "bg-green-50 text-green-600";

    case "compliance":
      return "bg-amber-50 text-amber-600";

    case "ledger":
      return "bg-violet-50 text-violet-600";

    default:
      return "bg-slate-50 text-slate-600";
  }
}

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest supply-chain compliance events
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {recentActivities.map((activity) => (
          <div
            key={`${activity.title}-${activity.time}`}
            className="flex gap-3 py-4 first:pt-0 last:pb-0"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${getIconStyle(
                activity.type
              )}`}
            >
              <ActivityIcon type={activity.type} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row">
                <p className="text-sm font-medium text-slate-800">
                  {activity.title}
                </p>

                <span className="shrink-0 text-[11px] text-slate-400">
                  {activity.time}
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}