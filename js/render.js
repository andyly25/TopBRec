// Starting off by initializing page with some of the popular fictions
function initPage () {
  $('#best-seller-titles').html(`
    <div class="loader-wrapper">
      <div class="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
  `);

  // call nyt api to grab data needed to init page
  getNytApiData();
}

// updates the book listing on home page using nytimes
function updateBestSellers (nytimesBestSellers) {
  $('#best-seller-titles').empty();
  createAboutInfo();
  // by default NYT api returns 15 results, so I only want top 10
  nytimesBestSellers.results.books.slice(0, 10).forEach((book) => {
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
  });
}

// Create intro to page so users will know what the site is about
function createAboutInfo () {
  $('#best-seller-titles').html(`
      <section id="intro-jumbotron">
        <h2>Type in a book title and receive some book recommendations above.</h2>
        <h1>OR</h1>
        <h2>View the top latest New York Times fiction below!</h2>
      </section>
    `);
}

// borrowed from https://ihatetomatoes.net/create-custom-preloading-screen/
function renderSpinner () {
  return $('#best-seller-titles').html(`
            <div class="loader-wrapper">
              <div class="loader"></div>
              <div class="loader-section section-left"></div>
              <div class="loader-section section-right"></div>
            </div>
          `);
}

// use this later to replace error messages
function errorMessage () {
  return $('#best-seller-titles').html(`
    <div class="recommend-entry">
      <p>Sorry, results were not found for this search term<p/>
      <p>Please try another book title</p>
      <input type="button" class="homeBtn" value="Return">
    </div>`);
}

// #5 display the book results based on search term
function displayUserSearchResult (books) {
  $('#best-seller-titles').html(books.map((book) => {
    // console.log('book', book);
    const bookData = book.items[0].volumeInfo;
    const placeHolderImg = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png'
    const thumbnail = bookData.imageLinks !== undefined
      ? bookData.imageLinks.thumbnail
      : placeHolderImg;
    return `
    <div class="recommend-entry">
      <p>
        <a href="${bookData.previewLink}" target="_blank">
          <img src="${thumbnail}" class="book-cover" alt="book: ${book.Name}">
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
