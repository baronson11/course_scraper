document.addEventListener('DOMContentLoaded', () => {
// Selectors -----------------------------------------------
  const searchForm = document.getElementById('searchForm');
  const searchButton = document.getElementById('searchButton');
  const browseButton = document.getElementById('browseButton');
  const input = document.getElementById('searchTerm');

  console.log('main.js connected')

  // searchForm.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   if (input.value) {
  //     let data = {
  //       topic: input.value
  //     };
  //
  //     fetch(`/search-by-topic`, {
  //         method: "POST",
  //         headers: {
  //           "Accept": "application/json, text/plain, */*",
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(data)
  //       })
  //       .then((res) => {
  //         return res.json();
  //         window.location.replace("/search")
  //       })
  //       .catch(err => console.log(err));
  //   }
  // });

  // searchButton.addEventListener('click', () => {
  //   console.log('search button clicked');
  // });

  browseButton.addEventListener('click', () => {
    console.log('browse button clicked');
    fetch(`/search-all-courses`, {
        method: "GET",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        // return res.json();
        window.location.replace('/search')
      })
      .catch(err => console.log(err));
  });
  // ---end wrapper for dom
});
