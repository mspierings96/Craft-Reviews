function citySearch(event) {
  event.preventDefault();
  let searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase()
    .replace(/ /g, "_");

  window.location.href = "/results/" + searchTerm;

  getID = (data) => {
    const arrLength = data.length;
    const newData = [];
    for (i = 0; i < arrLength; i++) {
      newData.push(data[i].id);
    }
    return newData;
  };
}
