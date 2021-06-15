$("a.dropdown-item").on("click", function (event) {
  axios
    .post("/api/rate/setRating", {
      apiID: $(this).data("apiid"),
      review: $(this).text(),
    })
    .then(function (response) {
      location.reload();
    });
});
