"use client";

import { cn } from "@/lib/utils";

export const DEFAULT_USER_AVATAR = "/user_profile.jpeg";

type Props = {
  avatar?: string | null;
  name?: string | null;
  email?: string | null;
  className?: string;
  /** @deprecated Letter fallback removed — kept for call-site compatibility */
  textClassName?: string;
};

export function UserAvatar({ avatar, name, className }: Props) {
  const src = avatar?.trim() || DEFAULT_USER_AVATAR;
  const alt = name?.trim() || "Profile";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("shrink-0 object-cover bg-bg-muted", className)}
    />
  );
}
