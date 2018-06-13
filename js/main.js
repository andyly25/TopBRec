const nytimesKey = config.NYT_KEY;
const googleBooksKey = config.GOOGLE_BOOKS_KEY;

function initPage () {
  fetch(`https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=${nytimesKey}`, {
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
      console.log('NYT API Error: Search not found');
    });
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
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${googleBooksKey}`, {
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

$(initPage);
