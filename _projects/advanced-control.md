---
layout: project
title: Motor Speed Controller with Integral Action
description: Real-time motor-speed control project using system identification, state-space feedback, and integral action with hardware validation.
category: Controls
group: controls
date_label: 2025–2026
order: 5
image: "/img/projects/motor-speed-control.png"
pdf: "/projects/Adv_Control_Project_Report%20%281%29.pdf"
tools:
  - MATLAB
  - Simulink Connected I/O
  - Arduino
  - System Identification
highlights:
  - Identified a first-order motor model from experimental input-output data using MATLAB System Identification Toolbox.
  - Designed a state-feedback controller with integral action to improve tracking and eliminate steady-state error.
  - Implemented the controller in real time using Arduino, encoder feedback, H-bridge actuation, and Simulink Connected I/O.
  - Evaluated closed-loop behavior experimentally and discussed actuator saturation and anti-windup considerations.
result: "Achieved stable closed-loop motor-speed tracking through identified modeling, state feedback, and integral action."
---

This project focused on real-time speed control of a DC motor using experimental modeling and state-space controller design. A first-order model was identified from measured data, then used to build a feedback controller with integral action.

The controller was implemented through hardware interfacing and validated experimentally. The work emphasized practical control implementation, real-time testing, and interpretation of closed-loop performance.
