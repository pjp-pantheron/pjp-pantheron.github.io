function linkify(text) {
    const urlRegex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="  color: #3898EC; text-decoration: underline;">$1</a>');
}

function main() {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const eventDate = urlParams.get('event_date')
    const eventName = urlParams.get('event_name')
    const eventLocation = urlParams.get('event_location')
    var eventDescription= urlParams.get('event_description')
    
    var eventTitleComponent = document.querySelector("#big_event_title")
    eventTitleComponent.innerText = eventName;
    
    var eventLocationComponent = document.querySelector("#event_location")
    eventLocationComponent.innerText = eventLocation

    var eventDateComponent = document.querySelector("#event_date")
    eventDateComponent.innerText = eventDate

    var eventDescriptionComponent = document.querySelector("#event_description")
    eventDescription = linkify(eventDescription);

    eventDescriptionComponent.innerHTML = eventDescription
}



console.log("loaded")
main()