"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface EventProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ItemEvent({
  id,
  title,
  description,
  createdAt,
}: EventProps) {
  const router = useRouter();

  return (
    <li
      key={id}
      className="border p-3 md:py-5 md:px-4 rounded-md bg-sky-100 border-sky-200 md:h-[214px]  xl:h-[250px] min-h-[200px] flex flex-col justify-between"
    >
      <div className="">
        <h2 className="text-base mb-3 md:text-lg font-semibold">{title}</h2>
        <p className="text-sm md:text-base mb-2">{description}</p>
        <p className="text-xs font-medium">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.push(`/register/${id}`)}
          className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all md:text-sm text-xs md:px-4 md:py-2 p-1 h-8 md:h-10"
        >
          Register
        </Button>
        <Button
          onClick={() => router.push(`/events/${id}`)}
          className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all md:text-sm text-xs md:px-4 md:py-2 p-1 h-8 md:h-10"
        >
          View
        </Button>
      </div>
    </li>
  );
}
