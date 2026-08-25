---
layout: project
title: "Power System Analysis Tool — Load Flow & Short-Circuit Study"
description: "Five-bus power-system study with a from-scratch Newton-Raphson load flow in MATLAB, cross-validated against PowerWorld Simulator: transformer tap studies, stressed-loading analysis, and three-phase short-circuit calculation via Zbus with Xd'' = 0.2 pu."
category: Power Systems
group: power
date_label: May 2026
order: 5
image: "/img/research/ieee118-bus47.png"
pdf : "/projects/powersystemproject.pdf"
tools:
  - MATLAB (Newton-Raphson implementation)
  - PowerWorld Simulator
  - Short-Circuit Analysis (Zbus)
metrics:
  - value: "5 buses"
    label: "2 generators, 2 transformers, 3 lines"
  - value: "5 iterations"
    label: "Newton-Raphson convergence"
  - value: "0.8244 pu"
    label: "Bus 2 voltage under 800 MW stressed loading"
  - value: "36.28 kA"
    label: "3-phase fault current at generator bus 3"
highlights:
  - "Implemented the Newton-Raphson load flow from first principles in MATLAB: Ybus formation, Jacobian assembly, mismatch equations, and bus classification (slack / PV / PQ) on a five-bus system with a 100 MVA base and 15/345 kV voltage levels."
  - "Cross-validated every result against PowerWorld Simulator: bus voltages matched to 4 decimal places; slack reactive power within 0.22 Mvar; active-power loss difference traced to line-charging and transformer-modeling details."
  - "Quantified transformer tap sensitivity: moving T1 between 0.99 and 1.01 shifts slack reactive power by 16–17 Mvar while slack active power moves less than 1 MW."
  - "Demonstrated voltage-collapse risk under stress: doubling the Bus 2 load to 800 MW + 280 Mvar drops its voltage to 0.8244 pu and raises system losses from ~11.8 MW to 41.6 MW."
  - "Computed bolted three-phase fault currents via the Zbus method with Xd'' = 0.2 pu subtransient reactances: 9.43 pu (36.28 kA) at generator bus 3 versus 7.19 pu (1.20 kA) at the electrically remote 345 kV bus 2."
---

## Engineering Problem

Reliable operation of any power system rests on two classical studies: the load flow, which
establishes the steady-state operating point, and the short-circuit study, which sizes protection.
This project builds both from first principles for a five-bus system and validates them against
industry software.

## System Description

Five buses: Bus 1 slack (1.0 pu), Bus 3 PV (1.05 pu), Buses 2/4/5 PQ. Two generators connect through
two transformers (15 kV generator level) into a 345 kV transmission level with three lines and two
load buses. System base: 100 MVA.

## Load Flow

The MATLAB Newton-Raphson implementation converges in **5 iterations**. Base-case results: all bus
voltages within 0.98–1.05 pu; MATLAB system loss 6.10 MW versus PowerWorld's 11.82 MW — the gap
attributed to line-charging and transformer-modeling differences, with all bus voltages matching to
four decimals. The **tap study** on transformer T1 (0.99 / 1.00 / 1.01) confirms taps act mainly on
reactive distribution: slack QG shifts ∓16–17 Mvar per 1% tap step while PG moves under 1 MW.

## Stressed Loading

Doubling Bus 2 load to 800 MW + 280 Mvar drops its voltage to **0.8244 pu** — a visibly stressed
operating point — and increases total active losses to **41.60 MW**, consistent with I²R scaling.

## Short-Circuit Analysis

Using pre-fault load-flow voltages, generator subtransient reactances (Xd'' = 0.2 pu), and the Zbus
method, bolted three-phase faults give **36.28 kA at bus 3** (directly connected to a generator) and
**1.20 kA at bus 2** (electrically remote, 345 kV base). The kA contrast also illustrates the role of
voltage base on per-unit current conversion.

## Engineering Significance

Demonstrates command of power-system fundamentals at the algorithm level — not just tool usage:
Ybus/Jacobian construction, iterative solution of nonlinear power-flow equations, validation
methodology against industry software, and symmetrical fault calculation via Zbus.
