export type RiskLevel = 'critical' | 'high' | 'moderate' | 'low';
export type AlertStatus = 'open' | 'acknowledged' | 'snoozed' | 'escalated';
export type ActionStatus = 'planned' | 'active' | 'blocked' | 'completed';

export interface Region {
  id: string;
  name: string;
  level: 'country' | 'county' | 'ward';
  population: number;
  parent?: string;
}

export interface Driver {
  signal: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
  sparkData: number[];
  anomaly: boolean;
}

export interface Alert {
  id: string;
  type: string;
  regionId: string;
  regionName: string;
  riskLevel: RiskLevel;
  probability: number;
  confidence: number;
  timeWindow: string;
  affectedPopulation: number;
  status: AlertStatus;
  createdAt: string;
  drivers: Driver[];
  summary: string;
  privacyApplied: boolean;
  aggregationLevel: string;
}

export interface Action {
  id: string;
  title: string;
  alertId: string;
  regionName: string;
  status: ActionStatus;
  assignedTeam: string;
  dueDate: string;
  playbook: string[];
  completedSteps: number[];
  resourceRequests: string[];
  priority: RiskLevel;
  createdAt: string;
}

export interface Signal {
  id: string;
  name: string;
  type: 'heat' | 'water' | 'disease' | 'absenteeism' | 'ors' | 'aqi';
  regionId: string;
  regionName: string;
  currentValue: number;
  unit: string;
  trend: 'rising' | 'falling' | 'stable';
  anomaly: boolean;
  data: { date: string; value: number; baseline: number }[];
}

export const regions: Region[] = [
  { id: 'r1', name: 'Turkana County', level: 'county', population: 926976 },
  { id: 'r2', name: 'Garissa County', level: 'county', population: 841353 },
  { id: 'r3', name: 'Marsabit County', level: 'county', population: 459785 },
  { id: 'r4', name: 'Wajir County', level: 'county', population: 781263 },
  { id: 'r5', name: 'Nairobi County', level: 'county', population: 4397073 },
  { id: 'r6', name: 'Mombasa County', level: 'county', population: 1208333 },
];

const sparkUp = [12, 13, 14, 13, 16, 18, 22, 26, 29, 34];
const sparkDown = [34, 31, 28, 26, 25, 22, 20, 18, 16, 14];
const sparkFlat = [18, 19, 17, 20, 18, 19, 18, 20, 19, 18];
const sparkSpike = [14, 15, 14, 16, 22, 28, 35, 38, 36, 40];

export const alerts: Alert[] = [
  {
    id: 'a1',
    type: 'Heat-Dehydration Cluster',
    regionId: 'r1',
    regionName: 'Turkana County',
    riskLevel: 'critical',
    probability: 87,
    confidence: 82,
    timeWindow: '7–14 days',
    affectedPopulation: 84200,
    status: 'open',
    createdAt: '2026-02-17T06:00:00Z',
    privacyApplied: true,
    aggregationLevel: 'ward',
    summary: 'Heat index sustained above 42°C + ORS sales spike + facility absenteeism → likely surge in 7–14 days',
    drivers: [
      { signal: 'Heat Index', value: '44.2°C', change: '+6.1°C', direction: 'up', sparkData: sparkSpike, anomaly: true },
      { signal: 'ORS Sales Velocity', value: '+340%', change: 'vs 90-day baseline', direction: 'up', sparkData: sparkUp, anomaly: true },
      { signal: 'Facility Absenteeism', value: '38%', change: '+22pp', direction: 'up', sparkData: sparkUp, anomaly: false },
    ],
  },
  {
    id: 'a2',
    type: 'Waterborne Disease Risk',
    regionId: 'r2',
    regionName: 'Garissa County',
    riskLevel: 'high',
    probability: 71,
    confidence: 74,
    timeWindow: '10–21 days',
    affectedPopulation: 126500,
    status: 'open',
    createdAt: '2026-02-16T14:30:00Z',
    privacyApplied: true,
    aggregationLevel: 'county',
    summary: 'River turbidity spike + community health worker reports + water point usage surge → waterborne risk rising',
    drivers: [
      { signal: 'River Turbidity', value: '180 NTU', change: '+320%', direction: 'up', sparkData: sparkUp, anomaly: true },
      { signal: 'CHW Symptom Reports', value: '47 reports', change: '+180%', direction: 'up', sparkData: sparkUp, anomaly: true },
      { signal: 'Water Point Usage', value: '94%', change: '+31pp', direction: 'up', sparkData: sparkFlat, anomaly: false },
    ],
  },
  {
    id: 'a3',
    type: 'Respiratory Surge',
    regionId: 'r3',
    regionName: 'Marsabit County',
    riskLevel: 'high',
    probability: 63,
    confidence: 68,
    timeWindow: '14–28 days',
    affectedPopulation: 58900,
    status: 'acknowledged',
    createdAt: '2026-02-15T09:00:00Z',
    privacyApplied: true,
    aggregationLevel: 'county',
    summary: 'AQI sustained elevation + school absenteeism uptick + pharmacy cough-medication depletion → respiratory risk building',
    drivers: [
      { signal: 'Air Quality Index', value: '168 AQI', change: '+89pts', direction: 'up', sparkData: sparkUp, anomaly: true },
      { signal: 'School Absenteeism', value: '24%', change: '+14pp', direction: 'up', sparkData: sparkUp, anomaly: false },
      { signal: 'Cough Med Depletion', value: '61%', change: 'of stock', direction: 'up', sparkData: sparkSpike, anomaly: true },
    ],
  },
  {
    id: 'a4',
    type: 'Drought-Linked Malnutrition',
    regionId: 'r4',
    regionName: 'Wajir County',
    riskLevel: 'moderate',
    probability: 54,
    confidence: 61,
    timeWindow: '21–42 days',
    affectedPopulation: 212000,
    status: 'open',
    createdAt: '2026-02-14T11:00:00Z',
    privacyApplied: true,
    aggregationLevel: 'county',
    summary: 'NDVI decline + livestock mortality signal + food price index rising → malnutrition window opening in 3–6 weeks',
    drivers: [
      { signal: 'NDVI Vegetation', value: '−0.18', change: '−34%', direction: 'down', sparkData: sparkDown, anomaly: true },
      { signal: 'Livestock Mortality', value: '12%', change: '+8pp', direction: 'up', sparkData: sparkUp, anomaly: false },
      { signal: 'Staple Food Price', value: '+67%', change: 'vs last season', direction: 'up', sparkData: sparkUp, anomaly: true },
    ],
  },
  {
    id: 'a5',
    type: 'Urban Heat + Flooding',
    regionId: 'r5',
    regionName: 'Nairobi County',
    riskLevel: 'moderate',
    probability: 48,
    confidence: 71,
    timeWindow: '3–10 days',
    affectedPopulation: 380000,
    status: 'snoozed',
    createdAt: '2026-02-13T08:00:00Z',
    privacyApplied: true,
    aggregationLevel: 'ward',
    summary: 'Urban heat island + forecast heavy rain → combined flooding + heat stress in informal settlements',
    drivers: [
      { signal: 'Urban Heat Island', value: '+3.8°C', change: 'vs peri-urban', direction: 'up', sparkData: sparkFlat, anomaly: false },
      { signal: 'Rainfall Forecast', value: '180mm/wk', change: '+240%', direction: 'up', sparkData: sparkSpike, anomaly: true },
      { signal: 'Drainage Capacity', value: '22%', change: 'of design spec', direction: 'down', sparkData: sparkDown, anomaly: false },
    ],
  },
];

export const actions: Action[] = [
  {
    id: 'ac1',
    title: 'Deploy ORS + Hydration Units — Turkana',
    alertId: 'a1',
    regionName: 'Turkana County',
    status: 'active',
    assignedTeam: 'County Rapid Response Unit',
    dueDate: '2026-02-24',
    priority: 'critical',
    createdAt: '2026-02-17T08:00:00Z',
    playbook: [
      'Confirm vehicle + driver availability',
      'Load ORS stock (target: 5,000 sachets)',
      'Coordinate with Turkana DCC for access',
      'Identify 8 priority distribution points (wards)',
      'Deploy CHW teams for point-of-distribution',
      'Record distribution by ward aggregate',
      'Submit Day-1 situation report',
    ],
    completedSteps: [0, 1, 2],
    resourceRequests: ['4×4 vehicles (x3)', 'ORS stock (5,000 units)', 'CHW daily allowances (14 staff × 7 days)'],
  },
  {
    id: 'ac2',
    title: 'Water Quality Testing — Garissa River Points',
    alertId: 'a2',
    regionName: 'Garissa County',
    status: 'active',
    assignedTeam: 'WASH Technical Team',
    dueDate: '2026-02-22',
    priority: 'high',
    createdAt: '2026-02-16T16:00:00Z',
    playbook: [
      'Deploy mobile water testing kits to 6 river points',
      'Collect aggregate water quality samples',
      'Test for coliform, turbidity, pH',
      'Brief community leaders on boiling advisory',
      'Distribute water purification tablets (aggregate)',
      'Follow-up test in 5 days',
    ],
    completedSteps: [0, 1],
    resourceRequests: ['Water testing kits (x12)', 'Purification tablets (2,000 units)', 'Transport (x2 vehicles)'],
  },
  {
    id: 'ac3',
    title: 'AQI Community Alert — Marsabit',
    alertId: 'a3',
    regionName: 'Marsabit County',
    status: 'planned',
    assignedTeam: 'Health Promotion Team',
    dueDate: '2026-02-28',
    priority: 'high',
    createdAt: '2026-02-15T11:00:00Z',
    playbook: [
      'Draft community bulletin (Swahili + Borana)',
      'Approve bulletin via DCC',
      'Distribute via radio + community boards',
      'Identify vulnerable household clusters (aggregate)',
      'Deploy N95 masks to priority facilities',
      'Brief school health coordinators',
    ],
    completedSteps: [0],
    resourceRequests: ['N95 masks (500 units)', 'Radio broadcast slots (x6)', 'Translation services'],
  },
  {
    id: 'ac4',
    title: 'WASH + Nutrition Surge Plan — Wajir',
    alertId: 'a4',
    regionName: 'Wajir County',
    status: 'planned',
    assignedTeam: 'County Nutrition Cluster',
    dueDate: '2026-03-07',
    priority: 'moderate',
    createdAt: '2026-02-14T14:00:00Z',
    playbook: [
      'Activate county nutrition cluster',
      'Pre-position RUTF at 12 facilities',
      'Brief facility staff on screening protocol',
      'Coordinate with WFP on pipeline',
      'Establish referral pathways',
    ],
    completedSteps: [],
    resourceRequests: ['RUTF (2,000 sachets)', 'Screening equipment', 'WFP coordination call'],
  },
  {
    id: 'ac5',
    title: 'Drainage Assessment — Nairobi Informal Settlements',
    alertId: 'a5',
    regionName: 'Nairobi County',
    status: 'blocked',
    assignedTeam: 'City Engineering + NDMA',
    dueDate: '2026-02-20',
    priority: 'moderate',
    createdAt: '2026-02-13T10:00:00Z',
    playbook: [
      'Identify 5 highest-risk drainage corridors',
      'Request engineering assessment team',
      'Clear primary blockage points',
      'Pre-position sandbags at 3 flood zones',
      'Coordinate with Nairobi City County',
    ],
    completedSteps: [0],
    resourceRequests: ['Engineering team access approval (BLOCKED)', 'Sandbags (500 units)', 'Emergency funds authorization'],
  },
];

const generateSignalData = (base: number, trend: 'rising' | 'falling' | 'stable', anomaly: boolean) => {
  const days = 30;
  return Array.from({ length: days }, (_, i) => {
    const date = new Date('2026-01-20');
    date.setDate(date.getDate() + i);
    const baseline = base;
    let value = base;
    if (trend === 'rising') value = base + (i * base * 0.03) + (Math.random() - 0.4) * base * 0.1;
    if (trend === 'falling') value = base - (i * base * 0.02) + (Math.random() - 0.4) * base * 0.1;
    if (trend === 'stable') value = base + (Math.random() - 0.5) * base * 0.1;
    if (anomaly && i >= 24) value = value * (1 + (i - 24) * 0.15);
    return {
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 10) / 10,
      baseline,
    };
  });
};

export const signals: Signal[] = [
  {
    id: 's1', name: 'Heat Index', type: 'heat', regionId: 'r1', regionName: 'Turkana County',
    currentValue: 44.2, unit: '°C', trend: 'rising', anomaly: true,
    data: generateSignalData(36, 'rising', true),
  },
  {
    id: 's2', name: 'ORS Sales Velocity', type: 'ors', regionId: 'r1', regionName: 'Turkana County',
    currentValue: 340, unit: '% vs baseline', trend: 'rising', anomaly: true,
    data: generateSignalData(100, 'rising', true),
  },
  {
    id: 's3', name: 'River Turbidity', type: 'water', regionId: 'r2', regionName: 'Garissa County',
    currentValue: 180, unit: 'NTU', trend: 'rising', anomaly: true,
    data: generateSignalData(42, 'rising', true),
  },
  {
    id: 's4', name: 'Air Quality Index', type: 'aqi', regionId: 'r3', regionName: 'Marsabit County',
    currentValue: 168, unit: 'AQI', trend: 'rising', anomaly: true,
    data: generateSignalData(80, 'rising', true),
  },
  {
    id: 's5', name: 'NDVI Vegetation Index', type: 'disease', regionId: 'r4', regionName: 'Wajir County',
    currentValue: -0.18, unit: 'NDVI', trend: 'falling', anomaly: true,
    data: generateSignalData(0.35, 'falling', false),
  },
  {
    id: 's6', name: 'School Absenteeism', type: 'absenteeism', regionId: 'r3', regionName: 'Marsabit County',
    currentValue: 24, unit: '%', trend: 'rising', anomaly: false,
    data: generateSignalData(10, 'rising', false),
  },
];

export const coverageMetrics = {
  signalCoverage: 83,
  dataFreshness: 91,
  modelConfidence: 74,
  regionsMonitored: 47,
  signalsActive: 138,
  alertsOpen: 3,
  actionsInProgress: 2,
};
