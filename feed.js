function Post(Content, UserId) {
    this.Content = Content;
    this.UserId = UserId;
}


var postForm = document.getElementById("postForm");

postForm.addEventListener("submit", createPost);

function createPost(e) {
    let postContent = document.getElementById("Content").value;
    let UserId = "123";
    var postObj = new Post(postContent, UserId);
    console.log(postObj)
    e.preventDefault();
}
