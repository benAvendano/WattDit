let currentStoryIndex = null;

function submitStory() {
    const usernameInput = document.getElementById("username").value || "Anónimo";
    const storyContent = document.getElementById("story-content").value;

    let displayContent = storyContent.split(" ").slice(0, 40).join(" ");
    displayContent = displayContent.replace(/(\w{11,})/g, (word) => word.slice(0, 11) + '...');

    const story = {
        username: usernameInput,
        content: storyContent,
        displayContent: displayContent,
        likes: 0,
        comments: []
    };

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.unshift(story);
    localStorage.setItem("stories", JSON.stringify(stories));

    document.getElementById("latest-username").innerText = `@${usernameInput}`;
    document.getElementById("latest-story-content").innerText = displayContent;
    if (storyContent.split(" ").length > 40) {
        document.getElementById("read-more-button").style.display = "inline";
    } else {
        document.getElementById("read-more-button").style.display = "none";
    }
    document.getElementById("username").value = "";
    document.getElementById("story-content").value = "";

    displayStories();
}

function displayStories() {
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const storyGrid = document.getElementById("story-grid");
    
    storyGrid.innerHTML = "";

    stories.slice(0, 8).forEach((story, index) => {
        const storyCard = document.createElement("div");
        storyCard.classList.add("story-card");

        const userIcon = document.createElement("img");
        userIcon.src = "https://i.pinimg.com/736x/26/91/8c/26918c8eb57f4fc07eade15aada8f81f.jpg";
        userIcon.alt = "Usuario";
        userIcon.classList.add("user-icon");

        const username = document.createElement("span");
        username.innerText = `@${story.username}`;

        const storyText = document.createElement("p");
        storyText.innerText = story.displayContent;

        const viewButton = document.createElement("button");
        viewButton.innerText = "Ver Completa";
        viewButton.onclick = () => openModal(index);

        storyCard.appendChild(userIcon);
        storyCard.appendChild(username);
        storyCard.appendChild(storyText);
        storyCard.appendChild(viewButton);

        storyGrid.appendChild(storyCard);
    });
}

function openModal(index) {
    currentStoryIndex = index;
    const stories = JSON.parse(localStorage.getItem("stories"));
    const story = stories[index];

    document.getElementById("modal-story-content").innerText = story.content;
    document.getElementById("comments-section").innerHTML = story.comments
        .map(comment => `<p>@Anonimo: ${comment}</p>`)
        .join("<br>");
    document.getElementById("like-count").innerText = story.likes;
    document.getElementById("story-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("story-modal").style.display = "none";
    currentStoryIndex = null;
}

function addComment() {
    const commentInput = document.getElementById("new-comment").value;
    if (commentInput.trim() === "") return;

    const stories = JSON.parse(localStorage.getItem("stories"));
    stories[currentStoryIndex].comments.push(commentInput);
    localStorage.setItem("stories", JSON.stringify(stories));

    document.getElementById("new-comment").value = "";
    openModal(currentStoryIndex); // Refrescar comentarios
}

function toggleLike() {
    const stories = JSON.parse(localStorage.getItem("stories"));
    stories[currentStoryIndex].likes += 1;
    localStorage.setItem("stories", JSON.stringify(stories));

    document.getElementById("like-count").innerText = stories[currentStoryIndex].likes;
}

function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
}

window.onload = displayStories;
