$("a.dropdown-item").on("click", function (event) {
  console.log($(this).text());
  console.log($(this).data("apiid"));
  axios
    .post("/api/rate/setRating", {
      apiID: $(this).data("apiid"),
      review: $(this).text(),
    })
    .then(function (response) {
      location.reload();
    });
});
