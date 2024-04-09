// const searchBox = document.querySelector('.search-box-mobile');
// const searchBtn = document.querySelector('.search-nav-bar');
// const search = document.querySelector('.search-mobile');
// const closeBtn = document.querySelector('.close-btn');

// searchBtn.addEventListener('click', function(){
//   console.log(search.classList.contains('active'));
//   if(search.classList.contains('active')){
//         search.classList.remove('active');
//         searchBox.value = '';
//   }
//   else {
//     search.classList.add('active');
//     searchBox.focus();
//   }
// })
// searchBtn.addEventListener('click', function(){
//   search.classList.remove('active');
//   searchBox.value = '';
// })
function toggleSearch() {
  var searchBox = document.querySelector('.search-box-mobile');
  if(searchBox.classList.contains('active')) {
      searchBox.classList.remove('active');
  } else {
      searchBox.classList.add('active');
      searchBox.focus(); // Đặt con trỏ vào input khi mở rộng
  }
}


