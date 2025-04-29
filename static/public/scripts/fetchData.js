document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const commentsContainer = document.getElementById("data-container");
    const errorMessage = document.getElementById("error-message");

    const fetchData = async () => {
        preloader.style.display = "block";
        errorMessage.style.display = "none";
        commentsContainer.innerHTML = "";

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
            const data = await response.json();
            preloader.style.display = "none";

            if (data && data.length > 0) {
                data.forEach(comment => {
                    const commentElement = document.createElement("div");
                    commentElement.classList.add("comment");

                    const authorName = document.createElement("strong");
                    authorName.textContent = comment.name;

                    const commentBody = document.createElement("p");
                    commentBody.textContent = comment.body;

                    commentElement.appendChild(authorName);
                    commentElement.appendChild(commentBody);

                    commentsContainer.appendChild(commentElement);
                });
            } else {
                const noCommentsMessage = document.createElement("p");
                noCommentsMessage.textContent = "Нет комментариев для отображения.";
                commentsContainer.appendChild(noCommentsMessage);
            }
        } catch (error) {
            preloader.style.display = "none";
            errorMessage.style.display = "block";
            console.error("Ошибка:", error);
        }
    };

    fetchData();
});
