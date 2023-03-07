let host = ["localhost"];

window.addEventListener('load', () => {
    document.getElementById('submit').onclick = addArtwork;
});

function addArtwork(){
    let artist = document.getElementById('username').innerHTML;
    let name = document.getElementById('inputName').value;
    let year = document.getElementById('inputYear').value;
    let category = document.getElementById('inputCategory').value;
    let medium = document.getElementById('inputMedium').value;
    let description = document.getElementById('inputDescription').value;
    let image = document.getElementById('inputImage').value;

    if(name == "" || year == "" || category == "" || medium == "" || description == "" || image == ""){
        alert("Please fill out all fields");
        return;
    }

    let newArtwork = {artist: artist, name: name, year: year, category: category, medium: medium, description: description, image: image};
    fetch(`http://${host[0]}:3000/addArtwork`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtwork)
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
            alert("Artwork added successfully");
            window.location.href = `http://${host[0]}:3000/home`;
        }
    });
}



