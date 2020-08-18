const userURL="http://localhost:3000/users"


function newUserListener(){
    document.querySelector('#username').addEventListener('submit', function(event){
        event.preventDefault();

        let username = event.target[0].value;

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"username": username})
        }
    fetch(userURL,reqObj)
        .then(resp => resp.json())
            .then(respData => console.log(respData))
})

}

newUserListener()