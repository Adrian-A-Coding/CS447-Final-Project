document.addEventListener('DOMContentLoaded', function() {
    const petSelect = document.getElementById("petSelect");
    const foodInput = document.getElementById("foodInput");
    const safeList = document.getElementById("safeList");
    const unsafeList = document.getElementById("unsafeList");
    const displaySafeFoods = document.getElementById("displaySafeFoods");
    const displayUnsafeFoods = document.getElementById("displayUnsafeFoods");

    // Unified data for pet foods
    const petFoods = {
        dogs: { safeFoods: ["carrots", "apples", "rice"], unsafeFoods: ["chocolate", "grapes", "onions"] },
        cats: { safeFoods: ["fish", "chicken", "pumpkin"], unsafeFoods: ["onions", "garlic", "lavender"] },
        rabbits: { safeFoods: ["carrots", "lettuce", "apples"], unsafeFoods: ["grains", "seeds", "corn"] },
        birds: { safeFoods: ["apples", "bananas", "carrots"], unsafeFoods: ["avocado", "chocolate", "caffeine"] },
        rats: { safeFoods: ["broccoli", "carrots", "apples"], unsafeFoods: ["blue cheese", "raw beans", "green bananas"] },
        hamsters: { safeFoods: ["carrots", "apples", "peas"], unsafeFoods: ["almonds", "citrus fruits", "raw potatoes"] },
        fish: { safeFoods: ["bloodworms", "brine shrimp", "daphnia"], unsafeFoods: ["bread", "human food", "processed food"] },
        ferrets: { safeFoods: ["chicken", "turkey", "lamb"], unsafeFoods: ["grains", "fruits", "vegetables"] }
    };

 // Display safe and unsafe food lists for the selected pet
 function displaySafeUnsafeLists() {
    const pet = petSelect.value;

    // Clear previous lists
    displaySafeFoods.innerHTML = '';
    displayUnsafeFoods.innerHTML = '';

    // Add safe and unsafe food items to the respective lists
    petFoods[pet].safeFoods.forEach(food => {
        displaySafeFoods.innerHTML += `<li>${food}</li>`;
    });

    petFoods[pet].unsafeFoods.forEach(food => {
        displayUnsafeFoods.innerHTML += `<li>${food}</li>`;
    });
}

// Initialize the display when the script loads
if(petSelect) {
    displaySafeUnsafeLists();
}

// Check the food item against safe and unsafe lists and call the API
function checkFoodAndQueryAPI() {
    const pet = petSelect.value;
    const query = foodInput.value.toLowerCase();

    // Build regex patterns from safe and unsafe foods
    const safeRegex = new RegExp(petFoods[pet].safeFoods.join("|"), "i");
    const unsafeRegex = new RegExp(petFoods[pet].unsafeFoods.join("|"), "i");

    // Call the API with the entered food query
    fetch(`http://localhost:3000/food?ingredients=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            safeList.innerHTML = '';
            unsafeList.innerHTML = '';

            // Assuming the API returns an array of items with a 'name' property
            data.forEach(item => {
                const itemName = item.name.toLowerCase();
                // Check against safe and unsafe food lists using regex
                if (safeRegex.test(itemName)) {
                    safeList.innerHTML += `<li>${item.name}</li>`;
                } else if (unsafeRegex.test(itemName)) {
                    unsafeList.innerHTML += `<li>${item.name}</li>`;
                }
                // Items that do not match either list will not be shown
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Event listeners
if(petSelect) {
    petSelect.addEventListener('change', displaySafeUnsafeLists);
}

if(foodInput) {
    const checkButton = document.querySelector("button");
    if(checkButton) {
        checkButton.addEventListener('click', checkFoodAndQueryAPI);
    }
}
});