// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies(){
    // the endpoint
    let url = "https://api.themoviedb.org/3/movie/popular?"
    let specif = "language=en-US";
    let key = "b155647c941ecf398cc3950556c2b9cb";
    let endpoint = `${url}api_key=${key}&${specif}`;
    // the place on the page where we'll display the movies
    let popularMovies = document.getElementById("popular");
    let imgUrl = "https://image.tmdb.org/t/p/w400";


    // ajax time!
    // create the object
    let xhr = new XMLHttpRequest();

    // attach event handlers
    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === this.DONE){
            // get JSON response and output to console
            // let json = JSON.parse(this.response);
            let json = this.response;
            console.log(json);

            // create output string
            let html = "";
            
            html += `
            <section id="featured">
                <h3>${json.results[0].title}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>"${json.results[0].overview}"</p>
            </section>`;

            for (let i = 1; i < 10; i++){
                html += `
                <section class="movie">
                    <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                    <div>
                        <h3>${json.results[i].title}</h3>
                        <p>${json.results[i].overview}
                            <span class="vote">Vote Average: ${json.results[i].vote_average}</span>
                        </p>
                    </div>
                </section>`
            }

            // add string to page
            popularMovies.innerHTML = html;
        }
    });

    // set the response type
    xhr.responseType = "json";
    // open the request
    xhr.open("GET", endpoint);

    // send the request
    xhr.send();
}

// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie
function getBirthYearMovies(e){
    e.preventDefault();

    // Get the user's input/year value
    let year = encodeURI(document.querySelector("#userYear").value);
    // the place on the page where we'll add the movies
    let birthYearMovies = document.getElementById("birthYear");

    if(year < 1940 || year > 2025 || year == ""){
        birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2025</p>`;
    }else{
        // TO DO - Build the endpoint we need (this one has additional parameters)
        let url = "https://api.themoviedb.org/3/discover/movie?"
        let specif = `include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`
        let key = "b155647c941ecf398cc3950556c2b9cb"
        let endpoint = `${url}api_key=${key}&${specif}`
        let imgUrl = "https://image.tmdb.org/t/p/w400";
        // console.log(endpoint);

        // ajax time!
        // create the object
        let xhr = new XMLHttpRequest();

        // attach event handlers
        xhr.addEventListener("readystatechange", function(){
            // init JSON response and log
            let json = this.response;
            console.log(json);

            // init output string
            let html = "";

            let counter = 0;
            for(let i = 0; counter < 6; i++){
                if(json.results[i].poster_path === ""){
                    continue;
                }else{
                    html += `
                    <section class="yrMovie">
                        <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                        <h3>${json.results[i].title}</h3>
                    </section>`; 
                    counter++;
                }
            }

            // add results to screen
            birthYearMovies.innerHTML = html;
        })
        
        // set the response type
        xhr.responseType = "json";
        // open the request
        xhr.open("GET", endpoint);
        // attach the headers (optional)

        // send the request
        xhr.send();
    }
}

window.addEventListener("load", function(){
    getPopularMovies();
    document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});
