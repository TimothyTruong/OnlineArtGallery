let host = ["localhost","YOUR_OPENSTACK_IP"];

window.addEventListener('load', () => {
    document.getElementById('review').onclick = addReview;
});



function addReview(){
    let username = document.getElementById('username').innerHTML;
    let artid = document.getElementById('artid').innerHTML;
    let reviewText = document.getElementById('reviewText').value;

    if(username == "" || artid == "" || reviewText == ""){
        alert("Review cannot be empty");
        return;
    }

    let newReview = {username: username, artid: artid, reviewText: reviewText};

    fetch(`http://${host[0]}:3000/addReview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
    })
    .then(response => {
        if(response.status != 200){
            //Respond with the appropriate error message
            response.json().then(data => {
                alert(data.error);
            });
        }
        else {
            //Redirect to the home page
            alert("Review created successfully");
            window.location.href = `http://${host[0]}:3000/artwork/${artid}`;
        }
    });

    document.getElementById("reviewText").value = "";
}

function deleteReview(reviewText,artid){
    let review = {reviewText: reviewText, artid: artid};
    fetch(`http://${host[0]}:3000/deleteReview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    .then(response => {
        if(response.status != 200){
            //Respond with the appropriate error message
            response.json().then(data => {
                alert(data.error);
            });
        }
        else {
            //Redirect to the home page
            alert("Review deleted successfully");
            window.location.href = `http://${host[0]}:3000/artwork/${artid}`;
        }
    });

}