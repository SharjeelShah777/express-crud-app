
// window.createPost = function () {

//     let postTitle = document.querySelector("#postTitle").value;
//     let postText = document.querySelector("#postText").value;

//     // baseUrl/api/v1/post
//     axios.post(`/api/v1/post`, {
//         title: postTitle,
//         text: postText
//     })
//         .then(function (response) {
//             console.log(response.data);
//             document.querySelector("#result").innerHTML = response.data;
//             getAllPost();
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error.data);
//             document.querySelector("#result").innerHTML = "error in post submission"
//         })
// }



window.createPost = function () {

    let postTitle = document.querySelector("#postTitle").value;
    let postText = document.querySelector("#postText").value;

    axios.post(`/api/v1/post`, {
        title: postTitle,
        text: postText
    })
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#result").innerHTML = response.data;
            getAllPost();
            // Open the Bootstrap modal
            $('#postCreatedModal').modal('show');
        })
        .catch(function (error) {
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission";
        });
}

window.getAllPost = function () {


    // baseUrl/api/v1/post
    axios.get(`/api/v1/posts`)
        .then(function (response) {
            console.log(response.data);


            let postsHtml = ``

            response.data.map((eachPost) => {
                postsHtml +=
                    `<div id='card-${eachPost.id}' class="post-card">
                        <h3 id="fb">${eachPost.title}</h3>
                        <p> ${eachPost.text} </p>
                        <div class="bf">
                        <button class="edit" onclick="editPost('${eachPost.id}','${eachPost.title}','${eachPost.text}', )"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="delete" onclick="delPost('${eachPost.id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
                        </div>
                    </div> 
                    <br />`
            })


            document.querySelector("#posts").innerHTML = postsHtml
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission"
        })
}


// window.delPost = function (postId) {

//     console.log("delete: ", postId);


//     // baseUrl/api/v1/post
//     axios.delete(`/api/v1/post/${postId}`)
//         .then(function (response) {
//             console.log(response.data);

//             getAllPost();
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error.data);
//             document.querySelector("#result").innerHTML = "error in post submission"
//         })
// }

// window.delPost = function (postId) {
//     console.log("delete: ", postId);

//     // Open Bootstrap confirmation modal
//     if (confirm("Are you sure you want to delete this post?")) {
//         // If user confirms deletion, proceed with the delete request
//         axios.delete(`/api/v1/post/${postId}`)
//             .then(function (response) {
//                 console.log(response.data);
//                 getAllPost();
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error.data);
//                 document.querySelector("#result").innerHTML = "error in post submission";
//             });
//     } else {
//         // If user cancels deletion, do nothing
//         console.log("Deletion canceled by user.");
//     }
// }







window.delPost = function (postId) {
    const modalContent = `
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" onclick="performDelete('${postId}')">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector("#deleteModalContainer").innerHTML = modalContent;
    
    // Open the Bootstrap modal
    $('#deleteModal').modal('show');
}

// ==================================
window.performDelete = function (postId) {
    axios.delete(`/api/v1/post/${postId}`)
        .then(function (response) {
            console.log(response.data);
            $('#deleteModal').modal('hide'); // Close the modal
            getAllPost();
        })
        .catch(function (error) {
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission";
            $('#deleteModal').modal('hide'); // Close the modal
        });
}



window.editPost = (postId, title, text) => {

    console.log("delete: ", postId);

    document.querySelector(`#card-${postId}`).innerHTML =
        `<form onsubmit="savePost('${postId}')">
            Title: <input type='text' value='${title}' id='title-${postId}' />
            <br/>
            Text: <input type='text' value='${text}' id='text-${postId}' />
            <br/>
            <button>Save</button>

        </form>`
}
window.savePost = (postId)=>{
    const updatedTitle = document.querySelector(`#title-${postId}`).value;
    const updatedText = document.querySelector(`#text-${postId}`).value;

    axios.put(`/api/v1/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission"
        })

}
