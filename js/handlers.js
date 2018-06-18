// #1 initial function.
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
    console.log('submit search is: ', userSearch);
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

function handleHomeBtnPressed () {
  $('#best-seller-titles').on('click', '.homeBtn', () => {
    $('#best-seller-titles').empty();
    initPage();
  });
}

$(document).on('click', '.show-hide', () => {
  $('.book-desc').toggleClass('hidden-content');
  $('.show-hide').val($('.show-hide').val() === 'Show' ? 'Hide' : 'Show');
  // console.log("hellow");
});

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
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});