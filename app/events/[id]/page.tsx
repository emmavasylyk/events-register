import { PrismaClient } from "@prisma/client";

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
    <div>
      <h2 className="text-3xl font-bold text-center mb-14">
        Participants {event?.title}
      </h2>
      <ul className="grid grid-cols-4 gap-8">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="border py-5 px-4 rounded-md border-sky-200"
            >
              <p className="mb-3 text-lg">{user.name}</p>
              <p className="text-base">{user.email}</p>
            </li>
          ))
        ) : (
          <p>There are no registered users.</p>
        )}
      </ul>
    </div>
  );
}
