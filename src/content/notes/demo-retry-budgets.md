---
title: "A retry needs a budget, not just a loop"
description: "Design preview: a small checklist for deciding when to retry, when to stop, and what the caller needs to know."
date: 2026-10-14
tags: [backend, reliability]
draft: false
demo: true
---

A retry is easy to add and surprisingly easy to misunderstand. The useful question is not “how many times should I try?” It is “what can another attempt change?”

This sample note explores that question. It is general engineering guidance, not a description of a production incident or a measured result.

## Start with the operation

A read request and a payment request do not have the same failure semantics. Repeating a read may be harmless. Repeating a write may create a second effect unless the receiving system handles duplicate requests explicitly.

Before choosing a retry policy, write down:

- Whether the operation can safely be repeated.
- Which failures might be temporary.
- Whether a timeout leaves the result unknown.
- What the caller should do when the outcome is uncertain.

A connection failure before sending a request is different from losing the response after a server has accepted it. The second case needs more thought than simply trying again.

## Work inside the caller’s deadline

Retries consume time. So do connection setup, the first attempt, and any backoff between attempts. A policy that ignores the overall deadline can leave a caller waiting long after another part of the system has given up.

A useful policy can make those choices visible. This Java record is an **illustrative data structure**, not a complete retry implementation:

```java
import java.time.Duration;

record RetryBudget(
    int maximumAttempts,
    Duration overallDeadline,
    Duration maximumDelay
) {}
```

The implementation still needs to account for elapsed time, distinguish retryable failures, and stop when cancelled. A maximum attempt count alone does not do that work.

> A retry should fit inside the request’s time budget, not quietly create a new one.

## Make stopping a normal outcome

| Question | Decision to make |
| --- | --- |
| Is the failure temporary? | Which errors justify another attempt |
| Can the operation be repeated? | Whether duplicate effects are possible |
| Is there time left? | Whether another attempt fits the deadline |
| Has the caller cancelled? | When to stop doing work |

Backoff and jitter can reduce synchronized retry bursts, but they do not make an unsafe operation safe. They also do not create capacity in an overloaded dependency.

## Leave something useful to inspect

A retry policy is easier to understand when attempts, final outcomes, and elapsed time are observable. Keep the distinction between an operation that eventually succeeded and one that succeeded on the first try.

That does not mean logging every request body. A small set of relevant counters and timings is often a better starting point, with sensitive data kept out of logs.

The practical takeaway: explain the operation, the deadline, and the stopping condition before writing the loop.
