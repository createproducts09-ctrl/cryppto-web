import Image from "next/image";

import { blogCoverPath } from "@/content/blog";
import { cn } from "@/lib/utils";

export function BlogCover({
  category,
  slug,
  featured = false,
  priority = false,
}: {
  category: string;
  slug: string;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-bg-muted",
        featured
          ? "min-h-[220px] sm:min-h-[280px] lg:min-h-full"
          : "aspect-video",
      )}
    >
      <Image
        src={blogCoverPath(slug)}
        alt=""
        fill
        priority={priority}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes={
          featured
            ? "(min-width: 1024px) 50vw, 100vw"
            : "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
      />
      <p className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
        {category}
      </p>
    </div>
  );
}
