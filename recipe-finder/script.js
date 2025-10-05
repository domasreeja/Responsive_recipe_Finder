// Recipe database with various recipes
const recipeDatabase = [
  {
    id: 1,
    title: "Classic Chicken Pasta",
    ingredients: ["chicken", "pasta", "garlic", "cream", "parmesan"],
    time: "30 min",
    servings: "4",
    description: "A creamy and delicious pasta dish with tender chicken pieces, perfect for a quick weeknight dinner.",
    image: "/creamy-chicken-pasta-dish.jpg",
  },
  {
    id: 2,
    title: "Tomato Basil Soup",
    ingredients: ["tomatoes", "basil", "onion", "garlic", "cream"],
    time: "25 min",
    servings: "4",
    description: "Rich and comforting tomato soup with fresh basil, ideal for a cozy meal.",
    image: "/tomato-basil-soup-bowl.jpg",
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    ingredients: ["broccoli", "carrots", "bell pepper", "soy sauce", "ginger"],
    time: "20 min",
    servings: "3",
    description: "Quick and healthy stir-fried vegetables with a savory Asian-inspired sauce.",
    image: "/colorful-vegetable-stir-fry.png",
  },
  {
    id: 4,
    title: "Beef Tacos",
    ingredients: ["beef", "tortillas", "lettuce", "cheese", "tomatoes"],
    time: "25 min",
    servings: "4",
    description: "Flavorful beef tacos with fresh toppings, a crowd-pleasing favorite.",
    image: "/beef-tacos-with-toppings.jpg",
  },
  {
    id: 5,
    title: "Mushroom Risotto",
    ingredients: ["rice", "mushrooms", "onion", "parmesan", "white wine"],
    time: "40 min",
    servings: "4",
    description: "Creamy Italian risotto with earthy mushrooms and rich parmesan cheese.",
    image: "/creamy-mushroom-risotto.jpg",
  },
  {
    id: 6,
    title: "Greek Salad",
    ingredients: ["cucumber", "tomatoes", "feta", "olives", "olive oil"],
    time: "15 min",
    servings: "4",
    description: "Fresh and vibrant Mediterranean salad with crisp vegetables and tangy feta.",
    image: "/fresh-greek-salad.jpg",
  },
  {
    id: 7,
    title: "Salmon with Lemon",
    ingredients: ["salmon", "lemon", "garlic", "butter", "dill"],
    time: "20 min",
    servings: "2",
    description: "Pan-seared salmon with a bright lemon butter sauce and fresh herbs.",
    image: "/grilled-salmon-with-lemon.jpg",
  },
  {
    id: 8,
    title: "Chicken Curry",
    ingredients: ["chicken", "curry powder", "coconut milk", "onion", "tomatoes"],
    time: "35 min",
    servings: "4",
    description: "Aromatic and flavorful curry with tender chicken in a creamy coconut sauce.",
    image: "/chicken-curry-with-rice.png",
  },
  {
    id: 9,
    title: "Margherita Pizza",
    ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
    time: "30 min",
    servings: "2",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and fragrant basil.",
    image: "/margherita-pizza.png",
  },
  {
    id: 10,
    title: "Egg Fried Rice",
    ingredients: ["rice", "eggs", "peas", "carrots", "soy sauce"],
    time: "15 min",
    servings: "3",
    description: "Quick and satisfying fried rice with scrambled eggs and mixed vegetables.",
    image: "/egg-fried-rice.png",
  },
  {
    id: 11,
    title: "Caprese Sandwich",
    ingredients: ["bread", "mozzarella", "tomatoes", "basil", "balsamic"],
    time: "10 min",
    servings: "2",
    description: "Fresh Italian-style sandwich with creamy mozzarella and ripe tomatoes.",
    image: "/caprese-sandwich.jpg",
  },
  {
    id: 12,
    title: "Beef Stew",
    ingredients: ["beef", "potatoes", "carrots", "onion", "beef broth"],
    time: "90 min",
    servings: "6",
    description: "Hearty and warming stew with tender beef and root vegetables.",
    image: "/beef-stew-in-bowl.jpg",
  },
]

// State management
const userIngredients = []

// DOM elements
const ingredientInput = document.getElementById("ingredientInput")
const addIngredientBtn = document.getElementById("addIngredient")
const ingredientTagsContainer = document.getElementById("ingredientTags")
const findRecipesBtn = document.getElementById("findRecipes")
const recipesGrid = document.getElementById("recipesGrid")
const emptyState = document.getElementById("emptyState")

// Event listeners
addIngredientBtn.addEventListener("click", addIngredient)
ingredientInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addIngredient()
  }
})
findRecipesBtn.addEventListener("click", findRecipes)

// Add ingredient to the list
function addIngredient() {
  const ingredient = ingredientInput.value.trim().toLowerCase()

  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient)
    renderIngredientTags()
    ingredientInput.value = ""
    ingredientInput.focus()
  }
}

// Render ingredient tags
function renderIngredientTags() {
  ingredientTagsContainer.innerHTML = ""

  userIngredients.forEach((ingredient, index) => {
    const tag = document.createElement("div")
    tag.className = "ingredient-tag"
    tag.innerHTML = `
            <span>${ingredient}</span>
            <button onclick="removeIngredient(${index})" aria-label="Remove ${ingredient}">×</button>
        `
    ingredientTagsContainer.appendChild(tag)
  })
}

// Remove ingredient from the list
function removeIngredient(index) {
  userIngredients.splice(index, 1)
  renderIngredientTags()
}

// Find matching recipes
function findRecipes() {
  if (userIngredients.length === 0) {
    alert("Please add at least one ingredient")
    return
  }

  const matchingRecipes = recipeDatabase
    .map((recipe) => {
      const matchCount = recipe.ingredients.filter((ingredient) =>
        userIngredients.some(
          (userIng) => ingredient.toLowerCase().includes(userIng) || userIng.includes(ingredient.toLowerCase()),
        ),
      ).length

      return {
        ...recipe,
        matchCount,
        matchPercentage: Math.round((matchCount / recipe.ingredients.length) * 100),
      }
    })
    .filter((recipe) => recipe.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)

  renderRecipes(matchingRecipes)
}

// Render recipe cards
function renderRecipes(recipes) {
  recipesGrid.innerHTML = ""

  if (recipes.length === 0) {
    emptyState.classList.remove("hidden")
    emptyState.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h3>No recipes found</h3>
            <p>Try adding different ingredients to find more recipes</p>
        `
    return
  }

  emptyState.classList.add("hidden")

  recipes.forEach((recipe) => {
    const card = document.createElement("div")
    card.className = "recipe-card"
    card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time}</span>
                    <span>👥 ${recipe.servings} servings</span>
                    <span class="match-badge">${recipe.matchPercentage}% match</span>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-ingredients">
                    <h4>Ingredients</h4>
                    <ul>
                        ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `
    recipesGrid.appendChild(card)
  })
}

// Initialize with empty state
emptyState.classList.remove("hidden")
