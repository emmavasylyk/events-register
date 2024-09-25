"use client";

import { useState, useEffect } from "react";
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

  const fetchEvents = async (page: number, search: string) => {
    const response = await fetch(`/api/events?page=${page}&search=${search}`);
    const data = await response.json();
    setEvents(data.events);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);

    window.history.pushState({}, "", `?page=${page}&search=${search}`);
  };

  const debouncedFetchEvents = debounce((search: string) => {
    fetchEvents(1, search);
  }, 300);

  useEffect(() => {
    const pageFromUrl = new URLSearchParams(window.location.search).get("page");
    const searchFromUrl = new URLSearchParams(window.location.search).get(
      "search"
    );
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    const search = searchFromUrl || "";
    fetchEvents(page, search);
  }, []);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      fetchEvents(page, searchQuery);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    debouncedFetchEvents(value);
  };

  return (
    <>
      <div className="mb-4 w-64 relative ml-auto">
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 pl-8"
        />
        <Search className="text-sky-600 size-4 absolute top-3 left-2" />
      </div>
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
  );
}
