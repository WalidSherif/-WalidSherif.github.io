---
layout: project
title: "Grid-Aware Data-Center Placement on a 2,891-Bus Virginia Network"
description: "Large-scale mixed-integer nonlinear planning problem — 13 data-center sites (11,559.4 MW requested) on a synthetic Virginia transmission network — solved through hierarchical MILP/MISOCP decomposition and verified with full AC power flow and N-1 contingency analysis. Final source-constrained allocation: 1,258.8 MW."
category: Power Systems Research
group: power
date_label: 2026
order: 1
image: "/img/research/voltage-profile.png"
tools:
  - Python
  - pandapower
  - SCIP / PySCIPOpt
  - SOC (Jabr) branch-flow relaxation
  - NREL county-level data-center data
metrics:
  - value: "1,258.8 MW"
    label: "Final allocation (7 of 13 sites)"
  - value: "2,891 / 1,833"
    label: "Buses / lines modeled"
  - value: "0"
    label: "New violations vs baseline"
  - value: "225"
    label: "N-1 contingencies, all convergent"
  - value: "ρ = 1.0000"
    label: "SOC vs AC Spearman correlation"
  - value: "0.068%"
    label: "Max surrogate loss error"
highlights:
  - "Formulated grid-aware data-center allocation with discrete site/island/bus decisions and continuous MW/MVAr allocation under nonlinear AC power-flow physics — a mixed-integer nonlinear problem."
  - "Decomposed the problem into three exact stages: a global site-to-island assignment MILP (SCIP via PySCIPOpt, optimal in 0.33 s over 1,992 feasible site–island pairs), a loss-minimizing MISOCP per assigned island using the Jabr second-order-cone branch-flow relaxation, and mandatory full-network AC validation."
  - "Excluded slack/ext-grid and generator buses from candidacy after identifying that siting on grid interconnection points is degenerate and hides all grid impact."
  - "AC-benchmarked 68 candidate buses across the five largest sites with pandapower Newton-Raphson: 64 feasible, 4 genuine infeasibilities; SOC surrogate achieved Spearman ρ = 1.0000 with max relative loss error 0.068% (n = 64)."
  - "Ran a 225-contingency N-1 study (220 branches + 5 largest generators): every case converges, zero new voltage or thermal violations versus baseline, worst post-contingency loading 99.35%."
  - "Reported the headline answer honestly: under a source-constrained scenario (no additional external import), the existing generation fleet serves 1,258.8 MW of the 11,559.4 MW requested — the full request is rejected with a ~7.07 GW import deficit even at maximum fleet redispatch."
---

## Engineering Problem

Data-center demand is concentrating in grids faster than any conventional load class. The engineering
question: **which buses on a realistic transmission network can host large data-center loads — and how
much capacity — while every bus voltage stays within 0.95–1.05 pu and every line within its thermal
rating?** At county scale this becomes a siting problem with discrete decisions (which sites, which
electrical islands, which buses) coupled to continuous decisions (MW/MVAr allocation) through nonlinear
AC power-flow relationships — a large-scale **mixed-integer nonlinear planning problem**. It is not
handed to a monolithic MINLP solver: the implementation solves it through hierarchical
**MILP/MISOCP decomposition**, with every output verified against full AC power flow.

## Methodology

The network — a synthetic Virginia transmission model (ACTIVSg extract) with **2,891 buses, 1,833 lines,
343 generators, and 608 external-grid ties** — fragments into ~608 electrically disconnected islands.
The method exploits this structure with a three-stage hierarchical decomposition:

1. **Stage 1 — Global assignment MILP (SCIP via PySCIPOpt).** One-to-one site-to-island matching over
   1,992 feasible (site, island) pairs, admissible only when the island holds a non-protected bus with
   sufficient headroom (1.5× margin). Optimal assignment of all 13 sites in 0.33 s.
2. **Stage 2 — Candidate-bus MISOCP per island.** Loss-minimizing bus selection inside the assigned
   island using the Jabr second-order-cone (SOC) branch-flow relaxation, with slack, tie, and generator
   buses excluded from candidacy.
3. **Stage 3 — AC validation (pandapower Newton-Raphson).** No optimization output is accepted without
   full AC power-flow verification. Feasibility is defined operationally: converged **and** all bus
   voltages within 0.95–1.05 pu **and** all line/transformer loadings ≤ 100%.

Site demand comes from **NREL county-level data-center capacity data**: 13 candidate sites across
Virginia counties and cities totaling 11,559.4 MW.

## Computational Framework

Python with **pandapower** (AC power flow, N-1, validation) and **SCIP via PySCIPOpt** (assignment
MILP and MISOCP subproblems). Gurobi was evaluated early in the project but was not available for
the final work — the entire final pipeline runs on the open-source stack, which also keeps every
result reproducible.

## Validation and Robustness

- **Surrogate accuracy:** SOC-predicted losses vs true AC losses on 64 AC-benchmarked candidates —
  Spearman ρ = 1.0000, Pearson r = 1.000000, max relative error 0.068%, 100% feasibility-verdict
  agreement. The AC power flow remains the final acceptance check.
- **Candidate screening:** 68 candidate buses evaluated with `pp.runpp()` across the five largest
  sites; 64 feasible, 4 genuine infeasibilities.
- **N-1 security (relevance-filtered set):** 225 contingencies (220 branches + 5 largest generators)
  — all converge, zero new thermal overloads, zero new voltage-band violations versus the baseline
  (the baseline itself carries 77 pre-existing voltage-band violations, so all claims use new-violation
  counts). Worst post-contingency loading: 99.35%.
- **Power-factor sensitivity:** placement verdicts unchanged at power factors 1.00, 0.98, and 0.95 for
  all 13 sites.

## Final Result

![Final source-constrained placement: seven accepted Virginia data-center sites totaling 1,258.8 MW with selected island and bus per site](/img/research/final-placement.png)

Under the source-constrained scenario (S2: no additional external import permitted, redispatch limited
to pro-rata headroom of the existing fleet), the final placement serves **1,258.8 MW of the 11,559.4 MW
requested** — 7 of 13 sites accepted, 6 rejected with GENERATION_LIMIT attribution. The full-network AC
check confirms **zero new violations versus baseline**, with 5.47 MW incremental system losses. The
full 11.56 GW request is rejected, not deferred: it would require ~7.07 GW of additional import even at
maximum fleet redispatch. An earlier unlimited-slack reference scenario (13/13 sites AC-feasible,
47.5 MW incremental losses) is retained only as a reference case — it is not the decision basis.

![Hierarchical assignment mapping each accepted site to its feasible electrical island and candidate bus](/img/research/island-assignment.png)

![SOC-predicted losses versus true AC power-flow losses across 64 benchmarked candidates, Spearman rho = 1.0000](/img/research/soc-vs-ac.png)

![Post-contingency maximum branch loading across 225 N-1 contingencies, worst case 99.35 percent](/img/research/n1-contingencies.png)

## Scope and Honest Limitations

The network contains **no geographic coordinates** (`bus_geodata` absent; bus/line geo fields empty), so
all figures are electrical/topological — no map views are implied. The study is a single snapshot with
a constant-power load model: no time series, unit commitment, reserves, dynamic line ratings, or
protection coordination. The headroom proxy is a ranking heuristic (overestimates true deliverable
capacity at ~10% of tested buses), which is precisely why Stage 3 AC validation is mandatory. The
SOC relaxation is empirically tight but not formally proven exact. This is a delivery-network
feasibility study — not a generation-adequacy or complete-N-1 study.

## Engineering Significance

This project demonstrates the full arc of modern grid-planning work: translating a real allocation
problem into a mixed-integer nonlinear formulation, exploiting network structure to make it tractable,
solving it with open-source optimization (SCIP), and refusing to trust any result until it survives
full AC power-flow and contingency validation — with every headline number traceable to an executed
artifact.
