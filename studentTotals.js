async function getJson() {
    $.ajaxSetup({
        async: true,
        crossDomain: true,
        dataType: 'jsonp',
    });

    var JSONData = await $.getJSON('https://third-difficult-caribou.glitch.me/studentTotals.json')

    return JSONData
}

async function renderJson(json) {
    var studentNameListObject = document.getElementById("studentNameList")
    var studentDonationAmountListObject = document.getElementById("studentDonationAmountList")

    for (var studentTotalData of json) {
        var studentName = studentTotalData[0]
        var total = studentTotalData[1]

        console.log(`${studentName}: ${total}`)

        var studentNameText = document.createElement("h4")
        studentNameText.className = "listItemText"
        studentNameText.innerText = studentName

        var studentDonationAmountText = document.createElement("h4")
        studentDonationAmountText.className = "listItemText"
        studentDonationAmountText.innerText = "$" + total

        studentNameListObject.appendChild(studentNameText)
        studentDonationAmountListObject.appendChild(studentDonationAmountText)
    }
}

$("#searchBarInput").on('change keydown paste input', function(){
    console.log($("#searchBarInput").val())
    var nameInput = $("#searchBarInput").val()

    var nameElements = document.getElementById("studentNameList").children
    var totalElements = document.getElementById("studentDonationAmountList").children

    console.log(nameElements)

    var i = 0;
    for (var nameElement of nameElements) {
        var name = nameElement.textContent

        if (name.toLowerCase().includes(nameInput.toLowerCase().trim())) {
            nameElement.style.display = "block"
            totalElements[i].style.display = "block"
        } else {
            nameElement.style.display = "none"
            totalElements[i].style.display = "none"
        }

        i++
    }
});

async function main() {
    var json = await getJson();

    document.getElementById("loader1").style.display = "none"
    document.getElementById("searchBarInput").style.display = "flex"

    document.getElementById("listArea").style.display = "flex"

    
    console.log(json)

    await renderJson(json);
}

main()