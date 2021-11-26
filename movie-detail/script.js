const API_KEY = '9200bc187c7769f7a835ae8efc92ed40';
const BASE_IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
const BASE_API_PATH = 'https://api.themoviedb.org/3';

let movie = {};

function fetchMovieDetail(movieId) {
    fetch(`${BASE_API_PATH}/movie/${movieId}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        movie = data;
        renderMovie();
    });
}

function renderMovie() {
    const posterElm = document.getElementById('poster');
    posterElm.src = `${BASE_IMAGE_PATH}${movie['poster_path']}`;
    posterElm.alt = `${movie['title']}`;
    document.getElementById('title').innerText = movie.title;
    document.getElementById('overview').innerText = movie.overview;
    document.getElementById('genre').innerText = getGenres();
    document.getElementById('revenue').innerText += ' ' + movie.revenue;
    document.getElementById('release').innerText += ' ' + movie['release_date'];
    document.getElementById('runtime').innerText += ' ' + movie.runtime + ' mins';
    if (!movie.homepage) {
        document.getElementById('visit_btn').style.visibility = 'hidden';
        return;
    }
    document.getElementById('visit_btn').href = movie.homepage;
}

function getGenres() {
    let targetGenres = '';
    movie.genres.map((genre) => {
        targetGenres += genre.name + ', ';
    })
    
    return targetGenres;
}


window.onload = () => {
    const movieId = localStorage.getItem('movieId');
    fetchMovieDetail(movieId);
}