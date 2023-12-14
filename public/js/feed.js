// feed.js

document.getElementById('postForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const content = document.getElementById('Content').value;

    try {
        // Retrieve userId from cookies
        const userId = getCookie('userId');

        const response = await fetch('http://localhost:3000/posts/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                userId: userId,
            }),
        });

        if (response.ok) {
            const newPost = await response.json();
            document.getElementById('Content').value = "";
            // Optionally, update the UI to display the new post immediately
            displayPosts()
        } else {
            const data = await response.json();
            alert(`Post addition failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during post addition:', error.message);
        alert('An unexpected error occurred during post addition.');
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Function to display posts
async function displayPosts() {
    const response = await fetch('http://localhost:3000/posts/getAllPosts');
    const posts = await response.json();

    const loggedInUserId = getCookie('userId');

    const seePostsSection = document.getElementById('seePosts');
    seePostsSection.innerHTML = '';

    posts.forEach(async post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        // Username block
        const usernameBlock = document.createElement('div');
        usernameBlock.className = 'username-block';
        usernameBlock.innerHTML = `<strong>${post.Username}:</strong>`;
        postElement.appendChild(usernameBlock);

        // Content block
        const contentBlock = document.createElement('div');
        contentBlock.className = 'content-block';
        contentBlock.innerHTML = `${post.Content}`;
        postElement.appendChild(contentBlock);

        const likeCountButton = document.createElement('button');
        likeCountButton.className = 'like-count-btn';
        likeCountButton.id = `likeCount-${post.PostId}`;
        let count = await getLikeCount(post.PostId);
        likeCountButton.innerText = `👍: ${count}`;

        const hasLiked = await hasUserLikedPost(loggedInUserId, post.PostId);

        if (hasLiked) {
            likeCountButton.classList.add("liked");
            likeCountButton.addEventListener('click', async () => {
                await handleUnlike(loggedInUserId, post.PostId);
                displayPosts()
            });
        } else {
            likeCountButton.classList.add("not-liked");
            likeCountButton.addEventListener('click', async () => {
                await handleLike(loggedInUserId, post.PostId);
                displayPosts();
            });
        }

        postElement.appendChild(likeCountButton);


        // Buttons block
        const buttonsBlock = document.createElement('div');
        buttonsBlock.className = 'buttons-block';
        if (post.UserId == loggedInUserId) {
            buttonsBlock.innerHTML = `
                <button class="edit-btn" data-postid="${post.PostId}">Edit</button>
                <button class="delete-btn" data-postid="${post.PostId}">Delete</button>
            `;
        }
        
        postElement.appendChild(buttonsBlock);

        seePostsSection.appendChild(postElement);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const postId = this.getAttribute('data-postid');
            await deletePost(postId);
            // Refresh posts after deletion
            displayPosts();
        });
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.getAttribute('data-postid');
            const newContent = prompt('Enter new content:', '');
            if (newContent !== null) {
                editPost(postId, newContent);
            }
        });
    });
}

// Call displayPosts initially
displayPosts();

// Function to delete a post
async function deletePost(postId) {
    try {
        const response = await fetch('http://localhost:3000/posts/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ PostId: postId }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('Delete failed:', data.message);
            alert(`Delete failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during post deletion:', error.message);
        alert('An unexpected error occurred during post deletion.');
    }
}

async function editPost(postId, newContent) {
    try {
        const response = await fetch('http://localhost:3000/posts/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ PostId: postId, Content: newContent }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('Edit failed:', data.message);
            alert(`Edit failed: ${data.message}`);
        } else {
            // Refresh posts after editing
            displayPosts();
        }
    } catch (error) {
        console.error('Error during post edit:', error.message);
        alert('An unexpected error occurred during post edit.');
    }
}

async function hasUserLikedPost(userId, postId) {
    try {
        const url = new URL(`http://localhost:3000/likes/get`);
        url.search = new URLSearchParams({
            userId: userId,
            postId: postId,
        }).toString();

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            // Check if the result has a LikeId, indicating the user has liked the post
            return result.LikeCount > 0;
        } else {
            const data = await response.json();
            console.error('Check Like failed:', data.message);
            alert(`Check Like failed: ${data.message}`);
            return false;
        }
    } catch (error) {
        console.error('Error during Check Like:', error.message);
        // alert('An unexpected error occurred during Check Like.');
        return false;
    }
}

async function getLikeCount(postId) {
    try {
        // Retrieve the updated like count for the post
        const response = await fetch(`http://localhost:3000/likes/getLikesForPost?postId=${postId}`);
        if (response.ok) {
            const result = await response.json();
            return result.likeCount;
        }
    } catch (error) {
        console.error('Error updating like count:', error.message);
    }
    return 0;
}

async function handleUnlike(userId, postId) {
    try {
        // Send request to unlike the post
        const response = await fetch('http://localhost:3000/likes/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                postId: postId,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('Unlike failed:', data.message);
            alert(`Unlike failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during unlike:', error.message);
        alert('An unexpected error occurred during unlike.');
    }
}

// Function to handle like action
async function handleLike(userId, postId) {
    try {
        // Send request to like the post
        const response = await fetch('http://localhost:3000/likes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                postId: postId,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.error('Like failed:', data.message);
            alert(`Like failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during like:', error.message);
        alert('An unexpected error occurred during like.');
    }
}