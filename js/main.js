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
      updateBestSellers(json);
      // console.log(json);
    })
    .catch((error) => {
      // in the case of hitting the rate limit... we'll use an archive
      // 1000 calls allowed only
      // console.log(`NYT API Error: Search not found: ${error}`);
      updateBestSellers(nytimesArchive);
    });
}

function handleForm () {
  const bookSearchForm = $('form[name=book-search');
  const searchInput = $('input[name=user-input');
  let option = $('#searchField').find('option:selected').val();
  // console.log(option);
  $('#searchField').change(function () {
    option = $(this).find('option:selected').val();
    // console.log(option);
  });

  bookSearchForm.on('submit', (e) => {
    e.preventDefault();
    // get user values inputted
    let userSearch = searchInput.val();
    userSearch = userSearch.replace(/\s+/g, '+').toLowerCase();
    // reset the input
    resetFields(searchInput);

    // fetch data based on user input using google api and tastedive
    // fetchBookData(option, userSearch);
    googleAjax(option, userSearch);
  });
}

function tastediveAjax (searchTerm) {
  console.log(`testing to see if spaces in searchTerm messes things up ${searchTerm}`);
  // for mulitple words, the spaces needs to turn into +
  // const tasteSearchterm = searchTerm.replace(/\s+/g, '+').toLowerCase();
  // const tasteSearch = toTitleCase(searchTerm);

  // Need to figure out how to get around CORS for tastedive
  const dataTastedive = {
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
      console.log('ajax of TD');
      console.log(API_DATA.tastedive);
    }
  }).then(() => {
    updateSearchItems(API_DATA.tastedive);
  });
}

function googleAjax (option, searchTerm) {
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
      console.log('ajax googlebook list');
      console.log(API_DATA.googlebook);
      tastediveAjax(API_DATA.googlebookData.title);
    });
}

// function tdGoogleAjax (searchTerm) {
//   // we need to grab book data
//   // might not need success
//   const settings = {
//     url: GOOGLE_BOOKS_ENDPOINT,
//     data: {
//       q: `intitle:${searchTerm}`
//     },
//     dataType: 'json',
//     type: 'GET',
//     success: function (data) {
//       API_DATA.googlebook = data;
//       console.log('from td google ajax');
//       // console.log(data.items);
//     }

//   };
//   $.ajax(settings)
//     .then(() => {
//       getGoogleBookData(API_DATA.googlebook);
//     });
// }

// Here we'll grab google book data to return relevant information for tastedive to use
function getGoogleBookData (data) {
  // console.log('inside getgooglebookdata');
  // console.log(data);
  API_DATA.googlebookData.title = data.items[0].volumeInfo.title;
  API_DATA.googlebookData.thumbnail = data.items[0].volumeInfo.imageLinks.thumbnail;
  API_DATA.googlebookData.previewLink = data.items[0].volumeInfo.previewLink;
  console.log('google book data');
  console.log(API_DATA.googlebookData);
}

function updateSearchItems (tastedive) {
  const tastediveSimilar = tastedive.Similar.Info[0];
  tastediveResults(tastediveSimilar);

  // Let's grab all of the recommendations for here
  // this is a direct copy and paste... make a function later
  tastedive.Similar.Results.forEach(function resultsRec (rec) {
    // console.log('WRECK IT RALPH');
    // console.log(rec);
    // Let's make a new data set for each individuals
    tastediveResults(rec);
  });
}

function tastediveResults (searchItem) {
  const name = searchItem.Name;
  // tdGoogleAjax(name);
  const description = searchItem.wTeaser;
  const wikiUrl = searchItem.wUrl;
  // $('#best-seller-titles').append(`
  //     <p>title: ${name}</p>
  //     <p>
  //       <img src="${API_DATA.googlebookData.thumbnail}" alt="book: ${name}">
  //     </p>
  //     <p>description: ${description}</p>
  //     <p><a href="${wikiUrl}">Wikipedia Link</a></p>
  // `);
  otherBooks(name, description, wikiUrl);
}

function otherBooks (name, description, wikiUrl) {
  fetch(`${GOOGLE_BOOKS_ENDPOINT}?q=intitle:${name}`, {
    method: 'get'
  })
    .then((response) => {
      console.log('response:' + response);
      return response.json();
    })
    .then((data) => {
      // console.log(`SighhHHHHHHHHHH: ${data.items[0].volumeInfo.imageLinks.thumbnail}`);
      $('#best-seller-titles').append(` 
        <p>title: ${name}</p>
        <p>
          <img src="${data.items[0].volumeInfo.imageLinks.thumbnail}" alt="book: ${name}">
        </p>
        <p>description: ${description}</p>
        <p><a href="${wikiUrl}">Wikipedia Link</a></p>
    `);
    })
    .catch((error) => {
      console.log(error);
      console.log('Google API Error');
    });
}

function resetFields (userSearch) {
  userSearch.val('');
  $('#best-seller-titles').empty();
}

function updateBestSellers (nytimesBestSellers) {
  nytimesBestSellers.results.books.forEach(function bestSellerBook (book) {
    // This isbn is unreliable when using with google api
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
