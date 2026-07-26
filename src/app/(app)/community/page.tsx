import { redirect } from "next/navigation";

/** Community retired — crowd signal lives in Swipe Pulse. */
export default function CommunityRedirectPage() {
  redirect("/pulse");
}
