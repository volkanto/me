---
title: "A small tool can have a very clear job"
description: "Design preview: a short note on reducing friction without building a whole platform around it."
date: 2026-10-12
tags: [open-source, tools]
draft: false
demo: true
---

Not every useful idea needs an account system, a dashboard, and a roadmap stretching into next year.

This is a short sample note about scope. It does not describe a shipped feature or a particular user’s experience.

## Start with the interruption

A good starting point is a task that interrupts something else: finding a link, formatting a command, or keeping a thought before returning to work.

Describe that interruption in one sentence. Then describe the smallest useful improvement in another. Those two sentences can do more for the scope than a long feature list.

## Make the ordinary path easy

- Choose defaults that make sense for the common task.
- Keep the input small and understandable.
- Show what happened without making the user interpret a hidden state.
- Explain limitations where they affect a decision.

A command-line tool can print useful help. A web tool can preserve an unfinished input after an error. Neither needs to grow into a platform to respect the person using it.

## Know where to stop

> Small is a scope decision. Useful is the test.

There is nothing wrong with a tool doing one thing well enough that its source is easy to read and its behavior is easy to explain.

The interesting question is whether it removes the interruption it started with. Everything else is a choice, not an obligation.
