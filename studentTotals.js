async function getJson() {
    $.ajaxSetup({
        async: true
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

async function main() {
    var json = await getJson();
    console.log(json)

    await renderJson(json);
}

main()