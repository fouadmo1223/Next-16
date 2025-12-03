import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";

import { events } from "@/lib/constants";

export default async function Home() {
 
  return (
    <section className="">
      <h1 className="text-center text-3xl font-bold">
        The Hub Of Every Developer
        <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5 ">
        {" "}
        Hackathons, Workshops, And More All In One Place{" "}
      </p>
      <div className="flex w-full justify-center">
        <ExploreBtn />
      </div>
      <div className="mt-10 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event, index) => (
           <EventCard key={index} {...event} />
          ))}
        </ul>
      </div>
    </section>
  );
}
