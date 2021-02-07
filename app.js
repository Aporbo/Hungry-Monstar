function getMeal() {
    let searchTxt = document.getElementById('searchInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`)
        .then(res => res.json())
        .then(data => {
            let text = "";
            if (data.meals) {
                // <h4></h4>
                data.meals.forEach(meal => {
                    text += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <h6>${"to view recipe click on food"}</h6>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                text = "Sorry, we didn't find any meal!☹️☹️☹️ ";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = text;
        });
}
function mealRecipe(recipe) {
    recipe.preventDefault();
   
        let mealItem = recipe.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => modal(data.meals));
            console.log();
    }
function modal(info) {
    console.log(info);
    info = info[0];
    let text = `
    <div class = "recipe-meal-img">
            <img src = "${info.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${info.strMeal}</h2>
        
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <ul>${info.strInstructions}</ul>
        </div>
    `;
    mealDetailsContent.innerHTML = text;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMeal);
mealList.addEventListener('click', mealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});