const API_KEY = '9200bc187c7769f7a835ae8efc92ed40';
const BASE_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
const BASE_API_PATH = 'https://api.themoviedb.org/3';

let movies = [];
let movieElements = [];
let genres = [];

function fetchGenres() {
    fetch(`${BASE_API_PATH}/genre/movie/list?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
        genres = data.genres;
        console.log(genres );
    });
}

function fetchMovies() {
    fetch(`${BASE_API_PATH}/discover/movie?api_key=${API_KEY}&append_to_response=genres`)
    .then((response) => {
        if (!response.ok) {
            // Not Found
            return;
        }

        return response.json();
    })
    .then((data) => {
        movies = data.results;
        console.log(movies);
        renderMoviesList();
    })
}

function searchMovie(event) {
    event.preventDefault();

    const searchKeyword = document.getElementById('search-input').value;
    console.log(searchKeyword);
    fetchMovieWithKeyword(searchKeyword);
}

function getGenre(genreIds) {
    let targetGenres = '';
    genreIds.forEach(id => {
        const targetGenre = genres.find(g => g.id === id); 
        targetGenres += targetGenre.name + ', ';
    });
    
    return targetGenres;
}

function terminateOverview(overview) {
    return overview.substring(0, 100) + ' ...';
}

function renderMovie(movie) {
    return `
    <div id="movie">
        <div class="movie-img">
            <img src="${BASE_IMAGE_PATH}${movie['poster_path']}" alt="${movie['original_title']}" />
        </div>
        <div class="movie-content">
            <p class="movie-title" id="movie-title">${movie.title}</p>
            <p class="movie-category" id="movie-category">${terminateOverview(movie.overview)}</p>
            <div class="movie-genre-container">
                <p id="movie-genre">${getGenre(movie['genre_ids'])}</p>
            </div>
        </div>
    </a>
    
    `
}

function renderMoviesList() {
    const movieListDiv = document.getElementById('list');
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = renderMovie(movie);
        div.addEventListener('click', () => {
            localStorage.setItem('movieId', movie.id);
            location.href = './movie-detail/index.html';
        })
        movieListDiv.appendChild(div);
    });
}

window.onload = () => {
    fetchGenres();
    fetchMovies();
}



