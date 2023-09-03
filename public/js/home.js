const postcontainer = document.querySelector("#postcontainer");

fetch("/api/blogroutes", {
    method: "GET"
})
.then((response) => {
    return response.json()
})
.then((results) => {
    // console.log(results)
    const currentPost = displayBlogPost(results);
    return currentPost
})
.then((postData) => {
    // console.log("postData: ", postData)
    postcontainer.innerHTML = "";
    let htmlData = ""; 
    postData.forEach((post) => {
        htmlData += post;
    })
    // console.log("htmlDAta: ", htmlData)
    postcontainer.innerHTML = htmlData;
})
.catch((err) => {
    console.log(err)
})


function displayBlogPost(posts) {
    const blogPost = posts.map((post) => {
         let dateCreated = dayjs(post.createdAt).format('MMMM D, YYYY');
         return (`
             <div>
                 <a href="/blog/?post=${post.id}">
                     <span class="fs-2 fw-medium hover-effect"> ${post.title}</span>
                 </a>
             </div>
             <div class="mb-2">
                 <span class="fs-5">Published: <span class="text-secondary">${dateCreated}</span> </span>
             </div>
         `)
     })
 
     return blogPost;
 }