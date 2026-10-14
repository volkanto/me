---
title: "Service boundaries should explain the product"
description: "Design preview: thinking about responsibilities, data ownership, and the cost of turning an internal call into a network call."
date: 2026-10-13
tags: [architecture, apis]
draft: false
demo: true
---

A diagram with neatly separated boxes can feel like an architecture decision. It is usually the start of a conversation.

For this sample, imagine a small product with accounts, orders, and notifications. Those names help describe the product, but they do not tell us how many independently deployed services it needs.

## Name the responsibility first

A useful boundary makes a responsibility easier to explain. What does this part own? What decisions can it make? What does another part need to know about it?

Try describing the boundary without mentioning a framework or deployment tool. If the explanation needs a long list of exceptions, the responsibilities may still be tangled.

Ownership matters especially when data changes. Two components that both believe they own the same rule can drift apart even if their APIs look tidy.

## A module is a real boundary

A boundary can begin inside one application. Separate modules, explicit interfaces, and a clear dependency direction can make responsibilities visible without adding a network hop.

That gives an early product fewer moving parts to operate. It also leaves room to learn which pieces actually change together.

> Independent deployment is a capability to justify, not a reward for drawing another box.

There are good reasons to split a service: different scaling needs, distinct ownership, or a meaningful isolation requirement. The decision should name the reason and acknowledge its cost.

## Write down the extra work

| Internal call | Network call adds |
| --- | --- |
| An interface and a return value | Transport errors and timeouts |
| One process to debug | Correlation across processes |
| Shared deployment timing | Version compatibility between deployments |
| Local state transitions | Partial failure between systems |

The table is intentionally simplified. It is a checklist for discussion, not a claim that one architecture always wins.

## Keep the next change in view

A maintainable API does not expose every detail of the implementation. It gives callers a small contract they can understand, including failure behavior.

Before creating a new service, ask what would make the next product change easier. Sometimes the answer is another deployable unit. Sometimes it is a better interface inside the application you already have.
