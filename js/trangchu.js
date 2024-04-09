// let postsData = JSON.parse([ {"title": "","link": "","image": "","categories": [""] }]);
let postsData = "";
const postsContainer = document.querySelector(".posts-container");
const searchDisplay = document.querySelector(".search-display");

fetch("../data/tintuc.json")
// .then((json) => console.log(json))
.then((json) => {
    console.log(json);
    console.log(typeof(json));
    postsData = json;
    console.log(postsData);
    console.log(postsData.title)
    console.log(typeof(postsData));
    // postsData.map((post) => createPost(post));
});
