function search() {
  $("#result").html("");
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "fd96977a",
      s: $("#search-input").val(),
    },

    success: function (result) {
      let res = result.Search;

      if (result.Response == "True") {
        let movie = result.Search;

        $.each(movie, function (i, data) {
          $("#result").append(
            `<div class="col">
                <div class="card mb-4" style="width: 18rem;">
                    <img src="` +
              data.Poster +
              `" class="card-img-top img-thumbnail" style="height: 22rem;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">` +
              data.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary text-capitalize ">` +
              data.Type +
              `</h6>
              <h6 class="card-subtitle mb-2 text-body-secondary">` +
              data.Year +
              `</h6>
              <a href="#" class="btn btn-primary detail" data-id="` +
              data.imdbID +
              `">Go somewhere</a>
                        </div>
                </div>
            </div>

                `
          );
        });
      } else {
        $("#result").html(`
            <h1 class='text-center'>Movie not found!</h1>"
        `);
      }
    },
  });
}

$("#search-button").on("click", function () {
  search();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    search();
  }
});

$("#result").on("click", ".detail", function (e) {
  console.log($(this).data("id"));
});
