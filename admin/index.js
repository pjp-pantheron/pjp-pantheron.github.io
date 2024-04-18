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