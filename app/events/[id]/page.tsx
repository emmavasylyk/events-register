import { UsersRound } from "lucide-react";

import { PrismaClient } from "@prisma/client";

import ButtonBack from "@/components/button-back";

const prisma = new PrismaClient();

export default async function EventDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const users = await prisma.userList.findMany({
    where: {
      eventId: id,
    },
  });

  const event = await prisma.eventList.findUnique({
    where: { id: id },
  });

  return (
    <>
      <ButtonBack />
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 xl:mb-14">
        Participants {event?.title}
      </h2>
      {users.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8">
          {users.map((user) => (
            <li
              key={user.id}
              className="border py-5 px-4 bg-sky-100 rounded-md border-sky-200"
            >
              <p className="text-base mb-3 md:text-lg font-semibold">
                {user.name}
              </p>
              <p className="text-sm md:text-base">{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <UsersRound className="w-20 h-20 text-sky-600" />
          <p className="font-bold">There are no registered users.</p>
        </div>
      )}
    </>
  );
}
