window.addEventListener('load', () => {
    document.getElementById('save').onclick = updateAccount;
});

function updateAccount(){
    let accType = document.getElementById('type').value;

    let updatedAcc = {accType: accType};
    fetch(`http://${host[0]}:3000/editAccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAcc)
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
            alert("Account updated successfully");
            window.location.href = `http://${host[0]}:3000/home`;
        }
    });
}