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
      // console.log(json);
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
      success: (data) => {
        API_DATA.tastedive = data;
        getGoogleApiData();
      }
    }));
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
  const arr = [infoArray, ...API_DATA.tastedive.Similar.Results];
  const promises = arr.map(getBookData);
  // console.log('promises', promises);

  // When all promises are fulfilled we can finally start displaying search results
  Promise.all(promises)
    .then((books) => {
      displayUserSearchResult(books);
    });

  // toggle off load screen if done
  $('.loader-wrapper').toggleClass('loaded');
}

function getBookData (searchTerm) {
  const correctSearchTerm = searchTerm.Name.replace(/\s+/g, '+');
  // console.log('correctSearchTerm: ', correctSearchTerm);
  return fetch(`${GOOGLE_BOOKS_ENDPOINT}?q=intitle:${correctSearchTerm}&maxResults=1`)
    .then((response) => {
      return response.json();
    })
    .then(data => Object.assign(data, searchTerm))
    .catch((error) => {
      console.log(error);
    });
}
