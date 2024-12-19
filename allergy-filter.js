const allergyBoxes = document.querySelectorAll('.allergy-box');

allergyBoxes.forEach(box => {
    box.addEventListener('click', async () => {
        const selectedAllergy = box.getAttribute('data-allergy');
        
        // Show loading spinner
        document.querySelector('main').innerHTML = `
            <p>Loading results for ${selectedAllergy}...</p>
            <div class="loader"></div>
        `;
        
        try {
            const response = await fetch('https://safe-bites.vercel.app/restaurants');
            if (!response.ok) throw new Error('Failed to fetch data');
            const restaurants = await response.json();

            const filteredRestaurants = restaurants.filter(restaurant =>
                restaurant.allergySafeOptions.includes(selectedAllergy)
            );

            const resultsPage = `
                <h2>Restaurants Safe for ${selectedAllergy}</h2>
                ${filteredRestaurants.length > 0 ? `
                    <ul>
                        ${filteredRestaurants.map(restaurant => `
                            <li>
                                <strong>${restaurant.name}</strong><br>
                                Address: ${restaurant.address}<br>
                                Phone: ${restaurant.phone}<br>
                                <a href="${restaurant.website}" target="_blank">Website</a>
                            </li>
                        `).join('')}
                    </ul>
                ` : `<p>No restaurants found for ${selectedAllergy}.</p>`}
                <div>
                    <button onclick="window.location.href='allergy-filter.html'">Back</button>
                    <button onclick="window.location.href='index.html'">Go to Homepage</button>
                </div>
            `;

            document.querySelector('main').innerHTML = resultsPage;
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            document.querySelector('main').innerHTML = `
                <p>Failed to load data. Please try again later.</p>
                <div>
                    <button onclick="window.location.href='allergy-filter.html'">Back</button>
                    <button onclick="window.location.href='index.html'">Go to Homepage</button>
                </div>
            `;
        }
    });
});
