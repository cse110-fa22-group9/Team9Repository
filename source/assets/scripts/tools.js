function getShowsFromStorage() {
    return JSON.parse(localStorage.getItem('shows')) || [];
}

function saveShowsToStorage(shows){
    localStorage.setItem('shows',JSON.stringify(shows));
}

function getMoviesFromStorage() {
    return JSON.parse(localStorage.getItem('movies')) || [];
}

function saveMoviesToStorage(movies){
    localStorage.setItem('movies',JSON.stringify(movies));
}

export {getShowsFromStorage};
export {saveShowsToStorage};
export {getMoviesFromStorage};
export {saveMoviesToStorage};
