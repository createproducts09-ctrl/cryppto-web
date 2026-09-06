export type BlogCardPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  dateLabel: string;
  readingMinutes: number;
  category: string;
};

const CATEGORY_TONE: Record<
  string,
  { chip: string; wash: string; ink: string }
> = {
  Guides: {
    chip: "bg-primary-soft text-primary",
    wash: "from-primary/20 via-accent/10 to-primary/5",
    ink: "text-primary",
  },
  AI: {
    chip: "bg-primary-soft text-primary",
    wash: "from-accent/25 via-primary/10 to-bg-muted",
    ink: "text-primary",
  },
  Portfolio: {
    chip: "bg-up-soft text-up",
    wash: "from-up/20 via-up/5 to-primary/5",
    ink: "text-up",
  },
  Fundamentals: {
    chip: "bg-bg-muted text-text-secondary",
    wash: "from-border-strong/40 via-bg-muted to-primary/5",
    ink: "text-text-secondary",
  },
  Workflow: {
    chip: "bg-primary-soft text-primary",
    wash: "from-primary/15 via-bg-muted to-accent/10",
    ink: "text-primary",
  },
  Bhasha: {
    chip: "bg-primary-soft text-primary",
    wash: "from-primary/20 via-accent/10 to-primary/5",
    ink: "text-primary",
  },
};

export function categoryTone(category: string) {
  return (
    CATEGORY_TONE[category] ?? {
      chip: "bg-primary-soft text-primary",
      wash: "from-primary/15 via-bg-muted to-primary/5",
      ink: "text-primary",
    }
  );
}
