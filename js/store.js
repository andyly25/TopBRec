const nytimesKey = config.NYT_KEY;
// const googleBooksKey = config.GOOGLE_BOOKS_KEY;
const tastediveKey = config.TASTEDIVE_KEY;
// giving more options on home page with genre
let genre = 'hardcover-fiction';
let NYT_BOOKS_ENDPOINT = `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json`;
const GOOGLE_BOOKS_ENDPOINT = 'https://www.googleapis.com/books/v1/volumes';
const TASTEDIVE_BOOKS_ENDPOINT = 'https://tastedive.com/api/similar';

const API_DATA = {
  tastedive: null
};

// Open modal at start
let openModal = 0;
