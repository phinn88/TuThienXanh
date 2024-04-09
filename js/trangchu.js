const search = document.getElementById("search");
let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};
search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);
const handleSearchPosts = (query) => {
    const searchQuery = query.trim().toLowerCase();
    
    if (searchQuery.length <= 1) {
      return
    }
  }
