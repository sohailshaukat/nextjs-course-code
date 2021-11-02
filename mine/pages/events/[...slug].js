import { useRouter } from "next/router";
import React from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import {getFilteredEvents} from "../../helpers/api-util";

function FilteredEventsPage(props) {
  const router = useRouter();

  const filterdata = router.query.slug;

  if (!filterdata) {
    return <p className="center">Loading...</p>;
  }

//   const filteredYear = +filterdata[0];
//   const filteredMonth = +filterdata[1];

  if (props.hasError) {
    return <p>Invalid filter please adjust value.</p>;
  }

  const filteredEvents = props.filteredEvents;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter.</p>;
  }

  const date = new Date(props.filteredYear, props.filteredMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const filterdata = params.slug;

  const filteredYear = +filterdata[0];
  const filteredMonth = +filterdata[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
        props:{
            hasError: true
        }
    //   notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: { filteredEvents, filteredYear, filteredMonth },
  };
}
