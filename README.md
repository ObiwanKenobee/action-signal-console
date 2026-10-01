# PHES Web

> **PHES Web is not a dashboard. It is an Action Ops console for upstream public-health risk response.**

PHES Web helps public-health teams move from **early signals to coordinated action** before conditions become emergencies.

It combines:

**Early-signal risk forecasts → Explainability → Micro-interventions → Operational workflows → Verification → Learning**

Think of it as **public-health incident response, but upstream**.

The interface is intentionally calm, operational, and evidence-driven.

> **Boring ships.**

---

# Core Operating Loop

```text
OBSERVE
   ↓
Detect signals and anomalies
   ↓
UNDERSTAND
   ↓
Explain why risk is rising
   ↓
DECIDE
   ↓
Select practical interventions
   ↓
ACT
   ↓
Assign, deploy, and coordinate
   ↓
VERIFY
   ↓
Confirm what happened in the field
   ↓
LEARN
   ↓
Record outcomes and improve future decisions
```

The product is built around one principle:

> **Every important signal should have a path to action.**

---

# Who Uses PHES Web?

## 1. Ministry / County Decision Makers

### Need

> **What is rising, where, why, and what should we do this week?**

### Web surfaces

* Risk Map
* Alerts Feed
* Intervention playbooks
* Budget impact and resource plans
* Weekly briefing export

The interface prioritizes decisions rather than raw analytics.

---

## 2. District Operations Leads

### Need

> **Turn a prompt into action and track execution.**

### Web surfaces

* Task board
* Assignments and status
* Playbook checklists
* Logistics requests
* Vehicle, supply, and staffing coordination
* Field confirmation
* Outcomes

Operations users should be able to move from an alert to deployed action without navigating through multiple disconnected systems.

---

## 3. Analysts / Model Operations

### Need

> **Is the model sane? Are signals drifting?**

### Web surfaces

* Signal Explorer
* Multi-signal time series
* Correlation analysis
* Threshold tuning
* Data-quality monitoring
* Coverage monitoring
* Model versions
* Evaluation snapshots
* Drift warnings

This is an advanced workspace.

Most users should **not** need to live here.

---

## 4. Frontline Contributors

Examples:

* Community Health Workers
* Health Facilities
* Schools
* Community organizations

Not everyone needs the full web application.

### Field Web Surface

**Ultra-light Report Portal / PWA**

* Offline forms
* Local form storage
* Sync when connectivity returns
* SMS fallback
* Community bulletin output for non-sensitive information

This is where the system meets reality.

---

# Information Architecture

Everything in PHES Web is built around a small set of core objects.

```text
Region
  ↓
Signal
  ↓
Anomaly
  ↓
Cluster
  ↓
Risk Forecast
  ↓
Recommendation
  ↓
Action
  ↓
Outcome
```

## Core Objects

### Region

Hierarchical geography:

```text
Country
  └── County
       └── Ward
            └── Facility Catchment
```

### Signal

Observed indicator such as:

* Heat index
* ORS sales trend
* Absenteeism
* AQI
* Water stress
* Facility load
* Other approved aggregate indicators

### Anomaly

A signal that deviates beyond its expected bounds.

### Cluster

Multiple anomalies correlated across time and/or geography.

### Risk Forecast

A probability, time window, and confidence estimate describing a potential emerging risk.

### Recommendation

A proposed intervention tied to a risk, playbook, estimated cost, and expected effect.

### Action

Operational work created from a recommendation.

Includes:

* Assignment
* Deployment
* Deadlines
* Resources
* Verification

### Outcome

Observed effects following intervention.

Outcomes are essential because **the system must learn from action**.

---

# Navigation

The primary navigation remains deliberately simple.

```text
Overview
Risk Map
Alerts
Actions
Signals
Scenarios
Reports
Admin & Privacy
Model / Quality
```

`Model / Quality` is restricted to analyst and model-operations roles.

---

# Key Screens

## A. Overview — Command Brief

The Overview provides the current operational picture.

### Core components

**Top 5 Rising Risks**

Each card contains:

* Region
* Risk type
* Estimated time window

**Actionable Windows**

Upcoming intervention opportunities across the next **7–21 days**.

**Actions in Progress**

Operational summary of work already underway.

**Coverage & Quality**

A simple indicator showing how reliable the current system read is based on data coverage and quality.

### Golden Rule

Every decision-relevant card includes:

**Take Action**

The user should never have to ask:

> “What am I supposed to do with this?”

---

# B. Risk Map — Spatial Reasoning

The Risk Map connects emerging risk to geography.

## Map layers

### Forecast Risk

Aggregated risk heat layer.

### Signals

Toggleable layers such as:

* Heat
* Water stress
* Absenteeism
* AQI
* Other approved signals

### Infrastructure

Optional overlays:

* Clinics
* Water points
* Roads
* Other relevant operational infrastructure

---

## Region Drawer

Clicking a region opens a contextual drawer containing:

```text
Risk Trend
     ↓
Top Contributing Signals
     ↓
Recommended Interventions
     ↓
Create Action
```

The map is not simply for visualization.

It is a **decision surface**.

---

# C. Alerts Feed — Triage

The Alerts Feed is a queue, not a chart zoo.

Each alert contains:

* Risk type
* Region
* Aggregated affected-population estimate
* Probability
* Time window
* Confidence
* Top contributing drivers

### Example

```text
HEAT / DEHYDRATION RISK

Region:
Ward / County

Affected population:
Aggregated estimate

Probability:
72%

Window:
10–18 days

Confidence:
High

Why this alert?
Heat anomaly
+ ORS sales increase
+ absenteeism
```

### Actions

**Acknowledge**

**Create Action**

**Snooze**

Requires a reason.

**Escalate**

---

# D. Alert Detail — Explainability

This is where trust is built.

## Summary

Example:

> **Heat + ORS spike + absenteeism → elevated surge risk within 14 days.**

## Drivers

Every major driver should include:

* Signal name
* Sparkline
* Anomaly marker
* Relative contribution or relevance

## Evidence Graph

A network view showing relationships between signals.

```text
          Heat
           │
     ┌─────┴─────┐
     ↓           ↓
   ORS        Absenteeism
     │           │
     └─────┬─────┘
           ↓
       Risk Forecast
```

## Suggested Actions

Interventions are presented according to operational criteria such as:

* Cost
* Feasibility
* Expected impact
* Required resources

## Audit Trail

Shows:

* Who viewed the alert
* Who acknowledged it
* Who created an action
* Subsequent decisions

The recommendation is not a black box.

---

# E. Actions — Operations

Actions turn intelligence into execution.

## Kanban

```text
┌─────────┬─────────┬─────────┬────────────┐
│ Planned │ Active  │ Blocked │ Completed  │
└─────────┴─────────┴─────────┴────────────┘
```

Each action contains:

### Playbook

Step-by-step operational checklist.

### Assignment

* Responsible team
* Owner
* Due dates

### Resources

* Supplies
* Vehicles
* Staffing
* Approvals

### Verification

Examples:

* Field confirmation
* Facility load
* Supply utilization
* Deployment confirmation

### Outcome

Structured outcome notes capturing what actually happened.

> **An action without an outcome is incomplete.**

Outcomes make future intervention planning better.

---

# F. Signals Explorer — Analyst Lite

For advanced users.

### Capabilities

* Multi-signal timeline overlays
* Coverage-gap inspection
* Correlations
* Drift warnings
* Aggregate dataset downloads
* Signal metadata

### Example drift warning

> **Pharmacy data changed format**

The majority of users should not spend their day here.

It is an operational support surface, not the product's center of gravity.

---

# G. Scenario Simulator

**Optional for the first release, powerful for later phases.**

The Scenario Simulator explores structured alternatives.

### Example

> **What if we deploy hydration units instead of radio messaging only?**

### Inputs

Simple controls for:

* Budget
* Staffing
* Supplies
* Deployment scale

### Output

* Expected effect curve
* Assumptions
* Uncertainty
* Resource implications
* Strategy comparison

The simulator is designed to support planning.

It should not present uncertain model outputs as prophecy.

---

# H. Reports — Stakeholder Outputs

PHES should convert operational intelligence into usable institutional outputs.

## Weekly Early-Warning Brief

Auto-generated summary containing:

* Rising risks
* Regions affected
* Key drivers
* Recommended actions
* Operational status

## District Action Summary

Tracks:

* Actions initiated
* Actions completed
* Blockers
* Verification status
* Outcomes

## KPI Trends

Potential measures include:

* Lead time gained
* Response speed
* Intervention completion
* Coverage
* Estimated avoided surge

### Exports

* PDF
* Controlled share links

---

# Privacy by Design

Privacy is a core product property, not a legal appendix.

## Non-negotiable rules

### No Individual Records in the Interface

The web application does **not** expose individual-level records.

### Minimum Aggregation Thresholds

When a population or sample is too small:

```text
Insufficient aggregation
```

The UI does not reveal the underlying value.

### Differential Privacy

Where applicable, outputs include a visible:

**Privacy Applied**

badge.

Expanding the badge explains the privacy treatment applied to the result.

### Role-Based Access

Different roles receive different levels of aggregate detail.

Analysts may access additional aggregate information, but **raw identity data remains outside the application**.

### Auditability

Administrators can inspect audit events associated with:

* Alerts
* Actions
* Recommendations
* Access
* Approvals

The objective is to make the platform's **not-surveillance-by-design** claim inspectable in the product itself.

---

# Data Transparency

Decision-relevant payloads should explicitly expose important metadata.

Example:

```json
{
  "confidence": 0.82,
  "time_window": "14d",
  "aggregation_level": "ward",
  "privacy_budget_applied": true
}
```

The frontend should treat these fields as first-class information.

---

# Offline-First Field Portal

PHES supports two operational modes.

## Mode 1 — Full Web

Designed for:

* Ministries
* Counties
* Analysts
* Operations teams

Requires normal connectivity.

## Mode 2 — Field Portal

A lightweight Progressive Web App for fragile-connectivity environments.

### Capabilities

* Cache form schemas
* Cache region lists
* Store submissions locally
* Use IndexedDB
* Maintain a sync queue
* Synchronize automatically when online

### SMS Fallback

When data connectivity is unavailable, the application can generate a structured SMS representation of a field report.

Example:

```text
PHES|REPORT|REGION=XXX|TYPE=XXXX|VALUE=XXX|TIME=XXXX
```

The purpose is simple:

> **The system must continue to work when the network does not.**

---

# Frontend Technology Stack

PHES uses pragmatic, maintainable technologies.

| Layer                | Technology                        |
| -------------------- | --------------------------------- |
| Framework            | Next.js App Router                |
| Language             | TypeScript                        |
| Server State         | TanStack Query                    |
| UI State             | Zustand                           |
| Mapping              | Mapbox GL / Leaflet               |
| Charts               | Recharts / ECharts                |
| Design System        | Tailwind CSS + shadcn/ui approach |
| Authentication       | OIDC                              |
| Identity Providers   | Keycloak / Auth0 / Cognito        |
| Internationalization | next-intl                         |
| Offline Storage      | IndexedDB                         |
| Deployment           | Containerized web application     |

Leaflet can be used for the initial implementation where cost and simplicity are priorities.

---

# Frontend API Contract

The frontend uses a boring REST-style interface for clarity.

## Regions

```http
GET /regions?level=county
```

## Forecasts

```http
GET /forecasts?region_id={id}&range=21d
```

## Alerts

```http
GET /alerts?status=open&region_id={id}
```

## Alert Detail

```http
GET /alerts/{id}
```

Returns:

* Alert metadata
* Drivers
* Explanations
* Evidence
* Recommendations
* Audit context

## Actions

```http
POST /actions
PATCH /actions/{id}
```

## Signals

```http
GET /signals?region_id={id}&signal_type={type}
```

## Audit

```http
GET /audit?entity=alert&id={id}
```

---

# Suggested Repository Structure

```text
phes-web/
├── app/
│   ├── overview/
│   ├── map/
│   ├── alerts/
│   │   └── [id]/
│   ├── actions/
│   │   └── [id]/
│   ├── signals/
│   ├── scenarios/
│   ├── reports/
│   └── admin/
│
├── components/
│   ├── RegionSelector/
│   ├── RiskCard/
│   ├── AlertRow/
│   ├── DriverSparkline/
│   ├── ConfidencePill/
│   ├── PrivacyBadge/
│   ├── ActionPlaybookChecklist/
│   ├── AuditTrailPanel/
│   └── DataCoverageWidget/
│
├── features/
│   ├── alerts/
│   ├── forecasts/
│   ├── actions/
│   ├── signals/
│   ├── reports/
│   └── privacy/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── query/
│   ├── storage/
│   └── validation/
│
└── public/
```

---

# Query Key Conventions

TanStack Query keys should be standardized.

```ts
['alerts', filters]

['forecast', regionId, range]

['signals', regionId, type, range]

['action', actionId]

['region', regionId]
```

Predictable query keys make cache behavior, invalidation, and debugging easier.

---

# MVP Build Plan

The first release should prove the complete loop with as little unnecessary surface area as possible.

## 1. Alerts + Map

Build:

* Alerts Feed
* Alert Detail
* Risk Map
* Region Drawer

The user can discover a risk and understand why it matters.

## 2. Action Creation

Build:

* Recommendation → Action flow
* Assignment
* Due dates
* Playbook
* Resource requests

The user can turn intelligence into work.

## 3. Action Board

Build:

* Planned
* Active
* Blocked
* Completed
* Verification
* Outcome capture

The system can now track execution.

## 4. Reports

Build:

* Weekly Early-Warning Brief
* District Action Summary
* PDF export

The system can communicate operational intelligence to stakeholders.

## 5. Field Portal

Build:

* Offline reporting
* IndexedDB persistence
* Sync queue
* SMS fallback

The system can operate beyond reliable connectivity.

---

# Phase 2

Everything below can remain outside the initial MVP:

* Scenario simulation
* Advanced signal analytics
* Threshold tuning
* Model version management
* Evaluation dashboards
* Advanced graph analysis
* Additional interventions
* Expanded reporting
* More data sources

These are useful only after the primary operational loop is working.

---

# Design Doctrine

## Keep It Boring

PHES does not need to look futuristic to be valuable.

It needs to be:

* Fast
* Legible
* Calm
* Reliable
* Auditable
* Operational

Avoid visual complexity that does not improve decisions.

---

## Reduce Panic, Increase Clarity

Avoid sensational alert language.

Prefer:

> **Risk rising**

over:

> **Outbreak imminent**

Prefer:

> **Elevated risk within 14–21 days**

over:

> **Crisis incoming**

The interface should communicate uncertainty honestly while making action obvious.

---

# UI Principles

### Always Explain

Every major alert or recommendation should answer:

> **Why?**

### Always Show Confidence

Users should know how certain the system is.

### Always Provide a Next Step

Every actionable signal should have a path toward intervention.

### Avoid Red Everywhere

Constant red creates alert fatigue.

Use visual hierarchy to distinguish:

* Information
* Watch
* Action required
* Critical operational states

### Keep Privacy Visible

Privacy should be understandable from the interface itself.

### Make Outcomes Easy

Field teams should be able to record what happened with minimal friction.

---

# Product Boundary

PHES Web is not intended to become a generic analytics platform.

Its purpose is to connect **public-health intelligence with upstream action**.

The central question is:

> **What is changing, why does it matter, what can we do now, and did it work?**

---

# Definition of Done for the MVP

A user should be able to:

```text
1. See a rising risk
        ↓
2. Open the alert
        ↓
3. Understand the drivers
        ↓
4. Review confidence and evidence
        ↓
5. Select a practical intervention
        ↓
6. Create an action
        ↓
7. Assign the action
        ↓
8. Track deployment
        ↓
9. Verify the field outcome
        ↓
10. Record what happened
```

That workflow is the product.

Everything else is secondary.

---

# Vision

PHES Web is the operational interface between **early intelligence and public-health action**.

It does not try to replace human decision-makers.

It helps them see earlier, understand better, act sooner, verify results, and retain what was learned.

> **Detect early. Explain clearly. Act upstream. Verify in the field. Learn continuously.**
