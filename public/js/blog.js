console.log("search", window.location.search)

const blogpost = document.querySelector("#blogpost");
const comments = document.querySelector("#comments")

if (document.querySelector("#commentForm")) {
    const commentForm = document.querySelector("#commentForm");
    commentForm.addEventListener("submit", sendComment)
}
const regex = /=(.+)/;
const match = window.location.search.match(regex);

let postId = parseInt(match[1])


fetch(`/api/blogroutes/${postId}`, {
    method: "GET"
})
    .then((response) => {
        return response.json()
    })
    .then((post) => {
        console.log("post:: ", post)
        let htmlStr = `
        <h2>${post[0].title}</h2>
        <p>${post[0].contents}</p>
    `;

        blogpost.innerHTML = "";
        blogpost.innerHTML = htmlStr;
        displayComment(post);

    })
    .catch((err) => {
        console.log(err)
    });

function sendComment(event) {
    event.preventDefault()

    let commentText = document.querySelector("#commentText").value;

    let bodyData = {
        contents: commentText,
        blogId: postId
    }

    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            // add comments to UI
            console.log(result)
        })

}


function displayComment(post) {
    let commentStr = "";

    post[0].comments.forEach((comment) => {
        commentStr += `
                <div>
                    <h5>${comment.user.name}</h5>
                    <p>${comment.contents}</p>
                </div>
                `;
    })

    comments.innerHTML = "";
    comments.innerHTML = commentStr;
}