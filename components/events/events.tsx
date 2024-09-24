import { PrismaClient } from "@prisma/client";
import ItemEvent from "./item-event";

const prisma = new PrismaClient();

export default async function Events() {
  // Создание 50 случайных событий
  const createRandomEvents = async () => {
    const events = Array.from({ length: 50 }, (_, index) => ({
      title: `Title${index + 1}`,
      description: `Description for event ${index + 1}`,
      createdAt: new Date(), // Текущая дата
    }));

    await prisma.event.createMany({
      data: events,
    });
  };
  // Проверка, существуют ли события, если нет, создаем их
  const existingEvents = await prisma.event.findMany();

  if (existingEvents.length === 0) {
    await createRandomEvents();
  }

  // Получаем события для отображения
  const events = await prisma.event.findMany();
  console.log(events);

  return (
    <ul className="grid grid-cols-4 gap-10">
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
  );
}
