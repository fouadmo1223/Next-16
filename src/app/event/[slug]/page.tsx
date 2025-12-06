import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";
import { getSimilarEventsBySlug } from "@/lib/actions/events.actions";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/events/${slug}`
  );
  const { data } = await req.json();
  
  
  if (!data) {
      return notFound();
    }
    
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(data.slug);
  const bookings = 10;

  return (
    <section id="event">
      {/* <Suspense fallback={<div>Loading...</div>}>
        <p>slug: {slug}</p>

        <EventDetails params={slug} />
      </Suspense> */}
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{data.description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            className="banner"
            src={data.image}
            alt={data.title}
            width={800}
            height={800}
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{data.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Deatils</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={data.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={data.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={data.location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={data.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={data.audience}
            />
          </section>
          <EventAgenda agendaItems={data.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{data.organizer}</p>
          </section>

          <EventTags tags={data.tags} />
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={data._id} slug={data.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.title} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default EventDetailsPage;
