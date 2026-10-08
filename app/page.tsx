import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import KpiCard from "@/components/dashboard/kpi-card";
import EmissionsChart from "@/components/dashboard/emissions-chart";
import ComplianceBreakdown from "@/components/dashboard/compliance-breakdown";
import RecentActivity from "@/components/dashboard/recent-activity";
import { kpiMetrics } from "@/lib/demo-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <DashboardHeader />

          {/* KPI Cards */}
          <section
            aria-label="Supply chain metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {kpiMetrics.map((metric) => (
              <KpiCard
                key={metric.title}
                metric={metric}
              />
            ))}
          </section>

          {/* Main Analytics */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <EmissionsChart />

            <ComplianceBreakdown />
          </section>

          {/* Recent Activity */}
          <section className="mt-6">
            <RecentActivity />
          </section>

          {/* Footer */}
          <footer className="mt-8 border-t border-slate-200 pt-5">
            <div className="flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row">
              <p>
                SourceTrace ESG & Supply Chain Platform
              </p>

              <p>
                Demo environment • Data shown is illustrative
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}