let host = ["localhost","YOUR_OPENSTACK_IP"];

window.addEventListener('load', () => {
    document.getElementById('submit').onclick = login;
});

function login(){
    //Post the data to the server
    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;

    if(username == "" || password == ""){
        alert("Please enter a username and password");
        return;
    }

    let loggedUser = {username: username, password: password};
    fetch(`http://${host[0]}:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loggedUser)
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
            window.location.href = `http://${host[0]}:3000/home`;
        }
    })
    .catch(err => {
        console.log(err);
    });

    document.getElementById('inputUsername').innerHTML = "";
    document.getElementById('inputPassword').innerHTML = "";
}

function logout(){
    window.location.href = `http://${host[0]}:3000/logout`;
}
