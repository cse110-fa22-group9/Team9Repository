// Binding initialization function to document listener
window.addEventListener('DOMContentLoaded', init);

// input: None
// Output: None
// Operations: when the user click the submit button, insert new movie into local storage
// by calling initFormHandler()
function init() {
    let movies = getMoviesFromStorage();
    initFormHandler();
}

// input
function initFormHandler() {
    const formSelector = document.getElementById('new-movie');
    const submitSelector = document.querySelector("[type='submit']");
    submitSelector.addEventListener("click", createRecipe);
    function createRecipe() {
      const formData = new FormData(formSelector);
      let recipeObject = {};
      for (const [key, value] of formData) {
        recipeObject[key] = value;
      }
      const mainSelector = document.querySelector("main");
      let newRecipe = document.createElement('recipe-card');
      newRecipe.data = recipeObject;
      mainSelector.append(newRecipe);
  
      let recipes = getRecipesFromStorage();
      recipes.push(recipeObject);
      saveRecipesToStorage(recipes);
    }

}