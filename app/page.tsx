import Events from "@/components/events/events";
import ItemEvent from "@/components/events/item-event";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-14">Events</h1>
      <Events />
    </div>
  );
}
