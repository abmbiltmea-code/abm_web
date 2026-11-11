import Link from "next/link";
import { connection } from "next/server";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  FileText,
  FolderKanban,
  GalleryVerticalIcon,
  Inbox,
  Layers,
  Mail,
  Newspaper,
  Plus,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Projects from "@/app/models/Projects";
import News from "@/app/models/News";
import Gallery from "@/app/models/Gallery";
import Sector from "@/app/models/Sector";
import Careers from "@/app/models/Careers";
import Divisions from "@/app/models/Divisions";
import HomeEnquiry from "@/app/models/HomeEnquiry";
import ContactEnquiry from "@/app/models/ContactEnquiry";
import CareerEnquiry from "@/app/models/CareerEnquiry";

const ADMIN = "/4bm-4dm1n";
const DAY_MS = 24 * 60 * 60 * 1000;
const TIME_ZONE = "Asia/Dubai";

type Hideable = { isHidden?: boolean };

type EnquiryKind = "home" | "contact" | "career";

interface RecentEnquiry {
  id: string;
  kind: EnquiryKind;
  name: string;
  email: string;
  detail: string;
  createdAt: Date;
}

const ENQUIRY_META: Record<
  EnquiryKind,
  { label: string; href: string; tone: string; iconTone: string; bar: string }
> = {
  home: {
    label: "Home",
    href: `${ADMIN}/forms/home-enquiry`,
    tone: "bg-sky-50 text-sky-700 border-sky-200",
    iconTone: "bg-sky-50 text-sky-600 ring-sky-100",
    bar: "from-sky-400 to-sky-500",
  },
  contact: {
    label: "Contact",
    href: `${ADMIN}/forms/contact-enquiry`,
    tone: "bg-violet-50 text-violet-700 border-violet-200",
    iconTone: "bg-violet-50 text-violet-600 ring-violet-100",
    bar: "from-violet-400 to-violet-500",
  },
  career: {
    label: "Career",
    href: `${ADMIN}/forms/career-enquiry`,
    tone: "bg-amber-50 text-amber-700 border-amber-200",
    iconTone: "bg-amber-50 text-amber-600 ring-amber-100",
    bar: "from-amber-400 to-amber-500",
  },
};

const CHART_DAYS = 14;

const dayKey = (d: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: TIME_ZONE,
  }).format(d);

const formatShortDay = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: TIME_ZONE,
  }).format(d);

const greetingFor = (d: Date) => {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: TIME_ZONE,
    }).format(d),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const countVisible = (list: Hideable[] = []) => ({
  total: list.length,
  hidden: list.filter((i) => i?.isHidden).length,
});

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(d);

const formatGreetingDate = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(d);

async function getDashboardData() {
  await connectDB();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * DAY_MS);
  const recentSelect = "firstName secondName lastName email createdAt";
  // One extra day of margin so the Dubai-time day boundaries are fully covered.
  const chartStart = new Date(now.getTime() - (CHART_DAYS + 1) * DAY_MS);
  const dailyPipeline = [
    { $match: { createdAt: { $gte: chartStart } } },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
            timezone: TIME_ZONE,
          },
        },
        n: { $sum: 1 },
      },
    },
  ];

  const [
    projectsDoc,
    newsDoc,
    galleryDoc,
    sectorDoc,
    careersDoc,
    divisionsTotal,
    homeTotal,
    homeWeek,
    contactTotal,
    contactWeek,
    careerTotal,
    careerWeek,
    recentHome,
    recentContact,
    recentCareer,
    dailyHome,
    dailyContact,
    dailyCareer,
  ] = await Promise.all([
    Projects.findOne({}).select("items.isHidden locations._id statuses._id").lean(),
    News.findOne({}).select("items.isHidden categories._id").lean(),
    Gallery.findOne({}).select("items.isHidden categories._id").lean(),
    Sector.findOne({}).select("secondSection.sectors.isHidden").lean(),
    Careers.findOne({}).select("thirdSection.jobs.isHidden").lean(),
    Divisions.countDocuments({}),
    HomeEnquiry.countDocuments({}),
    HomeEnquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
    ContactEnquiry.countDocuments({}),
    ContactEnquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
    CareerEnquiry.countDocuments({}),
    CareerEnquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
    HomeEnquiry.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select(`${recentSelect} subject`)
      .lean(),
    ContactEnquiry.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select(recentSelect)
      .lean(),
    CareerEnquiry.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select(`${recentSelect} appliedFor`)
      .lean(),
    HomeEnquiry.aggregate(dailyPipeline),
    ContactEnquiry.aggregate(dailyPipeline),
    CareerEnquiry.aggregate(dailyPipeline),
  ]);

  const dailyCounts = new Map<string, number>();
  for (const row of [...dailyHome, ...dailyContact, ...dailyCareer] as {
    _id: string;
    n: number;
  }[]) {
    dailyCounts.set(row._id, (dailyCounts.get(row._id) ?? 0) + row.n);
  }
  const daily = Array.from({ length: CHART_DAYS }, (_, i) => {
    const date = new Date(now.getTime() - (CHART_DAYS - 1 - i) * DAY_MS);
    return { date, count: dailyCounts.get(dayKey(date)) ?? 0 };
  });

  // Lean documents are untyped from these models; read defensively.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const p = projectsDoc as any;
  const n = newsDoc as any;
  const g = galleryDoc as any;
  const s = sectorDoc as any;
  const c = careersDoc as any;

  const toRecent = (kind: EnquiryKind, docs: any[]): RecentEnquiry[] =>
    docs.map((d) => ({
      id: String(d._id),
      kind,
      name:
        [d.firstName, d.secondName ?? d.lastName].filter(Boolean).join(" ") ||
        "Unknown",
      email: d.email ?? "",
      detail:
        kind === "home"
          ? d.subject ?? ""
          : kind === "career"
            ? d.appliedFor
              ? `Applied for ${d.appliedFor}`
              : ""
            : "",
      createdAt: new Date(d.createdAt),
    }));
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const recent = [
    ...toRecent("home", recentHome),
    ...toRecent("contact", recentContact),
    ...toRecent("career", recentCareer),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  return {
    now,
    content: {
      projects: {
        ...countVisible(p?.items),
        meta: `${p?.locations?.length ?? 0} locations · ${p?.statuses?.length ?? 0} statuses`,
      },
      news: {
        ...countVisible(n?.items),
        meta: `${n?.categories?.length ?? 0} categories`,
      },
      gallery: {
        ...countVisible(g?.items),
        meta: `${g?.categories?.length ?? 0} categories`,
      },
      sectors: countVisible(s?.secondSection?.sectors),
      jobs: countVisible(c?.thirdSection?.jobs),
      divisions: divisionsTotal,
    },
    enquiries: {
      home: { total: homeTotal, week: homeWeek },
      contact: { total: contactTotal, week: contactWeek },
      career: { total: careerTotal, week: careerWeek },
    },
    recent,
    daily,
  };
}

export default async function AdminHome() {
  await connection();
  const data = await getDashboardData();
  const { content, enquiries, recent, now, daily } = data;

  const totalWeek =
    enquiries.home.week + enquiries.contact.week + enquiries.career.week;
  const totalEnquiries =
    enquiries.home.total + enquiries.contact.total + enquiries.career.total;
  const chartTotal = daily.reduce((sum, d) => sum + d.count, 0);
  const chartMax = Math.max(1, ...daily.map((d) => d.count));

  const contentCards = [
    {
      label: "Projects",
      href: `${ADMIN}/projects`,
      icon: FolderKanban,
      total: content.projects.total,
      hidden: content.projects.hidden,
      meta: content.projects.meta,
    },
    {
      label: "News",
      href: `${ADMIN}/news`,
      icon: Newspaper,
      total: content.news.total,
      hidden: content.news.hidden,
      meta: content.news.meta,
    },
    {
      label: "Gallery",
      href: `${ADMIN}/gallery`,
      icon: GalleryVerticalIcon,
      total: content.gallery.total,
      hidden: content.gallery.hidden,
      meta: content.gallery.meta,
    },
    {
      label: "Sectors",
      href: `${ADMIN}/sectors`,
      icon: Building2,
      total: content.sectors.total,
      hidden: content.sectors.hidden,
    },
    {
      label: "Open Jobs",
      href: `${ADMIN}/careers`,
      icon: BriefcaseBusiness,
      total: content.jobs.total,
      hidden: content.jobs.hidden,
    },
    {
      label: "Divisions",
      href: `${ADMIN}/divisions`,
      icon: Layers,
      total: content.divisions,
    },
  ];

  const enquiryCards = (
    [
      { kind: "home", icon: Inbox },
      { kind: "contact", icon: Mail },
      { kind: "career", icon: FileText },
    ] as const
  ).map(({ kind, icon }) => ({
    kind,
    icon,
    ...ENQUIRY_META[kind],
    ...enquiries[kind],
  }));

  const quickActions = [
    { label: "Add Project", href: `${ADMIN}/projects/items/new`, icon: FolderKanban },
    { label: "Add News", href: `${ADMIN}/news/items/new`, icon: Newspaper },
    { label: "Add Job", href: `${ADMIN}/careers/jobs/new`, icon: BriefcaseBusiness },
    { label: "Add Sector", href: `${ADMIN}/sectors/sector/new`, icon: Building2 },
    { label: "Add Division", href: `${ADMIN}/divisions/new`, icon: Layers },
  ];

  const cardBase =
    "rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]";
  const cardHover =
    "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_32px_-12px_rgba(0,0,0,0.14)]";

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1f1f1f] text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,520px)] gap-8 p-7 md:p-8">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-[12px] uppercase tracking-[0.14em] text-white/50">
                {formatGreetingDate(now)}
              </p>
              <h1 className="mt-2 text-[30px] leading-tight">
                {greetingFor(now)}
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Here&apos;s what&apos;s happening across the ABM website.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-wider text-white/50">
                  Last 7 days
                </p>
                <p className="mt-1 text-[26px] leading-none font-semibold">
                  {totalWeek}
                  <span className="ml-1.5 text-[13px] font-normal text-white/60">
                    {totalWeek === 1 ? "enquiry" : "enquiries"}
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.06] ring-1 ring-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-wider text-white/50">
                  All time
                </p>
                <p className="mt-1 text-[26px] leading-none font-semibold">
                  {totalEnquiries}
                  <span className="ml-1.5 text-[13px] font-normal text-white/60">
                    total
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 14-day enquiries chart */}
          <figure className="flex flex-col">
            <figcaption className="flex items-baseline justify-between">
              <span className="text-[13px] text-white/70">
                Enquiries · last {CHART_DAYS} days
              </span>
              <span className="text-[12px] text-white/45">
                {chartTotal} total
              </span>
            </figcaption>

            <div className="relative mt-4 h-[150px]">
              {/* recessive gridline at max */}
              <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/10" />
              <span className="absolute -top-2 right-0 -translate-y-full text-[10px] text-white/35">
                {chartMax}
              </span>
              <div className="absolute inset-x-0 bottom-0 border-t border-white/15" />

              <div
                className="relative flex h-full items-end gap-[3px]"
                role="img"
                aria-label={`Daily enquiries for the last ${CHART_DAYS} days`}
              >
                {daily.map((d, i) => {
                  const isToday = i === daily.length - 1;
                  const pct = (d.count / chartMax) * 100;
                  return (
                    <div
                      key={i}
                      className="group relative flex h-full flex-1 items-end"
                    >
                      {/* hover hit-area spans the full column */}
                      <div
                        className={`w-full rounded-t-[4px] transition-colors ${
                          d.count === 0
                            ? "h-[2px] bg-white/15"
                            : isToday
                              ? "bg-primary"
                              : "bg-primary/55 group-hover:bg-primary/80"
                        }`}
                        style={d.count === 0 ? undefined : { height: `${pct}%` }}
                      />
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[11px] text-secondary opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        <span className="font-semibold">{d.count}</span>{" "}
                        {d.count === 1 ? "enquiry" : "enquiries"} ·{" "}
                        {formatShortDay(d.date)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-white/40">
              <span>{formatShortDay(daily[0].date)}</span>
              <span>Today</span>
            </div>
          </figure>
        </div>
      </section>

      {/* Enquiries */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {enquiryCards.map((card) => {
          const Icon = card.icon;
          const share = totalEnquiries
            ? Math.round((card.total / totalEnquiries) * 100)
            : 0;
          return (
            <Link
              key={card.kind}
              href={card.href}
              className={`group relative overflow-hidden p-5 ${cardBase} ${cardHover}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ring-4 ${card.iconTone}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 text-[13px] text-gray-500">
                {card.label} Enquiries
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[32px] leading-none text-secondary font-semibold">
                  {card.total}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    card.week > 0
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  +{card.week} this week
                </span>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${card.bar}`}
                    style={{ width: `${share}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-gray-400">
                  {share}% of all enquiries
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Content overview */}
      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <h2 className="text-lg text-secondary">Website Content</h2>
          <span className="text-[12px] text-gray-400">
            Click a card to manage
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
          {contentCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className={`group flex flex-col p-4 ${cardBase} ${cardHover}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {card.hidden !== undefined && card.hidden > 0 && (
                    <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600">
                      {card.hidden} hidden
                    </span>
                  )}
                </div>
                <span className="mt-4 text-[28px] leading-none font-semibold text-secondary">
                  {card.total}
                </span>
                <span className="mt-1.5 text-[13px] text-gray-600">
                  {card.label}
                </span>
                {card.meta && (
                  <span className="mt-0.5 text-[11px] text-gray-400">
                    {card.meta}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent enquiries + quick actions */}
      <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4">
        <div className={cardBase}>
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
            <h2 className="text-lg text-secondary">Recent Enquiries</h2>
            <span className="text-[12px] text-gray-400">Latest 6</span>
          </div>
          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                <Inbox className="h-5 w-5" />
              </span>
              <p className="text-sm text-gray-400">No enquiries yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-black/[0.05] p-2">
              {recent.map((e) => {
                const meta = ENQUIRY_META[e.kind];
                const initials =
                  e.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0]?.toUpperCase())
                    .join("") || "?";
                return (
                  <li key={`${e.kind}-${e.id}`}>
                    <Link
                      href={meta.href}
                      className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${meta.iconTone}`}
                      >
                        {initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-secondary">
                          {e.name}
                        </p>
                        <p className="truncate text-[12px] text-gray-500">
                          {[e.email, e.detail].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${meta.tone}`}
                      >
                        {meta.label}
                      </span>
                      <span className="hidden sm:block w-[92px] shrink-0 text-right text-[12px] text-gray-400">
                        {formatDate(e.createdAt)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={`h-fit ${cardBase}`}>
          <div className="border-b border-black/[0.06] px-5 py-4">
            <h2 className="text-lg text-secondary">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 p-3">
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <Link
                  key={a.href}
                  href={a.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-primary/[0.06] hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">{a.label}</span>
                  <Plus className="h-4 w-4 text-gray-300 transition-colors group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
