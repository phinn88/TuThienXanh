// let postsData = JSON.parse([ {"title": "","link": "","image": "","keywords": [""] }]);
let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

// fetch("../data/tintuc.json")
// // .then((json) => console.log(json))
// .then((json) => {
//     console.log(json);
//     let abc=JSON.parse(json);
//     console.log(abc)
//     console.log(typeof(json));
//     // postsData = json;
//     // console.log(postsData);
//     // console.log(postsData[0])
//     // console.log(typeof(postsData));
//     // postsData.map((post) => createPost(post));
// });
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
            postsData=data
            console.log("postsData1",postsData)
            // postsData.map((post) => createPost(post));
        })
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}

postsData=fetchJSONData();
console.log("fetch JSON DATA",fetchJSONData());
console.log("postsData",postsData)
// console.log("type of ",typeof(postsData))
// postsData.map((post) => createPost(post));

const createPost = (postData) => {
    const { title, link, image, keywords } = postData;
    const post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
        <a class="post-preview" href="${link}" target="_blank">
          <img class="post-image" src="${image}">
        </a>
        <div class="post-content">
          <p class="post-title">${title}</p>
          
        </div>
    `;
    postsContainer.append(post);
  };
  
const handleSearchPosts = (query) => {
    const searchQuery = query.trim().toLowerCase();
    
    if (searchQuery.length <= 1) {
      resetPosts()
      return
    }
    
    let searchResults = [...postsData].filter(
      (post) =>
        post.keywords.some((category) => category.toLowerCase().includes(searchQuery)) ||
        post.title.toLowerCase().includes(searchQuery)
    );
    
    if (searchResults.length == 0) {
      searchDisplay.innerHTML = "No results found"
    } else if (searchResults.length == 1) {
      searchDisplay.innerHTML = `1 result found for your query: ${query}`
    } else {
      searchDisplay.innerHTML = `${searchResults.length} results found for your query: ${query}`
    }
  
    postsContainer.innerHTML = "";
    searchResults.map((post) => createPost(post));
};
  
const resetPosts = () => {
    searchDisplay.innerHTML = ""
    postsContainer.innerHTML = "";
    // postsData.map((post) => createPost(post));
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
      debounce(() => handleSearchPosts(query), 500);
    },
    false
);
  