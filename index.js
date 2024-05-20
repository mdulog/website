var result = "";
function GetData()
{
    console.log("Get Data");
    fetch("http://localhost:3000/data").then(resp =>{
    resp.json().then(data =>{
        result = data;
        const resultDiv = document.getElementById("json");
        resultDiv.innerText = JSON.stringify(result);
        })
    });
}

function UpsertData() {
    console.log("Upsert Data");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name == "" || email == "") {
        return;
    }
    const requestBody = {
        name: name,
        email: email
    };

    fetch("http://localhost:3000/data",
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
    )
    .then(response => {
        console.log(response);
    })
    .catch(response => {
        console.error(response);
    })
}

document.getElementById("btnGet").addEventListener("click",GetData);
document.getElementById("btnPut").addEventListener("click", AddData);