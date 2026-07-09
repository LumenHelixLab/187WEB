# 187FREE — Gotcha Ledger

Common free-tier traps to surface in every 187FREE output. When reviewing a tool, check each category and note the specific risk in the recommendation.

## Usage limits

- **Request/operation caps** — e.g., 100 emails/day, 1,000 API calls/month.
- **Compute limits** — CPU time, memory, build minutes, function duration.
- **Storage limits** — database size, file storage, artifact retention.
- **User/MAU caps** — auth providers often cap monthly active users.
- **Concurrent connections** — database pools, websocket sessions.

**Mitigation:** Size the MVP against the limit; set up alerts before thresholds.

## Credit-card requirements

- Some "free" tiers require a card on file for verification.
- Accidental overages can trigger charges.
- Trial-to-paid auto-conversion after expiration.

**Mitigation:** Prefer card-free tiers for prototypes; set spending caps where available.

## Data egress fees

- AWS/GCP/Azure charge for outbound data transfer.
- Some CDNs bill for cache misses.
- Database read replicas can add egress.

**Mitigation:** Use Cloudflare R2, Bunny CDN, or providers with $0 egress for static assets.

## Sleep / idle policies

- Free databases may pause after inactivity (Supabase, Render, Railway).
- First request after wake-up is slow or times out.
- Cron jobs may not keep all services warm.

**Mitigation:** Schedule a ping every 5–10 minutes if uptime matters; budget for a paid tier at launch.

## Telemetry and tracking

- Free tiers often monetize via telemetry, analytics, or ad targeting.
- Hidden third-party SDKs in client bundles.
- Open-source projects may phone home for usage stats.

**Mitigation:** Prefer local-first/self-hosted tools; audit `package.json` and network requests; disclose tracking to users.

## Feature gating

- Essential features (custom domains, SSO, backups, webhooks) locked behind paid plans.
- Free tier may be read-only or watermarked.
- API access restricted to paid plans.

**Mitigation:** Map required features to tier tables before committing.

## Support limits

- Community-only support on free tiers.
- No SLA or guaranteed response time.
- Documentation may be incomplete for edge cases.

**Mitigation:** For client or civic projects, document the support gap and escalation path.

## Sudden price changes

- Providers have eliminated or reduced free tiers with short notice.
- Per-seat pricing changes can outpace growth.
- Open-source relicensing can block commercial use.

**Mitigation:** Maintain an exit strategy; export data regularly; pin terms in client contracts.

## Vendor lock-in

- Proprietary data formats, custom auth, or edge-function runtimes.
- Hard to migrate without rewriting integrations.
- Domain/DNS managed inside the platform.

**Mitigation:** Use open standards, own the domain, keep backups in portable formats.

## Regulatory / compliance gaps

- Free tiers rarely offer GDPR DPA, HIPAA BAA, or SOC-2 reports.
- Data residency controls often absent.
- Audit logs may be paid-only.

**Mitigation:** Route regulated workloads to `187repo` + `187craft` with explicit compliance review.
