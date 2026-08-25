---
layout: project
title: "Single-Phase Inverter Modulation & Harmonic Analysis"
description: "MATLAB/Simulink analysis of a single-phase full-bridge inverter: square-wave and quasi-square-wave conduction, selective harmonic elimination solved by Newton-Raphson, bipolar and unipolar PWM design at minimum switching frequency, and multilevel extension — evaluated by FFT harmonic analysis and THD."
category: Power Electronics
group: power-elec
date_label: August 2026
order: 3
image: "/img/projects/power-electronics-inverter.png"
pdf: "/projects/power_electronics_project.pdf"
tools:
  - MATLAB
  - Simulink
  - FFT Harmonic Analysis
  - Newton-Raphson (SHE angle solver)
metrics:
  - value: "20 V / 50 Hz"
    label: "DC input / AC output"
  - value: "34 Ω + 33 mH"
    label: "R–L load"
  - value: "mf = 200"
    label: "PWM frequency modulation ratio (10 kHz carrier)"
  - value: "1.27%"
    label: "Lowest current THD achieved (bipolar PWM)"
result: "Designed PWM to the 16 V fundamental / THD ≤ 10% specification at minimum switching frequency — mf = 11 (550 Hz carrier) for unipolar vs mf = 38 (1.9 kHz) for bipolar PWM; lowest measured current THD: 1.27%."
highlights:
  - "Implemented and compared five modulation strategies for a single-phase full-bridge inverter (20 V DC, R–L load of 34 Ω and 33 mH, 50 Hz output): square-wave, quasi-square-wave with third-harmonic elimination, selective harmonic elimination (SHE), bipolar PWM, and unipolar PWM."
  - "Solved the SHE nonlinear equations for three switching angles per quarter cycle with a Newton-Raphson solver in MATLAB — eliminating the 3rd and 5th harmonics while holding the fundamental: α1 = 31.42°, α2 = 54.57°, α3 = 69.23°, converged in 5 iterations."
  - "Designed bipolar and unipolar PWM at mf = 200 (50 Hz reference vs 10 kHz triangular carrier) and analyzed gate signals, pole and line voltages, input/output currents, and FFT spectra for every scheme."
  - "Determined the minimum frequency-modulation ratio meeting V1 = 16 V amplitude and current THD ≤ 10%: mf = 11 (550 Hz carrier, THD 9.33%) for unipolar and mf = 38 (1.9 kHz carrier, THD 9.86%) for bipolar PWM — trading switching loss against waveform quality."
  - "Extended the study to a multilevel inverter configuration and compiled a full comparison table: fundamental voltage, current THD, and voltage THD across all eight implemented configurations."
---

## Engineering Problem

Inverter output quality is set by the switching strategy. Each modulation law trades fundamental
utilization, harmonic distortion, and switching losses differently — and the choice must satisfy
explicit power-quality constraints (a target fundamental voltage and a THD ceiling), not just
qualitative preferences.

## System Under Study

A single-phase full-bridge inverter supplied at **Vdc = 20 V**, feeding an **R–L load of 34 Ω and
33 mH** at a **50 Hz** output frequency. For every modulation technique, gate signals, load voltage,
load current, and supply current waveforms were captured and analyzed by FFT.

## Modulation Strategies

- **Square-wave conduction** — baseline full-conduction operation; highest fundamental (25.35 V) but
  29.0% current THD dominated by low-order harmonics.
- **Quasi-square-wave (third-harmonic elimination)** — pulse-width gating that removes the 3rd
  harmonic; current THD falls to 19.8%.
- **Selective harmonic elimination (SHE)** — three switching angles per quarter cycle chosen so the
  3rd and 5th harmonics cancel while the fundamental hits the target. The nonlinear trigonometric
  system is solved numerically with Newton-Raphson in MATLAB.
- **Bipolar PWM** — 50 Hz sine reference compared against a 10 kHz triangular carrier
  (mf = 200); output switches between +Vdc and −Vdc at carrier rate. Current THD 1.27%, the lowest
  of all schemes.
- **Unipolar PWM** — each leg modulated independently against inverted references; the line voltage
  takes three levels (+Vdc, 0, −Vdc) with effective switching at twice the carrier frequency.
  Current THD 3.22% at mf = 200.
- **Multilevel inverter** — extended configuration demonstrating improved harmonic performance from
  increased voltage levels.

## Minimum Switching-Frequency Design

Beyond fixed-mf simulation, the study solves the inverse design problem: **find the minimum mf such
that the fundamental reaches 16 V amplitude while current THD stays ≤ 10%**. Harmonic sideband
models of each scheme are swept across mf = 1…5000 with the load impedance evaluated per harmonic
order. Results: **unipolar PWM needs only mf = 11** (550 Hz carrier, 9.33% THD) while **bipolar PWM
requires mf = 38** (1.9 kHz carrier, 9.86% THD) — quantifying unipolar's harmonic advantage in
switching-loss terms.

## Comparison of Implemented Configurations

| Technique | V1 (V) | THDi (%) | THDv (%) |
|---|---:|---:|---:|
| Square wave | 25.35 | 29.02 | 48.43 |
| Quasi-square wave | 24.60 | 19.77 | 31.92 |
| Selective harmonic elimination | 16.06 | 25.86 | 72.84 |
| Multilevel inverter | 16.03 | 25.76 | 72.27 |
| Bipolar PWM (mf = 200) | 19.98 | 1.27 | 100.18 |
| Unipolar PWM (mf = 200) | 19.34 | 3.22 | 57.13 |
| Bipolar PWM (design, mf = 38) | 16.09 | 9.76 | 144.53 |
| Unipolar PWM (design, mf = 11) | 15.77 | 9.88 | 77.58 |

The table exposes the engineering trade-off directly: high-carrier PWM minimizes current THD but
pushes harmonic energy into the voltage spectrum at sideband frequencies, while low-carrier designs
meet the same current-THD ceiling with an order of magnitude less switching.

## Engineering Significance

Demonstrates power-electronics fundamentals end to end: inverter topologies, modulation theory,
numerical solution of harmonic-elimination equations, PWM design against explicit power-quality
constraints, and FFT-based harmonic analysis — the converter knowledge that underpins inverter-based
renewable generation and data-center power infrastructure.
