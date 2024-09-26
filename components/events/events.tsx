"use client";

import { useState, useEffect, Suspense } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import debounce from "lodash.debounce";

import ItemEvent from "./item-event";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const searchQueryParams = useSearchParams();

  const fetchEvents = async (
    page: number,
    search: string,
    startDate: string,
    endDate: string
  ) => {
    const query = new URLSearchParams({
      page: page.toString(),
      search,
      startDate,
      endDate,
    }).toString();

    const response = await fetch(`/api/events?${query}`, {
      next: { revalidate: 1 },
    });
    setLoading(false);
    const data = await response.json();
    setEvents(data.events);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);

    window.history.pushState({}, "", `?${query}`);
  };

  const debouncedFetchEvents = debounce((search: string) => {
    fetchEvents(1, search, startDate, endDate);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = params.get("page");
    const searchFromUrl = params.get("search");
    const startDateFromUrl = params.get("startDate");
    const endDateFromUrl = params.get("endDate");

    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    const search = searchFromUrl || "";
    const startDate = startDateFromUrl || "";
    const endDate = endDateFromUrl || "";

    fetchEvents(page, search, startDate, endDate);
  }, []);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      fetchEvents(page, searchQuery, startDate, endDate);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedFetchEvents(value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
    fetchEvents(1, searchQuery, event.target.value, endDate);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    fetchEvents(1, searchQuery, startDate, event.target.value);
  };

  useEffect(() => {
    const searchFromUrl = searchQueryParams.get("search") || "";
    const startDateFromUrl = searchQueryParams.get("startDate") || "";
    const endDateFromUrl = searchQueryParams.get("endDate") || "";
    setSearchQuery(searchFromUrl);
    setStartDate(startDateFromUrl);
    setEndDate(endDateFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <div className="md:flex md:items-center md:justify-between md:mb-4 md:flex-row-reverse">
          <div className="mb-4 md:mb-0 w-64 relative ml-auto md:ml-0">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 pl-8"
            />
            <Search className="text-sky-600 size-4 absolute top-3 left-2" />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4 w-[335px] md:w-[448px] xl:w-[486px] md:mb-0 md:justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <p className="flex-shrink-0 md:text-sm xl:text-base w-[76px] md:w-[67px] text-sky-600 xl:w-[76px]">
                Start Date
              </p>
              <Input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
                className=""
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="flex-shrink-0 md:text-sm xl:text-base w-[76px] md:w-[67px] text-sky-600 xl:w-[76px]">
                End Date
              </p>
              <Input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
                className=""
              />
            </div>
          </div>
        </div>
        {events.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 mb-6 xl:mb-14">
              {events.map((event) => (
                <ItemEvent
                  key={event.id}
                  title={event.title}
                  description={event.description}
                  id={event.id}
                  createdAt={event.createdAt}
                />
              ))}
            </ul>

            <Pagination>
              <PaginationContent>
                <PaginationItem className="text-sky-700">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="transparent"
                    size="sm"
                  >
                    <ArrowLeft className="size-4 text-sky-600" />
                  </Button>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index} className="text-sky-600 ">
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                      className={
                        (cn(
                          currentPage === index + 1
                            ? "bg-sky-600/10 text-sky-600 border-sky-600 hover:bg-sky-600/10 focus:bg-sky-600/10"
                            : ""
                        ),
                        "w-8 h-8 md:w-10 md:h-10")
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem className="text-red-700 ">
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="transparent"
                    size="sm"
                  >
                    <ArrowRight className="size-4 text-sky-600" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        ) : (
          <div className="text-center font-semibold text-sky-600 text-xl">
            {loading ? (
              <span className="loader inline-block"></span>
            ) : (
              <>
                <p>No events found!</p>
                <span className="loader block mx-auto mt-6"></span>
              </>
            )}
          </div>
        )}
      </Suspense>
    </>
  );
}
