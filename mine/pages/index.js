import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

export default function HomePage(props) {
  return (
    <div>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = getFeaturedEvents();

  return {
    props: { featuredEvents },
    revalidate: 1800
  };
}
