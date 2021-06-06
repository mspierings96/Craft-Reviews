const router = require("express").Router();

function citySearch() {
  event.preventDefault();
  const searchTerm = document.getElementById("search-input").value
    .toLowerCase().replace(/ /g,"_");

  if(!searchTerm) return console.log("No Search Term");
  console.log(searchTerm);
}

// $("#search-button").click(function(){
//   event.preventDefault();
//   citySearch = $("#search-input").val();

//   if(!$("#search-input").val()){
//     return console.log("No Value");
//   };

//   cityQuery = citySearch.toLowerCase().replace(/ /g,"_");
//   console.log(cityQuery);
// });

module.exports = {router, }