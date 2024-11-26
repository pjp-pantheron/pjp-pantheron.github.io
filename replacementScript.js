var data = {}

async function getJson() {
    $.ajaxSetup({
        async: true,
        crossDomain: true,
        dataType: 'jsonp',
    });

    var JSONData = await $.getJSON('https://third-difficult-caribou.glitch.me/siteData.json')

    return JSONData
}

// Function to recursively search for a key in the data object
function findValueByKey(obj, key) {
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && typeof obj[k] === 'object' && obj[k] !== null) {
            var value = findValueByKey(obj[k], key);
            if (value !== undefined) {
                return value;
            }
        }
    }
    return undefined;
}

// Function to traverse the DOM and replace placeholders
async function replacePlaceholdersInDOM(element) {
    // Skip script and style elements
    if (element.nodeName === 'SCRIPT' || element.nodeName === 'STYLE') {
        return;
    }

    // Replace placeholders in text nodes
    if (element.nodeType === Node.TEXT_NODE) {
        var placeholderRegex = /PLACEHOLDER_([A-Z0-9_]+)/g;
        var originalText = element.nodeValue;
        var newText = originalText.replace(placeholderRegex, function(match, p1) {
            var key = p1.toLowerCase();
            var value = findValueByKey(data, key);
            return (typeof value !== 'undefined') ? value : match;
        });
        if (newText !== originalText) {
            element.nodeValue = newText;
        }
    }

    // Replace placeholders in attributes
    if (element.attributes) {
        for (var i = 0; i < element.attributes.length; i++) {
            var attr = element.attributes[i];
            var originalAttrValue = attr.value;
            var newAttrValue = originalAttrValue.replace(/PLACEHOLDER_([A-Z0-9_]+)/g, function(match, p1) {
                var key = p1.toLowerCase();
                var value = findValueByKey(data, key);
                return (typeof value !== 'undefined') ? value : match;
            });
            if (newAttrValue !== originalAttrValue) {
                attr.value = newAttrValue;
            }
        }
    }

    // Recursively process child nodes
    var child = element.firstChild;
    while (child) {
        replacePlaceholdersInDOM(child);
        child = child.nextSibling;
    }
}

function createEventComponent(sampleEventComponent, eventName, eventDate, event_location, eventDescription) {
    console.log(sampleEventComponent)
    var eventComponent = sampleEventComponent.cloneNode(true)
    console.log(eventComponent)
    eventComponent.id = ""
    var eventDayLabel = eventComponent.querySelector(".event_day")
    var eventMonthLabel = eventComponent.querySelector(".event_month")
    var eventNameLabel = eventComponent.querySelector(".event_name")
    var eventLinkComponent = eventComponent.querySelector(".event_link")


    eventDayLabel.innerHTML = eventDate.split(" ")[1]
    console.log(eventDayLabel)
    eventMonthLabel.innerText = eventDate.split(" ")[0]
    eventNameLabel.innerText = eventName

    eventLinkComponent.href = `/event.html?event_date=${eventDate}&event_name=${eventName}&event_location=${event_location}&event_description=${eventDescription}`

    return eventComponent
}

function replaceEvents() {
    var sampleEventComponent = document.querySelector("#sample_event_component")
    var events = data.events

    for (var event of events) {
        var eventName = event.event_name
        var eventDate = event.event_date
        var eventLocation = event.event_location
        var eventDescription = event.event_description

        var eventComponent = createEventComponent(sampleEventComponent, eventName, eventDate, eventLocation, eventDescription)
        sampleEventComponent.parentElement.appendChild(eventComponent)
        console.log(eventComponent)
        eventComponent.style.display = "block"
    }    
}


// Execute the function after the page loads
window.onload = async function() {
    data = await getJson();
    replacePlaceholdersInDOM(document.body);
    replaceEvents();
};

