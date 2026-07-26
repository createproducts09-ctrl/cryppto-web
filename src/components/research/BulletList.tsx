import { toBullets, type SectionBlock } from "@/lib/research";
import { cn } from "@/lib/utils";

export function BulletList({
  items,
  compact,
  className,
}: {
  items: string[];
  compact?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul className={cn("space-y-2", compact && "space-y-1.5", className)}>
      {items.map((item, i) => (
        <li key={`${i}-${item.slice(0, 24)}`} className="flex gap-2.5">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span
            className={cn(
              "text-sm leading-relaxed text-text-secondary",
              compact && "text-[13px] leading-snug"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function BulletSectionCard({
  title,
  bullets,
  index,
  className,
}: {
  title: string;
  bullets: string[] | unknown;
  icon?: string;
  eyebrow?: string;
  index?: number;
  className?: string;
}) {
  const items = toBullets(bullets);
  if (!items.length) return null;

  return (
    <section
      className={cn(
        "border-b border-border py-4 last:border-b-0 animate-fade-in",
        className
      )}
    >
      <div className="mb-2.5 flex items-baseline gap-2">
        {index != null ? (
          <span className="text-[11px] font-semibold tabular-nums text-primary">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
        <h3 className="text-sm font-semibold text-text">{title}</h3>
      </div>
      <BulletList items={items} />
    </section>
  );
}

export function SectionStack({ sections }: { sections: SectionBlock[] }) {
  if (!sections.length) return null;
  return (
    <div className="rounded-xl border border-primary/10 bg-bg-elevated px-4 sm:px-5">
      {sections.map((s, i) => (
        <BulletSectionCard
          key={s.key}
          title={s.title}
          bullets={s.bullets}
          index={i + 1}
        />
      ))}
    </div>
  );
}
