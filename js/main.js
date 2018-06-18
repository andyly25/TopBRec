'use strict';

const nytimesKey = config.NYT_KEY;
// const googleBooksKey = config.GOOGLE_BOOKS_KEY;
const tastediveKey = config.TASTEDIVE_KEY;
const NYT_BOOKS_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
const TASTEDIVE_BOOKS_ENDPOINT = 'https://tastedive.com/api/similar';

const API_DATA = {
  tastedive: null,
  // googlebook: null,
  // googlebookData: []
};
// testing
// let count = 0;

// Starting off by initializing page with some of the popular fictions
function initPage () {
  $('#best-seller-titles').html(`
    <div class="loader-wrapper">
      <div class="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
  `);
  fetch(`${NYT_BOOKS_ENDPOINT}?&api-key=${nytimesKey}`, {
    method: 'get'
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateBestSellers(json);
      // console.log(json);
    })
    .catch((error) => {
      // in the case of hitting the rate limit... we'll use an archive
      // 1000 calls allowed only
      console.log(`NYT API Error: Search not found: ${error}`);
      updateBestSellers(nytimesArchive);
    });
}

// updates the book listing on home page using nytimes
function updateBestSellers (nytimesBestSellers) {
  $('#best-seller-titles').empty();
  nytimesBestSellers.results.books.forEach(function bestSellerBook (book) {
    const lastWeekRank = book.rank_last_week || 'n/a';
    const weeksOnList = book.weeks_on_list || 'New this week!';
    const listing = `
      <div id="${book.rank}" class="entry">
        <p>
          <img src="${book.book_image}" class="book-cover" id="cover-${book.rank}" alt="book: ${book.title}">
        </p>
        <h2>
          <a href="${book.amazon_product_url}" target="_blank">${book.title}</a>
        </h2>
        <h4>By ${book.author}</h4>
        <h4 class="publisher">Published by: ${book.publisher}</h4>
        <p>${book.description}</p>
        <div class="stats">
          <p>Last Week: ${lastWeekRank}</p>
          <p>Weeks on list: ${weeksOnList}</p>
        </div>
      </div>`;

    $('#best-seller-titles').append(listing);
    $(`#${book.rank}`).attr('nyt-rank', book.rank);

    // updateCover(book.rank, isbn);
  });
}

// function resetApiData () {
//   API_DATA.tastedive = null;
//   API_DATA.googlebook = null;
//   API_DATA.googlebookData = {};
// }

// #1 initial function.
function handleSubmit () {
  const bookSearchForm = $('form[name=book-search]');
  const searchInput = $('input[name=user-input]');
  // let option = $('#searchField').find('option:selected').val();
  // $('#searchField').change(() => {
  //   option = $(this).find('option:selected').val();
  // });

  bookSearchForm.on('submit', (e) => {
    e.preventDefault();
    // get user values inputted
    let userSearch = searchInput.val();
    // userSearch = userSearch.replace(/\s+/g, '+').toLowerCase();
    // reset the input
    resetSearchFields(searchInput);

    // Loading spinner here
    // borrowed from https://ihatetomatoes.net/create-custom-preloading-screen/
    $('#best-seller-titles').html(`
      <div class="loader-wrapper">
        <div class="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
      </div>
    `);
    // fetch data based on user input using google api
    // we need to convert user input into a book title
    console.log('submit search is: ', userSearch);
    getTastediveApiData(userSearch);
  });
}

// #2 get tastedive data
function getTastediveApiData (searchTerm) {
  // data sent to ajax
  const dataTastedive = {
    k: tastediveKey,
    q: searchTerm,
    type: 'books',
    limit: 5,
    info: 1
  };

  // Our ajax call
  // adding in jsonp helped resolve No 'Access-Control-Allow-Origin'
  $.when(
    $.ajax({
      type: 'GET',
      url: TASTEDIVE_BOOKS_ENDPOINT,
      jsonp: 'callback',
      dataType: 'jsonp',
      data: dataTastedive,
      success: function (data) {
        API_DATA.tastedive = data;
      }
    })
  ).then(function () {
    getGoogleApiData();
  });
}

// #3 get google api data
function getGoogleApiData () {
  const resultsArrayTD = API_DATA.tastedive.Similar.Results;
  // check to see if array is empty (no results found)
  if (resultsArrayTD.length === 0) {
    $('#best-seller-titles').html(`
      <div class="recommend-entry">
        <p>Sorry, results were not found for this search term<p/>
        <p>Please try another book title</p>
      </div>
    `);
    // end early if search term not found
    return undefined;
  }

  // here we make an array to store promises
  // this will make sure we receive all data necessary before continuing on
  const infoArray = API_DATA.tastedive.Similar.Info[0];
  const arr = [infoArray, ...API_DATA.tastedive.Similar.Results];
  const promises = arr.map(getBookData);
  console.log('promises', promises);

  // When all promises are fulfilled we can finally start displaying search results
  Promise.all(promises)
    .then(function (books) {
      displayUserSearchResult(books);
    });

  $('.loader-wrapper').toggleClass('loaded');
}

function getBookData (searchTerm) {
  const correctSearchTerm = searchTerm.Name.replace(/\s+/g, '+');
  console.log('correctSearchTerm: ', correctSearchTerm);
  return fetch(`${GOOGLE_BOOKS_ENDPOINT}?q=intitle:${correctSearchTerm}&maxResults=1`)
    .then((response) => {
      // console.log('response from otherBooks!', response);
      return response.json();
    })
    .then(data => Object.assign(data, searchTerm))
    .catch((error) => {
      console.log(error);
      // console.log('Google API Error');
    });
}

// #5 display the book results based on search term
function displayUserSearchResult (books) {
  $('#best-seller-titles').html(books.map((book) => {
    console.log('book', book);
    const bookData = book.items[0].volumeInfo;
    return `
    <div class="recommend-entry">
      <p>
        <a href="${bookData.previewLink}" target="_blank">
          <img src="${bookData.imageLinks.thumbnail}" class="book-cover" alt="book: ${book.Name}">
        </a>
      </p>
      <h2>
        <a href="${bookData.previewLink}" target="_blank">${book.Name}</a>
      </h2>
      <h4>By ${bookData.authors[0]}</h4>
      <h4 class="publisher">Published by: ${bookData.publisher}</h4>
      <p class="hidden-content book-desc">description: ${book.wTeaser}</p>
      <input type="button" class="show-hide" value="Show">
      <p><a href="${book.wUrl}" target="_blank">Wikipedia Link</a></p>
    </div>
  `;
  }));
}

// reset search field
function resetSearchFields (userSearch) {
  userSearch.val('');
  $('#best-seller-titles').empty();
}

// When user clicks logo, bring back the home page
function handleLogoPressed () {
  $('header').on('click', '#nyt-logo', (event) => {
    $('#best-seller-titles').empty();
    initPage();
  });
}

$(document).on('click', '.show-hide', () => {
  $('.book-desc').toggleClass('hidden-content');
  $('.show-hide').val($('.show-hide').val() === 'Show' ? 'Hide' : 'Show');
  // console.log("hellow");
});

// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('topBtn').style.display = 'block';
  } else {
    document.getElementById('topBtn').style.display = 'none';
  }
};

// When the user clicks on the button, scroll to the top of the document
$(document).on('click', '#topBtn', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// This will run our functions
$(() => {
  initPage();
  // handleForm();
  handleSubmit();
  handleLogoPressed();
});
