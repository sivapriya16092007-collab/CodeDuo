"use client";

import { useEffect, useState } from "react";
import {
  calculateShipmentEmissions,
  demoLedgerEvents,
  demoShipments,
  formatNumber,
  getStatusClasses,
  ledgerStorageKey,
  type LedgerEvent,
} from "@/lib/sourcetrace-mvp";

export default function LedgerPage() {
  const [events, setEvents] =
    useState<LedgerEvent[]>(demoLedgerEvents);

  useEffect(() => {
    const stored = localStorage.getItem(ledgerStorageKey);

    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch {
        setEvents(demoLedgerEvents);
      }
    } else {
      localStorage.setItem(
        ledgerStorageKey,
        JSON.stringify(demoLedgerEvents)
      );
    }
  }, []);

  function addDemoEvent() {
    const shipment = demoShipments[0];

    const event: LedgerEvent = {
      id: `EVT-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      supplier: shipment.supplier,
      shipmentId: shipment.id,
      eventType: "Emission calculated",
      description:
        "A new demo emission calculation was recorded in the ESG ledger.",
      co2ImpactKg: calculateShipmentEmissions(shipment),
      status: "Recorded",
    };

    const next = [event, ...events];

    setEvents(next);

    localStorage.setItem(
      ledgerStorageKey,
      JSON.stringify(next)
    );
  }

  const totalImpact = events.reduce(
    (total, event) => total + event.co2ImpactKg,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              SourceTrace / Audit
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              ESG Ledger
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              A local demo audit trail of sustainability and
              compliance events.
            </p>
          </div>

          <button
            type="button"
            onClick={addDemoEvent}
            className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Record Demo Event
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="Ledger events"
            value={events.length.toString()}
          />

          <Stat
            label="Recorded CO2 impact"
            value={`${formatNumber(totalImpact)} kg`}
          />

          <Stat
            label="Audit status"
            value="Active"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Audit Event Ledger
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Events are persisted in browser localStorage for the
              demo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Event ID</th>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Shipment ID</th>
                  <th className="px-5 py-3">Event type</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">CO2 impact</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold text-blue-700">
                      {event.id}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-slate-500">
                      {formatTimestamp(event.timestamp)}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-800">
                      {event.supplier}
                    </td>

                    <td className="px-5 py-4">
                      {event.shipmentId ? (
                        <span className="font-medium text-blue-700">
                          {event.shipmentId}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {event.eventType}
                      </span>
                    </td>

                    <td className="max-w-[330px] px-5 py-4 text-slate-600">
                      {event.description}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-slate-900">
                      {event.co2ImpactKg > 0
                        ? `${formatNumber(event.co2ImpactKg)} kg`
                        : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">
            Ledger purpose
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-700">
            SourceTrace records shipment, document, certificate,
            emission, compliance and risk events in a chronological
            demo ledger. This MVP uses browser localStorage rather
            than a blockchain or external database.
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}