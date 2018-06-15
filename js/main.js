'use strict';

const nytimesKey = config.NYT_KEY;
// const googleBooksKey = config.GOOGLE_BOOKS_KEY;
const tastediveKey = config.TASTEDIVE_KEY;
const NYT_BOOKS_ENDPOINT = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json';
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
const TASTEDIVE_BOOKS_ENDPOINT = 'https://tastedive.com/api/similar';
const API_DATA = {
  tastedive: null,
  googlebook: null,
  googlebookData: {}
};

// Starting off by initializing page with some of the popular fictions
function initPage () {
  fetch(`${NYT_BOOKS_ENDPOINT}?&api-key=${nytimesKey}`, {
    method: 'get'
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // nytimesArchive = json;
      updateBestSellers(json);
      console.log(json);
    })
    .catch((error) => {
      // in the case of hitting the rate limit... we'll use an archive
      // 1000 calls allowed only
      console.log(`NYT API Error: Search not found: ${error}`);
      updateBestSellers(nytimesArchive);
    });
}

function handleForm () {
  const bookSearchForm = $('form[name=book-search');
  // const bookField = $('input[name=input-book]');
  // const authorField = $('input[name=input-author]');
  // const genreField = $('input[name=input-genre]');
  const searchInput = $('input[name=user-input');
  let option = $('#searchField').find('option:selected').val();
  console.log(option);
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
    // console.log(`${GOOGLE_BOOKS_ENDPOINT}?q=${option}:${userSearch}`);
    // console.log(`${TASTEDIVE_BOOKS_ENDPOINT}?q=${userSearch}&type=books&info=1&limit=10&k=${tastediveKey}`);

    // reset the input
    resetFields(searchInput);

    // pass along with Google endpoint
    // fetchBookData(GOOGLE_BOOKS_ENDPOINT, book, author, genre);
    fetchBookData(option, userSearch);
  });
}

function fetchBookData (option, searchTerm) {
  // const googleApiUrl = `${GOOGLE_BOOKS_ENDPOINT}?q=${option}:${searchTerm}`;
  // const tastediveApiUrl = `${TASTEDIVE_BOOKS_ENDPOINT}?q=${searchTerm}&type=books&info=1&limit=5&k=${tastediveKey}`;
  // make a url by concat endpoints together
  // $('#best-seller-titles').append(`
  //   <p><a href="${googleApiUrl}">Testing: googleApiUrl</a></p>
  //   <p><a href="${tastediveApiUrl}">Testing: tastediveKey</a></p>
  //   `);

  // we need to grab book data
  // might not need success
  const settings = {
    url: GOOGLE_BOOKS_ENDPOINT,
    data: {
      q: `${option}:${searchTerm}`
    },
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      API_DATA.googlebook = data;
      console.log('from google ajax');
      console.log(data.items);
    }
  };
  $.ajax(settings)
    .then(() => {
      getGoogleBookData(API_DATA.googlebook);
      console.log(API_DATA.googlebook);
    });

  // later convert based on ISBN to books for tastedive using google api if
  // option is isbn
  if (option === 'isbn') {
    searchTerm = 'something from Google Api';
  }

  // Need to figure out how to get around CORS for tastedive
  let dataTastedive = {
    k: tastediveKey,
    q: searchTerm,
    type: 'books',
    limit: 5,
    info: 1
  };

  // ajax call
  // adding in jsonp helped resolve No 'Access-Control-Allow-Origin'
  $.ajax({
    type: 'GET',
    url: TASTEDIVE_BOOKS_ENDPOINT,
    jsonp: 'callback',
    dataType: 'jsonp',
    data: dataTastedive,
    success: function (data) {
      API_DATA.tastedive = data;
    }
  }).then(() => {
    updateSearchItems(API_DATA.tastedive);
  });
}

// Here we'll grab google book data to return relevant information for tastedive to use
function getGoogleBookData (data) {
  console.log('inside getgooglebookdata');
  console.log(data);
  // data.items.forEach(function googleBookData (bookInfo) {
  //   console.log('inside googleBookData function');
  //   console.log(bookInfo);
  //   API_DATA.googlebookData.title = bookInfo.volumeInfo.title;
  //   API_DATA.googlebookData.thumbnail = bookInfo.volumeInfo.imageLinks.thumbnail;
  //   API_DATA.googlebookData.previewLink = bookInfo.volumeInfo.previewLink;
  // });
  API_DATA.googlebookData.title = data.items[0].volumeInfo.title;
  API_DATA.googlebookData.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
  API_DATA.googlebookData.previewLink = data.items[0].volumeInfo.previewLink;
  console.log('google book data');
  console.log(API_DATA.googlebookData);
}

function updateSearchItems (tastedive) {
  console.log(tastedive);
  console.log(tastedive.Similar);
  console.log(tastedive.Similar.Info);
  // Grabbing the information of the book
  tastedive.Similar.Info.forEach(function similarThings (searchItem) {
    const name = searchItem.Name;
    const description = searchItem.wTeaser;
    const wikiUrl = searchItem.wUrl;
    $('#best-seller-titles').append(`
        
        <p>name of book is: ${name}</p>
        <p>description is: ${description}</p>
        <p><a href="${wikiUrl}">Wikipedia Link</a></p>
      `);
  });

  // Let's grab all of the recommendations for here
  // this is a direct copy and paste... make a function later
  tastedive.Similar.Results.forEach(function resultsRec (rec) {
    const name = rec.Name;
    const description = rec.wTeaser;
    const wikiUrl = rec.wUrl;
    $('#best-seller-titles').append(`

        <p>name of book is: ${name}</p>
        <p>description is: ${description}</p>
        <p><a href="${wikiUrl}">Wikipedia Link</a></p>
      `);
  });
}

function resetFields (userSearch) {
  userSearch.val('');
  $('#best-seller-titles').empty();
}

function updateBestSellers (nytimesBestSellers) {
  nytimesBestSellers.results.books.forEach(function bestSellerBook (book) {
    // This isbn is unreliable when using with google api
    // const isbn = book.isbns[0].isbn10;
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

$(() => {
  initPage();
  handleForm();
});
