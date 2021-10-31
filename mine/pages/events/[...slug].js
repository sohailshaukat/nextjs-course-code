import { useRouter } from 'next/router'
import React from 'react'
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import ResultsTitle from '../../components/events/results-title';


function FilteredEventsPage() {
    
    const router = useRouter();

    const filterdata = router.query.slug;

    if(!filterdata){
        return <p className="center">Loading...</p>
    }

    const filteredYear = +filterdata[0];
    const filteredMonth = +filterdata[1];

    if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear >2030 || filteredYear < 2021 || filteredMonth <1 || filteredMonth> 12){
        return <p>Invalid filter please adjust value.</p>
    }

    const filteredEvents = getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });

    if(!filteredEvents || filteredEvents.length ===0){
        return <p>No events found for the chosen filter.</p>
    }

    const date = new Date(filteredYear, filteredMonth-1);

    return (<>
        <ResultsTitle date={date}/>
        <EventList items={filteredEvents}/></>
    )
}

export default FilteredEventsPage
