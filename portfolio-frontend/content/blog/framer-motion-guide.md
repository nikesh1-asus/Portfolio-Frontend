---
title: "Enhancing UX with Subtle Framer Motion Animations"
date: "2026-05-08"
excerpt: "Learn how to write elegant, performant micro-animations using framer-motion without overloading page load speed or causing rendering jank."
tags: ["Framer Motion", "React", "UX"]
---

Animations should feel responsive and alive, encouraging user interaction without distracting from content readability. 

In this article, we outline best practices for animations:
- Keep durations short (between 0.2s and 0.5s)
- Use standard spring physics for elements like buttons, panels, or navigation components
- Leverage the `usePrefersReducedMotion` hook to check system accessibility profiles and disable complex translations when needed.
