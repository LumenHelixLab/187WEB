"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { Reveal } from "@/components/Reveal";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import {
  InfinityMark,
  GRAD_ACCESS,
  GRAD_INCLUDE,
  GRAD_PRIDE_FULL,
  PrideCta,
  PrideUnityRail,
} from "@/components/access/PrideSpectrum";

const TIERS = [
  {
    id: "T1",
    name: "Nano",
    who: "1k–10k engaged niche (a11y, ND, LGBTQ+, indie hackers)",
    deliverables: "1 short + 1 story/static",
    window: "14 days",
    comp: "Product access + affiliate",
  },
  {
    id: "T2",
    name: "Mid",
    who: "10k–75k builders / design / a11y educators",
    deliverables: "1 long-form + 2 shorts + story pack",
    window: "21 days",
    comp: "Affiliate + optional flat",
  },
  {
    id: "T3",
    name: "Hero",
    who: "75k+ trusted voices in access, design systems, AI tools",
    deliverables: "1 keynote-style video + thread + newsletter",
    window: "30 days",
    comp: "Custom partnership",
  },
] as const;

const TALKING = [
  "Access is the product — 187ACCESS+ & 187INCLUDE+ are premier skills, not a pre-ship scramble.",
  "/187++ runs the full access + inclusion sweep in one command.",
  "ADHD / neurodivergent UX and LGBTQ+ identity safety are engineered skill paths.",
  "One command surface: /187 create · craft · seo — alone or chained.",
  "Local-first friendly with open suite on GitHub (LumenHelix Lab).",
  "Pride spectrum is the system map: Access+ red→green, Include+ green→purple, united by green.",
] as const;

const ASSETS = [
  {
    id: "IG-SQ-01",
    size: "1080×1080",
    concept: "Shield on abyssal black + pride unity rail",
    copy: "Access+ · Include+ · /187++",
  },
  {
    id: "IG-ST-01",
    size: "1080×1920",
    concept: "Vertical: puzzle marks + spectrum halves",
    copy: "Disability · ADHD UX · LGBTQ+ safety — as skills",
  },
  {
    id: "TW-CARD-01",
    size: "1200×675",
    concept: "Split red→green | green→purple",
    copy: "Two halves. Green unites. Full sweep.",
  },
  {
    id: "YT-THUMB-01",
    size: "1280×720",
    concept: "Shield + high-contrast title",
    copy: "I tried a suite where a11y isn’t a checkbox",
  },
  {
    id: "LI-BANNER-01",
    size: "1200×627",
    concept: "Wordmark + one professional line",
    copy: "First-class Access+ & Include+ for builders",
  },
] as const;

const CAPTIONS: { id: string; platform: string; body: string }[] = [
  {
    id: "short",
    platform: "Short-form (Reels / TikTok / Shorts)",
    body: `Most tools treat accessibility like a sticker you slap on at the end.
187WEB treats Access+ and Include+ as skills—disability access, ADHD-friendly UX, LGBTQ+ identity safety—wired into the same chain as craft and publish.
One command for the full sweep: /187++.
Link in bio — open source suite from LumenHelix Lab.`,
  },
  {
    id: "ig",
    platform: "Instagram feed",
    body: `Access isn’t a compliance afterthought here—it’s a first-class skill system.
187ACCESS+ (red → green) · 187INCLUDE+ (green → purple) · united by green.
Build landings with /187create, systemize with craft, gate with /187++.

Suite: [your tracked link]
#Accessibility #InclusiveDesign #ADHD #LGBTQ #BuildInPublic #187WEB`,
  },
  {
    id: "x",
    platform: "X / Twitter thread",
    body: `1/ Hot take: if a11y only shows up in your launch checklist, you don’t have an access system—you have anxiety.
2/ 187WEB ships Access+ and Include+ as premier skills (disability, ND/ADHD UX, identity safety)—not decorative pride month art.
3/ Operators Explore /187++ for the full sweep, then hand winners into craft/test/publish.
4/ Try it: [your tracked link] · GitHub: LumenHelixLab/187WEB`,
  },
  {
    id: "li",
    platform: "LinkedIn",
    body: `For product and design leaders: accessibility and inclusion fail when they’re bolted on.
LumenHelix’s 187WEB suite models a different pattern—Access+ and Include+ as first-class, command-driven skills in the same pipeline as creation and publish.
Worth a look if you ship public surfaces: [your tracked link]`,
  },
  {
    id: "news",
    platform: "Newsletter (≈60 words)",
    body: `Tool of the week: 187WEB — an AI web suite that treats disability access and LGBTQ+ inclusion and Access+ neurodivergent usability as skills, not stickers. Explore /187++ for a combined Access+ and Include+ sweep, or start with growth landings via /187create. Open showcase: [your tracked link].`,
  },
];

const UTM_EXAMPLE =
  "https://lumenhelixlab.github.io/187WEB/?utm_source=creator-jane-a11y&utm_medium=influencer&utm_campaign=187web-ik-2026q3&utm_content=t2-ig-sq-01&utm_term=access-plus";

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(() => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }, [text]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A0C14] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39FF14]">{label}</p>
        <button
          type="button"
          onClick={onCopy}
          className="min-h-[44px] rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-[#39FF14]/40 hover:text-[#39FF14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/70">{text}</pre>
    </div>
  );
}

/**
 * /187create growth surface: public influencer kit page.
 * Conversion narrative: hook → tiers → copy → assets → tracking → CTA.
 */
export function InfluencerKitPageClient() {
  return (
    <div className="px-6 pb-28 pt-28">
      <div className="container-x">
        {/* Hero */}
        <section className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#39FF14]">
            KALI · /187create · Influencer kit v0.1
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe */}
          <img
            src={brandAssets.heroBadge}
            alt="187WEB shield badge"
            width={320}
            height={320}
            className="mx-auto mt-8 h-auto w-full max-w-[11rem] object-contain drop-shadow-[0_0_40px_rgba(57,255,20,0.35)] sm:max-w-[13rem]"
          />
          <KineticHeadline
            text="Creator kit."
            accent="Access is the product."
            as="h1"
            className="mt-6 font-display text-[clamp(2.4rem,1.2rem+4.5vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <PrideUnityRail className="mx-auto mt-6 max-w-sm" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            A ready-to-ship influencer package for{" "}
            <strong className="text-white">187WEB</strong>: talking points, captions, asset briefs, usage rights, and
            UTM tracking — built so Access+ and Include+ stay the story, not a footnote.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrideCta href="/187plusplus" spectrum="full">
              Explore /187++
            </PrideCta>
            <PrideCta href="/" spectrum="access" variant="outline">
              Live suite
            </PrideCta>
            <PrideCta href="/187create" spectrum="include" variant="outline">
              187CREATE skill
            </PrideCta>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <InfinityMark spectrum="access" className="h-8 w-8" decorative />
            <InfinityMark spectrum="include" className="h-8 w-8" decorative />
            <InfinityMark spectrum="full" className="h-8 w-8" decorative />
          </div>
        </section>

        {/* Hook strip */}
        <Reveal delay={60}>
          <div
            className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]"
          >
            <div className="h-1.5 w-full" style={{ backgroundImage: GRAD_PRIDE_FULL }} aria-hidden />
            <div className="grid gap-0 sm:grid-cols-3">
              {[
                { t: "Hook", d: "Checkbox a11y is anxiety. Skills are systems." },
                { t: "Proof", d: "Access+ · Include+ · /187++ in the same pipeline as craft & publish." },
                { t: "CTA", d: "Open the suite. Run the full sweep. Share with credit." },
              ].map((item) => (
                <div key={item.t} className="border-t border-white/10 p-5 sm:border-l sm:border-t-0 sm:first:border-l-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#39FF14]">{item.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tiers */}
        <section className="mx-auto mt-20 max-w-5xl" aria-labelledby="tiers-heading">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">01 · Creator tiers</p>
          <h2 id="tiers-heading" className="mt-3 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Pick a tier. Ship the story.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 70}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14]">
                  <div
                    className="h-1 w-full"
                    style={{
                      backgroundImage: i === 0 ? GRAD_ACCESS : i === 1 ? GRAD_PRIDE_FULL : GRAD_INCLUDE,
                    }}
                    aria-hidden
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {tier.id} · {tier.name}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">{tier.name} creators</h3>
                    <p className="mt-2 text-sm text-white/55">{tier.who}</p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      <li>
                        <span className="text-white/40">Deliverables · </span>
                        {tier.deliverables}
                      </li>
                      <li>
                        <span className="text-white/40">Window · </span>
                        {tier.window}
                      </li>
                      <li>
                        <span className="text-white/40">Comp · </span>
                        {tier.comp}
                      </li>
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Talking points */}
        <section className="mx-auto mt-20 max-w-3xl" aria-labelledby="talk-heading">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            02 · Talking points
          </p>
          <h2 id="talk-heading" className="mt-3 text-center font-display text-3xl font-bold text-white">
            Say this (or paraphrase)
          </h2>
          <ol className="mt-8 space-y-3">
            {TALKING.map((line, i) => (
              <Reveal key={line} delay={i * 40}>
                <li className="flex gap-3 rounded-2xl border border-white/10 bg-[#0A0C14] px-4 py-3 text-left text-sm leading-relaxed text-white/75">
                  <span className="font-mono text-[#39FF14]">{String(i + 1).padStart(2, "0")}</span>
                  <span>{line}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-4 text-sm text-white/70">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#39FF14]">Do</p>
              <p className="mt-2">First-class skills · skillchains · live site + GitHub · reduced-motion honesty</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">Don’t</p>
              <p className="mt-2">Fake WCAG certification · invent metrics · dark-pattern urgency · recolor brand art</p>
            </div>
          </div>
        </section>

        {/* Asset briefs */}
        <section className="mx-auto mt-20 max-w-5xl" aria-labelledby="assets-heading">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            03 · Asset briefs · /187create
          </p>
          <h2 id="assets-heading" className="mt-3 text-center font-display text-3xl font-bold text-white">
            Graphics to produce
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/55">
            Use official shield / wordmark only. Alt text required on every export.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ASSETS.map((a, i) => (
              <Reveal key={a.id} delay={i * 50}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5">
                  <div className="flex items-start justify-between gap-2">
                    <code className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-[#39FF14]">{a.id}</code>
                    <span className="font-mono text-[10px] text-white/40">{a.size}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-white">{a.concept}</p>
                  <p className="mt-2 flex-1 text-sm text-white/55">“{a.copy}”</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-white/10">
            <div className="flex items-center justify-center gap-6 bg-[#050608] px-6 py-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brandAssets.heroBadge} alt="" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brandAssets.wordmark} alt="187WEB" className="h-10 w-auto max-w-[10rem] object-contain opacity-90" />
            </div>
            <p className="border-t border-white/10 bg-[#0A0C14] px-4 py-3 text-center text-xs text-white/45">
              Reference marks for creators — do not recolor. Campaign use per kit rights.
            </p>
          </div>
        </section>

        {/* Captions */}
        <section className="mx-auto mt-20 max-w-3xl" aria-labelledby="copy-heading">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">04 · Captions</p>
          <h2 id="copy-heading" className="mt-3 text-center font-display text-3xl font-bold text-white">
            Copy packs — click to copy
          </h2>
          <div className="mt-10 space-y-4">
            {CAPTIONS.map((c, i) => (
              <Reveal key={c.id} delay={i * 40}>
                <CopyBlock label={c.platform} text={c.body} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            Compensated posts: use platform paid tags · <code className="text-white/55">#ad</code> · “Partnership with
            LumenHelix Lab”
          </p>
        </section>

        {/* UTM */}
        <section className="mx-auto mt-20 max-w-3xl" aria-labelledby="utm-heading">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
            05 · Tracking
          </p>
          <h2 id="utm-heading" className="mt-3 text-center font-display text-3xl font-bold text-white">
            UTM scheme
          </h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14]">
            <div className="h-1 w-full" style={{ backgroundImage: GRAD_ACCESS }} aria-hidden />
            <div className="space-y-4 p-6">
              <p className="text-sm text-white/60">
                <code className="text-[#39FF14]">utm_source</code> = creator ·{" "}
                <code className="text-[#39FF14]">utm_medium</code> = influencer ·{" "}
                <code className="text-[#39FF14]">utm_campaign</code> = 187web-ik-2026q3 ·{" "}
                <code className="text-[#39FF14]">utm_content</code> = tier-platform-asset
              </p>
              <CopyBlock label="Example tracked home URL" text={UTM_EXAMPLE} />
              <div className="grid gap-2 font-mono text-xs text-white/50 sm:grid-cols-2">
                <p>
                  Home · <span className="text-white/70">lumenhelixlab.github.io/187WEB/</span>
                </p>
                <p>
                  Sweep · <span className="text-white/70">…/187plusplus/</span>
                </p>
                <p>
                  Create · <span className="text-white/70">…/187create/</span>
                </p>
                <p>
                  GitHub · <span className="text-white/70">github.com/LumenHelixLab/187WEB</span>
                </p>
              </div>
              <p className="text-xs text-white/40">
                Primary metric: unique sessions with kit UTMs · Secondary: /187plusplus ≥15% of kit sessions
              </p>
            </div>
          </div>
        </section>

        {/* Rights + final CTA */}
        <Reveal delay={100}>
          <section className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0C14] text-center">
            <div className="h-1.5 w-full" style={{ backgroundImage: GRAD_INCLUDE }} aria-hidden />
            <div className="p-8 sm:p-12">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Usage rights snapshot</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
                Kit copy: adapt for the campaign window. Logos/shield: nonexclusive campaign use — no recolor, no
                trademark filing. Creator footage stays yours; LumenHelix may reshare with credit for 12 months. Tracked
                links required on primary CTAs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <PrideCta href="/" spectrum="full">
                  Open 187WEB
                </PrideCta>
                <PrideCta href="/187plusplus" spectrum="access">
                  Explore /187++
                </PrideCta>
                <PrideCta href="/kali" spectrum="include" variant="outline">
                  KALI agent
                </PrideCta>
              </div>
              <p className="mt-8 text-xs text-white/35">
                Full markdown kit ·{" "}
                <Link href="/187create" className="text-[#39FF14] underline-offset-2 hover:underline">
                  187CREATE
                </Link>{" "}
                · docs/growth/influencer-kit-187web.md in repo
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
