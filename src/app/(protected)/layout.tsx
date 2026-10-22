import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return children;
}
