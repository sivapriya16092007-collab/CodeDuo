export default function DashboardHeader() {
  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Overview</span>
            <span>/</span>
            <span className="text-slate-700">Dashboard</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            ESG Supply Chain Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor supplier sustainability, shipments, Scope-3 emissions,
            and compliance performance across your supply chain.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Export Report
          </button>

          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Add Supplier
          </button>
        </div>
      </div>
    </header>
  );
}