// handles submition of user search
function handleSubmit () {
  const bookSearchForm = $('form[name=book-search]');
  const searchInput = $('input[name=user-input]');

  bookSearchForm.on('submit', (e) => {
    e.preventDefault();
    // get user values inputted
    let userSearch = searchInput.val();
    // reset the input
    resetSearchFields(searchInput);

    // Loading spinner here
    renderSpinner();

    // fetch data based on user input using google api
    // we need to convert user input into a book title
    // console.log('submit search is: ', userSearch);
    getTastediveApiData(userSearch);
  });
}

// When user clicks logo, bring back the home page
function handleLogoPressed () {
  $('header').on('click', '#nyt-logo', (event) => {
    $('#best-seller-titles').empty();
    initPage();
  });
}

// This waits for user to select which genre and then we store its value to use
$(document).ready(function () {
  $(document).on('change', '#select-genre', function () {
    genre = $(this).find('option:selected').val();
    console.log(genre);
  });
});

// This handles the genre select section under the search
function handleGenreChange () {
  $('form[name=genre-change]').on('submit', function (e) {
    e.preventDefault();
    NYT_BOOKS_ENDPOINT = `https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json`;
    renderSpinner();
    initPage();
  });
}

// This button appears when you enter a search term tastedive did not find
function handleHomeBtnPressed () {
  $('#best-seller-titles').on('click', '.homeBtn', () => {
    $('#best-seller-titles').empty();
    initPage();
  });
}

function handleShowHide () {
  // https://coderwall.com/p/wxjljq/jquery-find-and-closest-are-your-best-friends
  $('main').on('click', '.show-hide', (event) => {
    // console.log($(event.target).val());
    $(event.target).val($(event.target).val() === 'Show Description' ? 'Hide Description' : 'Show Description');
    $(event.target).closest('.recommend-entry').find('.hidden-content').toggle('slow');
  });
}

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
  // https://howchoo.com/g/yjfjmty1zjb/how-to-animate-scroll-in-jquery
  $('HTML, BODY').animate({ scrollTop: 0 }, 1000);
});

function handleIziModal () {
  $('.iziModal').iziModal({
    width: 700,
    radius: 5,
    padding: 20,
    group: 'products',
    loop: true
  });
}
