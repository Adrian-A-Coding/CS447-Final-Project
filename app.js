document.getElementById('foodForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetch(`http://localhost:3000/food?ingredients=${encodeURIComponent(ingredients)}`)
        .then(response => {
            console.log(response); // Check the raw response
            return response.json();
        })
        .then(data => {
            console.log(data);
            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = ''; // Clear previous results
            data.forEach(item => {
                const element = document.createElement('p');
                element.textContent = item.name; // Assuming the API returns an array of items with a 'name' property
                resultsElement.appendChild(element);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
