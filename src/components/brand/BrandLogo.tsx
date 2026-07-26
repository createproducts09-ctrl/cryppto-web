import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  priority?: boolean;
  /** Invert black wordmark for dark surfaces */
  onDark?: boolean;
};

export function BrandLogo({ className, priority, onDark }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Alphora Labs"
      width={1774}
      height={887}
      priority={priority}
      className={cn(
        "h-11 w-auto max-w-none object-contain object-left",
        onDark && "brightness-0 invert",
        className
      )}
    />
  );
}
