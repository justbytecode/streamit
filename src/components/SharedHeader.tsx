"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import RecordScreen from "./RecordScreen";
import { filterOptions } from "@/constants";
import ImageWithFallback from "./ImageWithFallback";
import DropdownList from "./DropdownList";
import { updateURLParams } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const SharedHeader = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [selectedFilter, setSelectedFilter] = useState(
    searchParams.get("filter") || "Most Recent"
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
    setSelectedFilter(searchParams.get("filter") || "Most Recent");
  }, [searchParams]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery !== searchParams.get("query")) {
        const url = updateURLParams(
          searchParams,
          { query: searchQuery || null },
          pathname
        );
        router.push(url);
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchParams, pathname, router]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    const url = updateURLParams(
      searchParams,
      { filter: filter || null },
      pathname
    );
    router.push(url);
  };

  const renderFilterTrigger = () => (
    <div className="flex items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-all hover:border-pink-500/30 hover:shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/icons/hamburger.svg"
          alt="filter"
          width={14}
          height={14}
          className="opacity-60"
        />
        <span className="text-sm font-semibold text-gray-700">{selectedFilter}</span>
      </div>
      <Image
        src="/assets/icons/arrow-down.svg"
        alt="arrow"
        width={16}
        height={16}
        className="opacity-60"
      />
    </div>
  );

  return (
    <header className="flex flex-col gap-8">
      {/* Top Section: Title & Actions */}
      <section className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Title Area */}
        <div className="flex items-start gap-4">
          {userImg && (
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl ring-4 ring-gray-100/50 shadow-lg">
              <ImageWithFallback
                src={userImg}
                alt="user"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
              {subHeader}
            </p>
            <h1 className="text-4xl font-black capitalize leading-tight tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        {isAuthenticated && (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/upload"
              className="group flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-pink-500/30 hover:bg-pink-50 hover:text-pink-600 hover:shadow-md"
            >
              <Image
                src="/assets/icons/upload.svg"
                alt="upload"
                width={16}
                height={16}
                className="transition-transform group-hover:scale-110"
              />
              <span className="truncate">Upload a video</span>
            </Link>
            <RecordScreen />
          </div>
        )}
      </section>

      {/* Search & Filter Section */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="group relative w-full max-w-xl">
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={18}
              height={18}
              className="opacity-40 transition-opacity group-focus-within:opacity-60"
            />
          </div>
          <input
            type="text"
            placeholder="Search for videos, tags, folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-5 text-sm font-medium text-gray-900 placeholder:text-gray-400 shadow-sm transition-all focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownList
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterChange}
          triggerElement={renderFilterTrigger()}
        />
      </section>
    </header>
  );
};

export default SharedHeader;