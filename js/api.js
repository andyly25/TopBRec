// function to grab NYT API data
function getNytApiData () {
  fetch(`${NYT_BOOKS_ENDPOINT}?&api-key=${nytimesKey}`, {
    method: 'get'
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      updateBestSellers(json);
    })
    .catch((error) => {
      // in the case of hitting the rate limit... we'll use an archive
      // 1000 calls allowed only
      console.log(`NYT API Error: Search not found: ${error}`);
      updateBestSellers(nytimesArchive);
    });
}

// #2 get tastedive data
function getTastediveApiData (searchTerm) {
  // data sent to ajax
  const dataTastedive = {
    k: tastediveKey,
    q: searchTerm,
    type: 'books',
    limit: 10,
    info: 1
  };

  // Our ajax call
  // adding in jsonp helped resolve No 'Access-Control-Allow-Origin'
  $.ajax({
    type: 'GET',
    url: TASTEDIVE_BOOKS_ENDPOINT,
    jsonp: 'callback',
    dataType: 'jsonp',
    data: dataTastedive,
    success: (data) => {
      API_DATA.tastedive = data;
      getGoogleApiData();
    }
  });
}

// #3 get google api data
function getGoogleApiData () {
  const resultsArrayTD = API_DATA.tastedive.Similar.Results;
  // check to see if array is empty (no results found)
  if (resultsArrayTD.length === 0) {
    errorMessage();
    // end early if search term not found
    return;
  }

  // here we make an array to store promises
  // this will make sure we receive all data necessary before continuing on
  const infoArray = API_DATA.tastedive.Similar.Info[0];
  // Usage of spread operator to allow array to expand without usage of
  // splice, concat etc..., this adds our results array into our info array
  const arr = [infoArray, ...API_DATA.tastedive.Similar.Results];
  // we create promises by mapping getBookData function onto each array element
  const promises = arr.map(getBookData);

  // When all promises are fulfilled we can finally start displaying search results
  Promise.all(promises)
    .then((books) => {
      displayUserSearchResult(books);
    });

  // toggle off load screen if done
  $('.loader-wrapper').toggleClass('loaded');
}

function getBookData (searchTerm) {
  // without the + to replace spaces, we will have different book results
  const correctSearchTerm = searchTerm.Name.replace(/\s+/g, '+');
  return fetch(`${GOOGLE_BOOKS_ENDPOINT}?q=intitle:${correctSearchTerm}&maxResults=1`)
    .then((response) => {
      return response.json();
    })
    // Object.assign used to copy values of all enumerable own properties from 1 or more
    // source objects to a target object. Here we add new key/values into each bookdata
    // and replace any of the old key.values with the new matching key.value
    .then(data => Object.assign(data, searchTerm))
    .catch((error) => {
      console.log(error);
    });
}
