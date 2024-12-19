function openReviewForm(restaurantId) {
    const reviewFormHtml = `
        <div class="review-form-overlay">
            <div class="review-form-container">
                <h2>Leave a Review</h2>
                <form id="reviewForm">
                    <label for="rating">Rating (0-5):</label>
                    <input type="number" id="rating" min="0" max="5" step="0.5" required>
                    
                    <label for="reviewContent">Your Review:</label>
                    <textarea id="reviewContent" rows="4" placeholder="Write your review..." required></textarea>
                    
                    <button type="submit">Submit Review</button>
                    <button type="button" onclick="closeReviewForm()">Cancel</button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', reviewFormHtml);

    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const rating = document.getElementById('rating').value;
        const reviewContent = document.getElementById('reviewContent').value;

        if (rating && reviewContent) {
            submitReview(restaurantId, rating, reviewContent);
        }
    });
}

function closeReviewForm() {
    const overlay = document.querySelector('.review-form-overlay');
    if (overlay) {
        overlay.remove();
    }
}

async function submitReview(restaurantId, rating, content) {
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ restaurantId, rating, content }),
        });

        if (response.ok) {
            alert('Review submitted successfully!');
            closeReviewForm();
        } else {
            alert('Failed to submit review.');
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred. Please try again.');
    }
}
