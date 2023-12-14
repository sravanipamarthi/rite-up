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

function openModal(content, postId) {
    const editedContentInput = document.getElementById('editedContent');
    editedContentInput.value = content;
    document.getElementById('editedContent').focus();
    editedContentInput.dataset.postId = postId;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function saveEditedContent() {
    const postId = document.getElementById('editedContent').dataset.postId;
    const editedContent = document.getElementById('editedContent').value;

    await editPost(postId, editedContent);
    closeModal(); // Close the modal after saving
    // Refresh posts after editing
    displayPosts();
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
    // editButtons.forEach(button => {
    //     button.addEventListener('click', function () {
    //         const postId = this.getAttribute('data-postid');
    //         console.log(this.value);
    //         const newContent = prompt('Enter new content:', '');
    //         if (newContent !== null) {
    //             editPost(postId, newContent);
    //         }
    //     });
    // });
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const postId = this.getAttribute('data-postid');
            console.log(this.parentElement.previousSibling);
            const content = this.parentElement.previousSibling.innerHTML;
            openModal(content, postId);
        });
    });
}

// Call displayPosts initially
displayPosts();