"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface EventProps {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export default function ItemEvent({
  title,
  description,
  createdAt,
  id,
}: EventProps) {
  const router = useRouter();

  // Получаем события для отображения

  return (
    <li key={id} className="border p-5">
      <h2 className="mb-3">{title}</h2>
      <p className="mb-5">{description}</p>
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push("/register")}>Register</Button>
        <Button>View</Button>
      </div>
    </li>
  );
}
