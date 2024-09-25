"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface EventProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function ItemEvent({ id, title, description }: EventProps) {
  const router = useRouter();

  return (
    <li
      key={id}
      className="border py-5 px-4 rounded-md border-sky-200 h-[200px] flex flex-col justify-between"
    >
      <div className="">
        <h2 className="mb-3 text-lg font-semibold">{title}</h2>
        <p className="text-base">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.push(`/register/${id}`)}
          className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all"
        >
          Register
        </Button>
        <Button
          onClick={() => router.push(`/events/${id}`)}
          className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all"
        >
          View
        </Button>
      </div>
    </li>
  );
}
