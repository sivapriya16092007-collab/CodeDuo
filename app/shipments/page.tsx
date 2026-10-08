"use client";

import { useMemo, useState } from "react";
import {
  calculateShipmentEmissions,
  demoShipments,
  formatDate,
  formatNumber,
  getStatusClasses,
  type Shipment,
  type TransportMode,
} from "@/lib/sourcetrace-mvp";

export default function ShipmentsPage() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"All" | TransportMode>("All");
  const [selected, setSelected] = useState<Shipment | null>(
    demoShipments[0]
  );

  const filteredShipments = useMemo(() => {
    const query = search.toLowerCase().trim();

    return demoShipments.filter((shipment) => {
      const matchesSearch =
        !query ||
        shipment.id.toLowerCase().includes(query) ||
        shipment.supplier.toLowerCase().includes(query) ||
        shipment.origin.toLowerCase().includes(query) ||
        shipment.destination.toLowerCase().includes(query);

      const matchesMode =
        mode === "All" || shipment.transportMode === mode;

      return matchesSearch && matchesMode;
    });
  }, [search, mode]);

  const totalEmissions = demoShipments.reduce(
    (total, shipment) =>
      total + calculateShipmentEmissions(shipment),
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            SourceTrace / Operations
          </p>

          <div className="mt-1 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Shipments
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track shipments and calculate deterministic Scope-3
                transportation emissions.
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs font-medium text-blue-600">
                Total Scope-3
              </p>
              <p className="text-lg font-bold text-blue-900">
                {formatNumber(totalEmissions)} kg CO2e
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search shipment, supplier, origin..."
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />

            <select
              value={mode}
              onChange={(event) =>
                setMode(
                  event.target.value as "All" | TransportMode
                )
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-400"
            >
              <option value="All">All transport modes</option>
              <option value="Road">Road</option>
              <option value="Rail">Rail</option>
              <option value="Sea">Sea</option>
              <option value="Air">Air</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Shipment Register
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredShipments.length} shipments shown
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Shipment</th>
                    <th className="px-5 py-3">Supplier</th>
                    <th className="px-5 py-3">Route</th>
                    <th className="px-5 py-3">Weight</th>
                    <th className="px-5 py-3">Distance</th>
                    <th className="px-5 py-3">Mode</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Verification</th>
                    <th className="px-5 py-3">Scope-3</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredShipments.map((shipment) => {
                    const emissions =
                      calculateShipmentEmissions(shipment);

                    return (
                      <tr
                        key={shipment.id}
                        onClick={() => setSelected(shipment)}
                        className={`cursor-pointer transition hover:bg-blue-50/50 ${
                          selected?.id === shipment.id
                            ? "bg-blue-50/70"
                            : ""
                        }`}
                      >
                        <td className="px-5 py-4 font-semibold text-blue-700">
                          {shipment.id}
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-800">
                          {shipment.supplier}
                        </td>

                        <td className="max-w-[240px] px-5 py-4 text-slate-600">
                          <div>{shipment.origin}</div>
                          <div className="text-xs text-slate-400">
                            → {shipment.destination}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {shipment.weightTonnes} t
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {formatNumber(shipment.distanceKm)} km
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {shipment.transportMode}
                          </span>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                          {formatDate(shipment.shipmentDate)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                              shipment.verificationStatus
                            )}`}
                          >
                            {shipment.verificationStatus}
                          </span>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-900">
                          {formatNumber(emissions)} kg
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:sticky xl:top-6">
            {selected ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                      Shipment details
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">
                      {selected.id}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      selected.verificationStatus
                    )}`}
                  >
                    {selected.verificationStatus}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <Detail
                    label="Supplier"
                    value={selected.supplier}
                  />
                  <Detail
                    label="Origin"
                    value={selected.origin}
                  />
                  <Detail
                    label="Destination"
                    value={selected.destination}
                  />
                  <Detail
                    label="Weight"
                    value={`${selected.weightTonnes} tonnes`}
                  />
                  <Detail
                    label="Distance"
                    value={`${formatNumber(selected.distanceKm)} km`}
                  />
                  <Detail
                    label="Transport"
                    value={selected.transportMode}
                  />
                  <Detail
                    label="Shipment date"
                    value={formatDate(selected.shipmentDate)}
                  />
                </div>

                <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs font-medium text-emerald-700">
                    Calculated Scope-3 emissions
                  </p>

                  <p className="mt-1 text-2xl font-bold text-emerald-900">
                    {formatNumber(
                      calculateShipmentEmissions(selected)
                    )}{" "}
                    kg CO2e
                  </p>

                  <p className="mt-2 text-xs leading-5 text-emerald-700">
                    distance × weight × emission factor
                  </p>

                  <p className="mt-1 text-xs text-emerald-600">
                    {selected.distanceKm} ×{" "}
                    {selected.weightTonnes} ×{" "}
                    {selected.transportMode === "Road"
                      ? "0.12"
                      : selected.transportMode === "Rail"
                      ? "0.04"
                      : selected.transportMode === "Sea"
                      ? "0.015"
                      : "0.60"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                Select a shipment to view details.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-800">
        {value}
      </span>
    </div>
  );
}