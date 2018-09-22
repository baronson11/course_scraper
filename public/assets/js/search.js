document.addEventListener("DOMContentLoaded", () => {

  const searchResults = document.getElementById('searchResults');

  console.log('search.js connected')

  fetch(`/search-all-courses`, {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      populate(data);
    })
    .catch(err => console.log(err));

  function populate(data) {
    data.forEach(data => {
      let card = document.createElement('div');
      card.setAttribute("id", "card");
      card.innerHTML = `
        <h4>${data.title}</h4>
        <a href="${data.link}">${data.link}</a>
        <p>${data.description}</p>`;
      searchResults.appendChild(card);
    });

  }

  // -----end DOM content wrapper
});
