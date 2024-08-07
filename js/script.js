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
        console.log(result)
      let res = result.Search;
        
      if (result.Response == "True") {
        let movie = result.Search;
        $.each(movie, function (i, data) {
          $("#result").append(
            `<div class="col p-0 col-cent">
                    <div class="card mb-4" >
                        <h1 class="type">` +data.Type +`</h1>
                        <img src="` +(data.Poster == "N/A" ? "/img/img.png" : data.Poster) +`" class="object-fit-cover mb-0 card-img-top object-fit-cover ">
                        <div class="card-body"> 
                            <div class="row">
                                <h5 class="card-title text-truncate-multiline " style="height:50px;">` +data.Title +`</h5></br>
                            </div>
                                <h6 class="card-subtitle mb-2 text-body-secondary">` +data.Year +`</h6>
                                <a href="#" class="detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +data.imdbID +`">Detail</a> 
                        </div>
                    </div>
            </div>`
          );
        });
      } else {
        $("#result").html(`
            <div class="False" id="result">
            <h1 class='text-center'>Movie not found!</h1>"
            </div>
            
        `);
      }
    },
  });
}

$("#search-button").on("click", function (e) {
    $(".container-fluid").removeClass("search-active")
  });
  $("#search-input").on("keyup", function (e) {
    if (e.keyCode === 13) {
        $(".container-fluid").removeClass("search-active")
    }
  });

$("#search-button").on("click", function (e) {
  search();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    search();
    $("input").blur();
  }
});

$("#result").on("click", ".detail", function (e) {
  console.log($(this).data("id"));
  $.ajax({
    url: "http://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "fd96977a",
      i: $(this).data("id"),
    },
    success: function (e) {
        
      if (e.Response == "True") {
        $(".modal-body").html(
          `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4 d-flex justify-content-center" id="imgModal"><img src="` +(e.Poster == "N/A" ? "/img/img.png" : e.Poster) +`" class="img-fluid"></div>
                    <div class="col-md-8 " id="infoModal">
                        <div class="row justify-content-md-center">
                            
                            <ul class="list-group border p-0">
                                <li class="list-group-item fs-1">`+e.Title +`</li>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Released</li>
                                    <li class="list-group-item w-75 rounded-0">`+ e.Released +`</li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Type</li>
                                    <li class="list-group-item w-75 rounded-0">`+ e.Type +`</li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Duration</li>
                                    <li class="list-group-item w-75 rounded-0">`+(e.Type == "series" && e.Runtime !== "N/A" ? e.Runtime + " /episodes" : e.Runtime)+`</li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Genre</li>
                                    <li class="list-group-item w-75 rounded-0">`+e.Genre+`</li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Ratings</li>
                                    <li class="list-group-item w-75 rounded-0">` +e.imdbRating + ` <i class="fa-solid fa-star"></i> (IMDb)</li></li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Country</li>
                                    <li class="list-group-item w-75 rounded-0">`+e.Country+`</li>
                                </ul>
                                <ul class="list-group list-group-horizontal">
                                    <li class="list-group-item w-25 rounded-0">Synopsis</li>
                                    <li class="list-group-item w-75 rounded-0 text-">` +e.Plot+`</li>
                                </ul>
                                
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
            `
        );
      }
    },
  });
});
