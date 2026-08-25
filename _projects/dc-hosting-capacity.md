---
layout: project
title: "Protection-Aware Data-Center Hosting Capacity — IEEE 33 & 118"
description: "Foundation of the data-center research: large-load hosting capacity and protection screening on the IEEE 33-bus and 118-bus systems, with exhaustive enumeration, Genetic Algorithm, and Particle Swarm Optimization placement search, per-bus hosting-capacity sweeps, and short-circuit studies in pandapower."
category: Power Systems Research
group: power
date_label: 2025 – 2026
order: 2
image: "/img/research/ieee118-voltage-profile.png"
tools:
  - Python
  - pandapower
  - PyGAD (Genetic Algorithm)
  - PySwarms (Particle Swarm Optimization)
  - SciPy (Differential Evolution)
metrics:
  - value: "50 MW"
    label: "Data-center load class at 0.95 PF"
  - value: "118"
    label: "Candidate buses enumerated"
  - value: "285.6 MW"
    label: "Max per-bus hosting capacity (bus 115)"
  - value: "0"
    label: "Line overloads at optimal bus"
highlights:
  - "Defined the core research question: where can a large data-center load be connected while keeping all bus voltages within 0.95–1.05 pu and all line loadings within limits?"
  - "Screened the IEEE 33-bus distribution feeder — including a 16.5 MW data-center load pilot at bus 18 with voltage-violation checks — then scaled to the IEEE 118-bus transmission system with complete enumeration of all 118 candidate buses."
  - "Added protection awareness: maximum and minimum three-phase fault-current screening with pandapower's IEC 60909 short-circuit module (bounded external-grid sources, 250 °C line end-temperature) to characterize fault levels alongside steady-state limits."
  - "Computed per-bus maximum hosting capacity via bisection search — up to 285.6 MW addable at the strongest bus — and ranked all buses by a combined voltage-deviation and loss objective."
  - "Implemented Genetic Algorithm (PyGAD), Particle Swarm Optimization (PySwarms), and Differential Evolution (SciPy) as metaheuristic placement searchers; all converged on the same optimal bus as exhaustive enumeration, cross-validating the formulation."
  - "Treated baseline network weaknesses honestly: pre-existing voltage violations excluded from feasibility counting so results measure new impact only."
---

## Engineering Problem

Before allocating gigawatts of data-center demand on a real network, the placement methodology must be
proven on standard test systems. The question at this stage: **given a 50 MW data-center load
(0.95 power factor), which bus of a test network can host it with minimum grid impact — and how much
load can each bus actually absorb before constraints bind?**

## Methodology

The framework is built on **pandapower** with every tunable parameter — load size, voltage limits,
penalty weights, optimizer hyper-parameters, random seeds — centralized for reproducibility.

- **IEEE 33-bus feeder:** initial power-flow screening of voltage behavior and hosting-capacity
  concepts on a radial distribution network, including a **16.5 MW data-center load pilot at bus 18**
  with voltage-violation checks.
- **Protection screening:** maximum and minimum three-phase fault currents computed with
  pandapower's IEC 60909 short-circuit module (bounded external-grid sources, 250 °C conductor
  end-temperature), so placement decisions see fault levels — not only steady-state limits.
- **IEEE 118-bus system:** complete enumeration of all 118 candidate buses. Each evaluation runs a
  Newton-Raphson power flow, then checks voltage limits (0.95–1.05 pu, with generator-controlled and
  baseline-violation buses excluded), line and transformer loading limits, and slack adequacy.
- **Hosting-capacity sweep:** per-bus maximum addable load found by doubling/bisection search —
  the strongest bus absorbs 285.6 MW before violations.
- **Metaheuristic search:** Genetic Algorithm (PyGAD) and Particle Swarm Optimization (PySwarms)
  minimize a combined objective of voltage deviation and system losses, with Differential Evolution
  (SciPy) as a third reference searcher.

## Results

![IEEE 118-bus voltage profile: base case versus 50 MW data-center load at bus 88](/img/research/ieee118-voltage-profile.png)

All four methods — exhaustive enumeration, GA, PSO, and DE — independently identify the same optimal
placement bus (bus 47), with identical fitness: voltage deviation index 0.0441 pu, system losses
137.23 MW, zero line overloads. A complementary fixed-load ranking across all buses places bus 88
first by combined score. The metaheuristics reproduce the exhaustive result at a fraction of the
evaluations, demonstrating that the objective formulation — not search luck — drives the answer.

![IEEE 118-bus voltage profile with the 50 MW load placed at the optimal bus 47](/img/research/ieee118-bus47.png)

## Role in the Research Arc

This stage established the constraint framework (0.95–1.05 pu, 100% loading limits, baseline-aware
feasibility) and the optimizer-validation pattern later scaled to the 2,891-bus Virginia network,
where exhaustive enumeration is impossible and the formulation evolves into mixed-integer nonlinear
optimization with AC validation checks.

## Engineering Significance

Demonstrates power-flow-based feasibility engineering, optimization formulation and
cross-validation, and disciplined treatment of baseline network weaknesses — the methodological
foundation for the large-scale Virginia study.
