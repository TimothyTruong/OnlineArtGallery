let host = ["localhost","YOUR_OPENSTACK_IP"];

window.addEventListener('load', () => {
    document.getElementById('submit').onclick = addAccount;
});

function addAccount() {
    //Post the data to the server
    let username = document.getElementById('inputUsername').value;
    let password = document.getElementById('inputPassword').value;
    let name = document.getElementById('inputName').value;

    if(username == "" || password == "" || name == ""){
        alert("Please fill out all fields");
        return;
    }

    let newUser = {username: username, password: password, name: name};
    fetch(`http://${host[0]}:3000/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if(response.status != 200){
            document.getElementById('inputUsername').innerHTML = "";
            document.getElementById('inputPassword').innerHTML = "";
            document.getElementById('inputName').innerHTML = "";
            //Respond with the appropriate error message
            response.json().then(data => {
                alert(data.error);
            });

        }
        else {
            //Redirect to the home page
            alert("Account created successfully");
            window.location.href = `http://${host[0]}:3000/home`;
        }
    })
    .catch(err => {
        console.log(err);
    });

    
}