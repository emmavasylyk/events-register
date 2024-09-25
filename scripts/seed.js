const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const database = new PrismaClient();

async function main() {
  const data = fs.readFileSync("data.json", "utf8");
  const events = JSON.parse(data);

  try {
    await database.eventList.deleteMany();
    await database.eventList.createMany({
      data: events,
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
