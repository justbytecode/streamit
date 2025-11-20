"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ImageWithFallback from "./ImageWithFallback";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full  border-gray-100/20 bg-white/80 backdrop-blur-xl supports-backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2.5 transition-all">
          
          <h1 className="font-satoshi text-3xl font-black tracking-tight text-blue-100 transition-colors group-hover:text-pink-500">
            RecordIt
          </h1>
        </Link>

        {/* Right Section */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Profile Button */}
            <button
              onClick={() => router.push(`/profile/${session?.user.id}`)}
              className="group relative flex items-center gap-2.5 rounded-full border border-gray-100/20 bg-white/50 py-1.5 pl-1.5 pr-4 shadow-sm transition-all hover:border-pink-500/30 hover:bg-white hover:shadow-md"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-gray-100/20 transition-all group-hover:ring-pink-500/50">
                <ImageWithFallback
                  src={session?.user.image ?? ""}
                  alt="User"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-pink-500">
                {user.name?.split(' ')[0] || 'Profile'}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={async () => {
                return await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      redirect("/sign-in");
                    },
                  },
                });
              }}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-100/20 bg-white/50 transition-all hover:border-red-500/30 hover:bg-red-50 hover:shadow-md"
              title="Sign out"
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={20}
                height={20}
                className="rotate-180 transition-transform group-hover:scale-110"
              />
            </button>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:shadow-xl hover:shadow-pink-500/40 active:scale-95"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;