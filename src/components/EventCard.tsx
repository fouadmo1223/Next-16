import Image from "next/image";
import Link from "next/link";

interface props {
  title: string;
  image: string;
  date: string;
  location: string;
  time: string;
  slug: string;
}

const EventCard = ({ title, location, image, date, time, slug }: props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="poster"
      />

      <div className="flex gap-2">
        <Image src="/icons/pin.svg" alt="location" width={15} height={15} />
        <p>{location}</p>
      </div>

      <h3>{title}</h3>

      <div className="datetime">
        <div>
          <Image src="/icons/calendar.svg" alt="date" width={15} height={15} />
          <p>{date}</p>
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="time" width={15} height={15} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
