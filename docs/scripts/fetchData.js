document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const reviewsContainer = document.getElementById("data-container");
    const errorMessage = document.getElementById("error-message");

    const fetchReviews = async () => {
        preloader.style.display = "block";
        errorMessage.style.display = "none";
        reviewsContainer.innerHTML = "";

        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/appreviews/730?json=1&count=20&language=russian`);const data = await response.json();
            console.log(data);
            preloader.style.display = "none";

            // Проверяем, есть ли отзывы
            if (data.reviews && data.reviews.length > 0) {
                data.reviews.forEach(review => {
                    const reviewElement = document.createElement("div");
                    reviewElement.classList.add("review");

                    const authorId = review.author.steamid;
                    const reviewText = review.review;

                    reviewElement.innerHTML = `
                        <strong>Автор: ${authorId}</strong>
                        <p>${reviewText}</p>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });
            } else {
                reviewsContainer.innerHTML = "<p>Нет отзывов для отображения.</p>";
            }
        } catch (error) {
            preloader.style.display = "none";
            errorMessage.style.display = "block";
            console.error("Ошибка:", error);
        }
    };

    fetchReviews();
});
