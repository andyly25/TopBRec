'use strict';

const nytimesKey = config.NYT_KEY;
// const googleBooksKey = config.GOOGLE_BOOKS_KEY;
const NYT_BOOKS_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists.json';
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';

function initPage () {
  fetch(`${NYT_BOOKS_ENDPOINT}?list-name=hardcover-fiction&api-key=${nytimesKey}`, {
    method: 'get'
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateBestSellers(json);
      console.log(json);
    })
    .catch((error) => {
      // in the case of hitting the rate limit... we'll use an archive
      console.log(`NYT API Error: Search not found: ${error}`);
      updateBestSellers(nytimesArchive);
    });
}

// $(document).ready(function () {
//   let option = $('#searchField').find('option:selected').val();
//   $('#searchField').change(function () {
//     option = $(this).find('option:selected').val();
//     console.log(option);
//   });
// });

function handleForm () {
  const bookSearchForm = $('form[name=book-search');
  // const bookField = $('input[name=input-book]');
  // const authorField = $('input[name=input-author]');
  // const genreField = $('input[name=input-genre]');
  const searchInput = $('input[name=user-input');
  let option = $('#searchField').find('option:selected').val();
  $('#searchField').change(function () {
    option = $(this).find('option:selected').val();
    console.log(option);
  });

  bookSearchForm.on('submit', (e) => {
    e.preventDefault();
    // get user values inputted
    // const book = bookField.val();
    // const author = authorField.val();
    // const genre = genreField.val();
    let userSearch = searchInput.val();
    userSearch = userSearch.replace(/\s+/g, '+').toLowerCase();
    // maybe append &max-results=20 at end
    console.log(`${GOOGLE_BOOKS_ENDPOINT}?q=${option}:${userSearch}`);

    // reset the input
    resetFields(searchInput);

    // pass along with Google endpoint
    // fetchBookData(GOOGLE_BOOKS_ENDPOINT, book, author, genre);
    fetchBookData(GOOGLE_BOOKS_ENDPOINT, option, userSearch);
  });
}

function fetchBookData (baseURL, option, searchTerm) {
  // make a url by concat endpoints together
  $('#best-seller-titles').append(`<p>Testing: ${baseURL}?q=${option}:${searchTerm}</p>`);
}

function resetFields (userSearch) {
  userSearch.val('');
  $('#best-seller-titles').empty();
}

function updateBestSellers (nytimesBestSellers) {
  nytimesBestSellers.results.forEach(function bestSellerBook (book) {
    const isbn = book.isbns[1].isbn10;
    const bookInfo = book.book_details[0];
    const lastWeekRank = book.rank_last_week || 'n/a';
    const weeksOnList = book.weeks_on_list || 'New this week!';
    const listing = `
      <div id="${book.rank}" class="entry">
        <p>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png" class="book-cover" id="cover-${book.rank}">
        </p>
        <h2>
          <a href="${book.amazon_product_url}" target="_blank">${bookInfo.title}</a>
        </h2>
        <h4>By ${bookInfo.author}</h4>
        <h4 class="publisher">Published by: ${bookInfo.publisher}</h4>
        <p>${bookInfo.description}</p>
        <div class="stats">
          <p>Last Week: ${lastWeekRank}</p>
          <p>Weeks on list: ${weeksOnList}</p>
        </div>
      </div>`;

    $('#best-seller-titles').append(listing);
    $(`#${book.rank}`).attr('nyt-rank', book.rank);

    updateCover(book.rank, isbn);
  });
}

function updateCover (id, isbn) {
  // fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${googleBooksKey}`, {
  // There's a rate limit of 1000 book search, and api key is only needed for user-specific info
  fetch(`${GOOGLE_BOOKS_ENDPOINT}?q=isbn:${isbn}`, {
    method: 'get'
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let img = data.items[0].volumeInfo.imageLinks.thumbnail;
      img = img.replace(/^http:\/\//i, 'https://');
      $(`#cover-${id}`).attr('src', img);
    })
    .catch((error) => {
      console.log(error);
      console.log('Google API Error');
    });
}

$(() => {
  initPage();
  handleForm();
});

