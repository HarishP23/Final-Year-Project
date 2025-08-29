"use client";

import { Target, BookOpen, Download, UserCheck, Layers, Flame } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {/* Row 1 (md): Skill Gap | Habit Forming */}
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Target className="h-5 w-5 text-white" />}
        title="Skill Gap Analysis"
        description="Upload your resume to analyze gaps between your current skills and your target role. Get clear insight into what to learn next."
        gradient="from-blue-500 via-indigo-500 to-purple-500"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/8]"
        icon={<Flame className="h-5 w-5 text-white" />}
        title="Habit Forming"
        description="Build consistent study habits with streaks, reminders, and daily checkpoints to keep momentum."
        gradient="from-amber-500 via-orange-500 to-red-500"
      />

      {/* Row 2 (md): Personalized Roadmap | Download Plan */}
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/5]"
        icon={<BookOpen className="h-5 w-5 text-white" />}
        title="Personalized Roadmap"
        description="Generate a tailored learning plan based on your goals, current proficiency, and daily study time."
        gradient="from-green-500 via-emerald-500 to-teal-500"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:2/5/3/8]"
        icon={<Download className="h-5 w-5 text-white" />}
        title="Download Your Plan"
        description="Save your personalized roadmap as a PDF for offline access, sharing, or printing."
        gradient="from-purple-500 via-fuchsia-500 to-pink-500"
      />

      {/* Row 3 (md): Personalized Experience | Curated Resources */}
      <GridItem
        area="md:[grid-area:3/1/4/7] xl:[grid-area:1/8/2/13]"
        icon={<UserCheck className="h-5 w-5 text-white" />}
        title="Personalized Experience"
        description="Enjoy tailored recommendations, progress tracking, and habit building designed around your unique journey."
        gradient="from-orange-500 via-rose-500 to-red-500"
      />

      <GridItem
        area="md:[grid-area:3/7/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Layers className="h-5 w-5 text-white" />}
        title="Curated Resources"
        description="Access handpicked articles, courses, and tutorials mapped to your roadmap to learn faster with quality content."
        gradient="from-cyan-500 via-sky-500 to-blue-500"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  gradient: string; // tailwind gradient stops
}

const GridItem = ({ area, icon, title, description, gradient }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      {/* Gradient border wrapper */}
      <div className={`group relative h-full rounded-2xl p-[1px] transition-all duration-300 md:rounded-3xl hover:scale-[1.02] hover:-translate-y-0.5 bg-gradient-to-br ${gradient}`}>
        {/* Inner card */}
        <div className="relative h-full rounded-2xl bg-neutral-950 p-2 md:rounded-3xl md:p-3 border border-neutral-800/80">
          {/* Soft glow overlays */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

          {/* Cursor proximity glow */}
          <GlowingEffect
            spread={70}
            glow={true}
            disabled={false}
            proximity={90}
            inactiveZone={0.01}
          />

          {/* Content */}
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6">
            {/* Decorative corner accent */}
            <div className="pointer-events-none absolute right-4 top-4 h-14 w-14 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl" />

            <div className="relative flex flex-1 flex-col justify-between gap-4">
              {/* Icon badge */}
              <div className="w-fit rounded-xl border border-white/10 p-2.5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:border-white/20 transition-colors duration-300">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>{icon}</div>
              </div>

              <div className="space-y-3">
                <h3 className="font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                  {title}
                </h3>
                <p className="font-sans text-sm/[1.25rem] text-neutral-300 md:text-base/[1.5rem]">
                  {description}
                </p>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div className={`h-px w-full bg-gradient-to-r ${gradient} opacity-30`} />
          </div>
        </div>
      </div>
    </li>
  );
}; 