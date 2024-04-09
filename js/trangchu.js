// let articlesData = JSON.parse([ {"title": "","link": "","image": "","keywords": [""] }]);
let articlesData = "";
const articlesContainer = document.querySelector(".articles-container");
const searchResultText = document.querySelector(".search-result-text");
$(".search-container").hide()

function fetchJSONData() {
    fetch("../data/tintuc.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("dat",data)
            articlesData=data
            console.log("articlesData1",articlesData)
            // articlesData.map((article) => createArticle(article));
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}

articlesData=fetchJSONData();
console.log("fetch JSON DATA",fetchJSONData());
console.log("articlesData",articlesData)
// console.log("type of ",typeof(articlesData))
// articlesData.map((article) => createArticle(article));

const createArticle = (articleData) => {
    const { title, link, image, keywords } = articleData;
    const article = document.createElement("div");
    article.className = "article";
    article.innerHTML = `
        <a class="article-preview" href="${link}" target="_blank">
            <div class="article-content">
                <p class="article-title">${title}</p>
            </div>
          <img class="article-image" src="${image}">
        </a>
    `;
    articlesContainer.append(article);
  };
  
const handleSearchArticles = (query) => {
    const searchQuery = query.trim().toLowerCase();
    
    if (searchQuery.length <= 1) {
      resetArticles()
      return
    }
    
    let searchResults = [...articlesData].filter(
      (article) =>
        article.keywords.some((category) => category.toLowerCase().includes(searchQuery)) ||
        article.title.toLowerCase().includes(searchQuery)
    );
    
    if (searchResults.length == 0) {
      searchResultText.innerHTML = "Không tìm thấy được kết quả nào"
    } else if (searchResults.length == 1) {
      searchResultText.innerHTML = `Tìm thấy được 1 kết quả: ${query}`
    } else {
      searchResultText.innerHTML = `${searchResults.length} kết quả tìm thấy được: ${query}`
    }
  
    articlesContainer.innerHTML = "";
    searchResults.map((article) => createArticle(article));
};
  
const resetArticles = () => {
    searchResultText.innerHTML = ""
    articlesContainer.innerHTML = "";
    // articlesData.map((article) => createArticle(article));
  };
  
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
      debounce(() => handleSearchArticles(query), 500);
    },
    false
);
function OnSearchFocus(){
    // document.getElementById("hide-on-search-focus").style.display="none";
    // document.getElementsyId("hide-on-search-focus").style.display="none";
    $(".search-container").show()
    $(".search-icon fa-solid fa-magnifying-glass").hide()
}
function OnSearchFocusOut(){
    $(".search-container").hide("slow","swing")
    $(".search-icon fa-solid fa-magnifying-glass").show()
}
  