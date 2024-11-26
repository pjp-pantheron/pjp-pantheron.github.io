function main() {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const eventDate = urlParams.get('event_date')
    const eventName = urlParams.get('event_name')
    const eventLocation = urlParams.get('event_location')
    const eventDescription= urlParams.get('event_description')
    
    var eventTitleComponent = document.querySelector("#big_event_title")
    eventTitleComponent.innerText = eventName;
    
    var eventLocationComponent = document.querySelector("#event_location")
    eventLocationComponent.innerText = eventLocation

    var eventDateComponent = document.querySelector("#event_date")
    eventDateComponent.innerText = eventDate

    var eventDescriptionComponent = document.querySelector("#event_description")
    eventDescriptionComponent.innerHTML = eventDescription
}



console.log("loaded")
main()