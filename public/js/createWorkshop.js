let host = ["localhost"];

window.addEventListener('load', () => {
    document.getElementById('submit').onclick = createWorkshop;
});

function createWorkshop(){
    let title = document.getElementById('inputTitle').value;
    let date = document.getElementById('inputDate').value;
    let description = document.getElementById('inputDescription').value;
    let hostedBy = document.getElementById('username').innerHTML;
    date = date.toString();

    if(title == "" || date == "" || description == ""){
        alert("Please fill out all fields");
        return;
    }

    let newWorkshop = {title: title, date: date, description: description, hostedBy: hostedBy};
    fetch(`http://${host[0]}:3000/createWorkshop`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWorkshop)
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
            alert("Workshop created successfully");
            window.location.href = `http://${host[0]}:3000/home`;
        }
    });
}
