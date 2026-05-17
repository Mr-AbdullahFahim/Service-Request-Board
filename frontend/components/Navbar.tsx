"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { buttonVariants } from "./ui/button";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          ServiceRequest
        </Link>
        <div className="flex items-center gap-4">
          {!isLoading && user ? (
            <>
              <span className="text-sm text-slate-500 hidden sm:inline-block">
                {user.email}
              </span>
              <button
                onClick={logout}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Logout
              </button>
            </>
          ) : !isLoading ? (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Register
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
