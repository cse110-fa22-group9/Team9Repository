function getShowsFromStorage() {
    return JSON.parse(localStorage.getItem('shows')) || [];
}

function saveShowsToStorage(shows){
    localStorage.setItem('shows',JSON.stringify(shows));
}

function getIDFromStorage(){
    let id = parseInt(localStorage.getItem('ID')) || 0;
    localStorage.setItem('ID',JSON.stringify(id+1));
    return id;
}

export {getShowsFromStorage};
export {saveShowsToStorage};
export {getIDFromStorage};
