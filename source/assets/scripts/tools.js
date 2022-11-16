function getShowsFromStorage() {
    return JSON.parse(localStorage.getItem('shows')) || [];
}

function saveShowsToStorage(shows){
    localStorage.setItem('shows',JSON.stringify(shows));
}

export {getShowsFromStorage};
export {saveShowsToStorage};
