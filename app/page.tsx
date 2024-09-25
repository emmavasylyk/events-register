import Events from "@/components/events/events";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 xl:mb-14">
        Events
      </h1>
      <Events />
    </div>
  );
}
