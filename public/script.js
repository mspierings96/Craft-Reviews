function citySearch(event) {
  event.preventDefault();
  let searchTerm = document.getElementById("search-input").value
    .toLowerCase().replace(/ /g,"_");

  if(!searchTerm) console.log("No Search Term");
  
//   window.location.href = "/results"
  let url = `https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=${searchTerm}`;

    fetch(url).then(
      function(response){
          if(response.status !== 200){
              console.log(`Looks like there was a problem. Status Code: ${response.status}`)
              return;
          }

          response.json().then(function(data){
              const idArr = getID(data);
              console.log(idArr);
          })
      }
  );

  getID = (data) => {
      const arrLength = data.length;
      const newData = []
      for(i = 0; i < arrLength; i++) {
          newData.push(data[i].id)
      };
      return newData;
  };

//   fetch("https://api.openbrewerydb.org/breweries/15067").then(
//       function(response){
//           if(response.status !== 200){
//               console.log(`Looks like there was a problem. Status Code: ${response.status}`)
//               return;
//           }

//           response.json().then(function(data){
//               console.log(`
//               Name: ${data.name}
//               City: ${data.city}
//               Website: ${data.website_url}
//               `)
//           })
//       }
//   )
  console.log(searchTerm);
}