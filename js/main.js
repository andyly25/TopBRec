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
  googlebookData: []
};
// testing
// let count = 0;

// Starting off by initializing page with some of the popular fictions
function initPage () {
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
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
      </div>
    `);
    // fetch data based on user input using google api
    // we need to convert user input into a book title
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
      <div class="search-error">
        <p>Sorry, no results were found for this search term<p/>
      </div>
    `);
    // end early if search term not found
    return undefined;
  }
  const bookArray = createArrayTastedive();
  // Clear out possible old results
  API_DATA.googlebookData = [];

  // here we make an array to store promises
  // this will make sure we receive all data necessary before continuing on
  const promises = [];

  bookArray.forEach(function (book) {
    const googleApiData = {
      q: `intitle:${book}`,
      maxResults: 1
    };

    // get json data for each book
    const bookData = $.getJSON(GOOGLE_BOOKS_ENDPOINT, googleApiData, function (data) {
      API_DATA.googlebookData.push(data);
    });
    // now we start adding each bookData into our promise array to use in Promise.All
    promises.push(bookData);
  });

  // When all promises are fulfilled we can finally start displaying search results
  Promise.all(promises)
    .then(function () {
      displayUserSearchResult();
    });
}

// #4 create an array of book titles
function createArrayTastedive () {
  // create an array
  const bookArray = [];
  const infoArray = API_DATA.tastedive.Similar.Info;
  const resultsArray = API_DATA.tastedive.Similar.Results;
  // use a forEach to go through each item in array and push in book Name
  infoArray.forEach((book) => { bookArray.push(book.Name); });
  resultsArray.forEach((book) => { bookArray.push(book.Name); });
  // return the array of book names
  return bookArray;
}

function displayUserSearchResult () {
  // empty string used to store all of the HTML
  let htmlString = '';
  const infoArray = API_DATA.tastedive.Similar.Info;
  const infoResults = API_DATA.tastedive.Similar.Results;
  // combining book info and results from tastedive api
  // const combinedArray = [infoArray, ...API_DATA.tastedive.Similar.Results];
  const combinedArray = infoArray.concat(infoResults);
  // variables we'll grab from google api
  let googleThumbnail;
  let googleAuthor;
  let googlePublisher;
  let googlePreview;

  for (let i = 0; i < combinedArray.length; i += 1) {
    googleThumbnail = API_DATA.googlebookData[i].items[0].volumeInfo.imageLinks.thumbnail;
    googleAuthor = API_DATA.googlebookData[i].items[0].volumeInfo.authors[0];
    googlePublisher = API_DATA.googlebookData[i].items[0].volumeInfo.publisher;
    googlePreview = API_DATA.googlebookData[i].items[0].volumeInfo.previewLink;

    // currently all of google api is scrambled? will relook later
    htmlString += `
      <div class="recommend-entry">
        <p>
          <a href="${googlePreview}" target="_blank">
            <img src="${googleThumbnail}" class="book-cover" alt="book: ${combinedArray[i].Name}">
          </a>
        </p>
        <h2>
          <a href="${googlePreview}" target="_blank">${combinedArray[i].Name}</a>
        </h2>
        <h4>By ${googleAuthor}</h4>
        <h4 class="publisher">Published by: ${googlePublisher}</h4>
        <p class="hidden-content book-desc">description: ${combinedArray[i].wTeaser}</p>
        <input type="button" class="show-hide" value="Show">
        <p><a href="${combinedArray[i].wUrl}" target="_blank">Wikipedia Link</a></p>
      </div>
    `;
  }
  // finally show users their results
  $('#best-seller-titles').html(htmlString);
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

$(() => {
  initPage();
  // handleForm();
  handleSubmit();
  handleLogoPressed();
});
