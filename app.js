let movieNameRef = $("#movie-name");
let searchBtn = $("#search-btn");
let result = $("#result");

const key = 'd9dcbb37';

// API'den veri çekme fonksiyonu
let getMovie = () => {
  let movieName = movieNameRef.val();
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // Eğer giriş alanı boş değilse
  if (movieName.trim() !== "") {
    $.ajax({
      url: url,
      method: "GET",
      success: (data) => {
        // Eğer film veritabanında varsa
        if (data.Response == "True") {
          result.html(`
            <div class="info">
                <img src="${data.Poster}" class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img style="width: 16px;" src="star.png">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Topic:</h3>
            <p>${data.Plot}</p>
            <h3>Actors:</h3>
            <p>${data.Actors}</p>
          `);
        }
        // Eğer film veritabanında yoksa
        else {
          result.html(`<h3 class='msg'>${data.Error}</h3>`);
        }
      },
      // Eğer hata oluşursa
      error: () => {
        result.html(`<h3 class="msg">Hata Oluştu</h3>`);
      },
    });
  }
};

searchBtn.on("click", getMovie);
$(window).on("load", getMovie);