export type KpiMetric = {
  title: string;
  value: string;
  description: string;
  icon: "suppliers" | "shipments" | "emissions" | "compliant" | "risk" | "nonCompliant";
};

export type EmissionData = {
  month: string;
  emissions: number;
};

export type ComplianceData = {
  label: string;
  value: number;
  percentage: number;
  type: "compliant" | "risk" | "nonCompliant";
};

export type ActivityItem = {
  title: string;
  description: string;
  time: string;
  type: "verified" | "shipment" | "emission" | "compliance" | "ledger";
};

export const kpiMetrics: KpiMetric[] = [
  {
    title: "Total Suppliers",
    value: "128",
    description: "Registered suppliers",
    icon: "suppliers",
  },
  {
    title: "Total Shipments",
    value: "1,284",
    description: "Tracked shipments",
    icon: "shipments",
  },
  {
    title: "Scope-3 Emissions",
    value: "4,826 tCO₂e",
    description: "Current reporting period",
    icon: "emissions",
  },
  {
    title: "Compliant Suppliers",
    value: "96",
    description: "75% of suppliers",
    icon: "compliant",
  },
  {
    title: "At-Risk Suppliers",
    value: "22",
    description: "Require attention",
    icon: "risk",
  },
  {
    title: "Non-Compliant Suppliers",
    value: "10",
    description: "Immediate action required",
    icon: "nonCompliant",
  },
];

export const emissionsData: EmissionData[] = [
  {
    month: "May",
    emissions: 720,
  },
  {
    month: "Jun",
    emissions: 805,
  },
  {
    month: "Jul",
    emissions: 760,
  },
  {
    month: "Aug",
    emissions: 890,
  },
  {
    month: "Sep",
    emissions: 835,
  },
  {
    month: "Oct",
    emissions: 816,
  },
];

export const complianceData: ComplianceData[] = [
  {
    label: "Compliant",
    value: 96,
    percentage: 75,
    type: "compliant",
  },
  {
    label: "At Risk",
    value: 22,
    percentage: 17,
    type: "risk",
  },
  {
    label: "Non-Compliant",
    value: 10,
    percentage: 8,
    type: "nonCompliant",
  },
];

export const recentActivities: ActivityItem[] = [
  {
    title: "Supplier certificate verified",
    description: "GreenTech Manufacturing certification was successfully verified.",
    time: "12 minutes ago",
    type: "verified",
  },
  {
    title: "Shipment submitted",
    description: "Shipment ST-10284 was added to the supply-chain tracking system.",
    time: "34 minutes ago",
    type: "shipment",
  },
  {
    title: "Scope-3 emission calculated",
    description: "Emissions were calculated for shipment ST-10279.",
    time: "1 hour ago",
    type: "emission",
  },
  {
    title: "Compliance status updated",
    description: "EcoSource Industries moved from At Risk to Compliant.",
    time: "2 hours ago",
    type: "compliance",
  },
  {
    title: "ESG ledger entry created",
    description: "A new verified sustainability record was added to the ESG ledger.",
    time: "3 hours ago",
    type: "ledger",
  },
];