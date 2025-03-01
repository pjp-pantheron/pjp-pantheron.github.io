const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

/** @param {Event} event */
function handleSubmit(event) {
    const url = new URL(form.action);
    const formData = new FormData(form);
  
    /** @type {Parameters<fetch>[1]} */
    const fetchOptions = {
      method: form.method,
      body: formData,
    };
  
    console.log(formData)
    fetch(url, fetchOptions);
  
    event.preventDefault();

    alert("Student Totals Updated!")
  }

async function getJson() {
    $.ajaxSetup({
        async: true,
        crossDomain: true,
        dataType: 'jsonp',
    });

    var JSONData = await $.getJSON('https://third-difficult-caribou.glitch.me/studentTotals.json')

    return JSONData
}


async function main() {
  document.getElementById("uploadArea").style.display = "none"
  document.getElementById("submitArea").style.display = "none"

  console.log("main")

  await getJson()

  document.getElementById("loader1").style.display = "none"

  document.getElementById("uploadArea").style.display = "flex"
  document.getElementById("submitArea").style.display = "flex"
}

main()
