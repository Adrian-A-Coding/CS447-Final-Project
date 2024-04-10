const petFoods = {
    dogs: {
        safeFoods: ["carrots", "apples", "rice"],
        unsafeFoods: ["chocolate", "grapes", "onions"]
    },
    cats: {
        safeFoods: ["fish", "chicken", "pumpkin"],
        unsafeFoods: ["onions", "garlic", "lavender"]
    },
    rabbits: {
        safeFoods: ["carrots", "lettuce", "apples"],
        unsafeFoods: ["grains", "seeds", "corn"]
    },
    birds: {
        safeFoods: ["apples", "bananas", "carrots"],
        unsafeFoods: ["avocado", "chocolate", "caffeine"]
    },
    rats: {
        safeFoods: ["broccoli", "carrots", "apples"],
        unsafeFoods: ["blue cheese", "raw beans", "green bananas"]
    },
    hamsters: {
        safeFoods: ["carrots", "apples", "peas"],
        unsafeFoods: ["almonds", "citrus fruits", "raw potatoes"]
    },
    fish: {
        safeFoods: ["bloodworms", "brine shrimp", "daphnia"],
        unsafeFoods: ["bread", "human food", "processed food"]
    },
    ferrets: {
        safeFoods: ["chicken", "turkey", "lamb"],
        unsafeFoods: ["grains", "fruits", "vegetables"]
    }
};

function checkFood() {
    const pet = document.getElementById("petSelect").value;
    const food = document.getElementById("foodInput").value.toLowerCase();
    
    if (!petFoods[pet]) {
        alert("Pet not found in our database.");
        return;
    }

    if (petFoods[pet].safeFoods.includes(food)) {
        document.getElementById("safeList").innerHTML += `<li>${food}</li>`;
    } else if (petFoods[pet].unsafeFoods.includes(food)) {
        document.getElementById("unsafeList").innerHTML += `<li>${food}</li>`;
    } else {
        alert("Food not found in our database for this pet.");
    }
}