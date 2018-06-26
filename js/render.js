// Starting off by initializing page with some of the popular fictions
function initPage () {
  if (openModal === 0) {
    $('#modal-one').iziModal('open');
    openModal = 1;
  }
  renderSpinner();
  // call nyt api to grab data needed to init page
  getNytApiData();
}

// updates the book listing on home page using nytimes
function updateBestSellers (nytimesBestSellers) {
  $('#best-seller-titles').empty();
  // by default NYT api returns 15 results, so I only want top 10
  nytimesBestSellers.results.books.slice(0, 10).forEach((book) => {
    const lastWeekRank = book.rank_last_week || 'n/a';
    const weeksOnList = book.weeks_on_list || 'New this week!';
    const listing = `
      <div id="${book.rank}" class="entry" aria-live="polite" role="region">
        <p>
          <img src="${book.book_image}" class="book-cover" id="cover-${book.rank}" alt="book: ${book.title}">
        </p>
        <h2>${book.title}</h2>
        <h3>By ${book.author}</h3>
        <h4 class="publisher">Published by: ${book.publisher}</h4>
        <p>${book.description}</p>
        <h4><a href="${book.amazon_product_url}" target="_blank">Amazon link</a></h4>
        <div class="stats">
          <p>Last Week: rank ${lastWeekRank}</p>
          <p>Weeks on list: ${weeksOnList}</p>
        </div>
      </div>`;

    $('#best-seller-titles').append(listing);
    $(`#${book.rank}`).attr('nyt-rank', book.rank);
  });
}

// borrowed from https://ihatetomatoes.net/create-custom-preloading-screen/
function renderSpinner () {
  return $('#best-seller-titles').html(`
    <div class="loader-wrapper" aria-live="polite" role="region">
      <div class="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
  `);
}

// use this later to replace error messages
function errorMessage () {
  return $('#best-seller-titles').html(`
    <div class="recommend-entry" aria-live="polite" role="region">
      <p>Sorry, results were not found for this book using Tastedive api<p/>
      <p>Please try another book title</p>
      <label for="return-home"></label>
      <input id="return-home" type="button" class="homeBtn basic-border" value="Return">
    </div>`);
}

// #5 display the book results based on search term
function displayUserSearchResult (books) {
  $('#best-seller-titles').html(books.map((book) => {
    const bookData = book.items[0].volumeInfo;
    console.log(bookData);
    const placeHolderImg = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png';
    const thumbnail = bookData.imageLinks !== undefined
      ? bookData.imageLinks.thumbnail
      : placeHolderImg;
    const author = bookData.hasOwnProperty('authors')
      ? bookData.authors[0]
      : 'N/A';
    // this is to split up descriptions on their own lines
    const description = book.wTeaser.split('. ').join('. <br/><br/>');

    return `
    <div class="recommend-entry" aria-live="polite" role="region">
      <p>
        <a href="${bookData.previewLink}" target="_blank">
          <img src="${thumbnail}" class="book-cover" alt="book: ${book.Name}">
        </a>
      </p>
      <h2>
        <a href="${bookData.previewLink}" target="_blank">${book.Name}</a>
      </h2>
      <h3>By ${author}</h3>
      <h3 class="publisher">Published by: ${bookData.publisher}</h3>
      <h4 class="hidden-content book-desc">${description}</h4>
      <label for="show-hide-btn"></label>
      <input type="button" id="show-hide-btn" class="show-hide basic-border" value="Show Description">
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
