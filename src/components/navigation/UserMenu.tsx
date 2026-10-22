"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { authClient } from "@/src/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  initialSession: Awaited<ReturnType<typeof authClient.getSession>>
}

export default function UserMenu({ initialSession }: UserMenuProps) {
  const router = useRouter();
  const session = initialSession;

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const userInitials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : session.user?.email?.[0].toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={session.user?.image || undefined} 
            alt={session.user?.name || ""} 
          />
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{session.user?.name}</p>
          <p className="text-xs text-muted-foreground">{session.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/profile" />}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/settings" />}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 