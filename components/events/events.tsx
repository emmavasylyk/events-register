"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ItemEvent from "./item-event";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

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

  const fetchEvents = async (page: number) => {
    const response = await fetch(`/api/events?page=${page}`);
    const data = await response.json();
    setEvents(data.events);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);

    window.history.pushState({}, "", `?page=${page}`);
  };

  useEffect(() => {
    const pageFromUrl = new URLSearchParams(window.location.search).get("page");
    const page = pageFromUrl ? parseInt(pageFromUrl) : 1;
    fetchEvents(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      fetchEvents(page);
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-4 gap-8 mb-20">
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
                className={cn(
                  currentPage === index + 1
                    ? "bg-sky-600/10 text-sky-600 border-sky-600 hover:bg-sky-600/10 focus:bg-sky-600/10"
                    : ""
                )}
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
    </div>
  );
}
