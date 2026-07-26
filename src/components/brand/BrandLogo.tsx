import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  priority?: boolean;
  /** White wordmark for dark surfaces */
  onDark?: boolean;
};

/** Transparent Alphora Labs wordmark (`/logo.png`). */
export function BrandLogo({ className, priority, onDark }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Alphora Labs"
      width={1399}
      height={287}
      priority={priority}
      className={cn(
        "w-auto max-w-none object-contain object-left",
        onDark && "brightness-0 invert",
        className || "h-8"
      )}
    />
  );
}
