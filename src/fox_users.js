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
            .then(respData => userDashboard(respData))
    })
}

function userDashboard(user){
    const dashboard = document.querySelector('#dashboard')
    dashboard.dataset.id = user.id
    const userInfo = `
    <h2>Welcome ${user.username}</h2>
    <ul id="scores">Scores:</ul>
    <button type="button" data-set-id=${user.id} id="new">Start a New Game!</button>
    <button type="button" data-set-id=${user.id} id="edit-username">Edit Username</button>
    `
    dashboard.innerHTML = userInfo
        user.sessions.forEach(session => {
            const newItem = `<li>${session.score}</li>`
            document.querySelector('#scores').innerHTML += newItem
        })
    dashboard.addEventListener('click', function(event){
        if (event.target.id === 'edit-username'){
            // const newForm = document.createElement('form')
            // const inputField = document.createElement('input')
            // inputField.type = 'text'
            // inputField.value = user.username
            // dashboard.innerHTML = inputField
            dashboard.innerHTML = `
            <form id="username">
            <input type='text' placeholder="Username" id="username-update" value=${user.username}></input>
            <input type='button' id="update" value='Update Username'></input>
            </form>`

            editUserInfo(event)
        }
    })
}

function editUserInfo(event){
    const update = document.querySelector('#update')
    update.addEventListener('click', function(event){
        event.preventDefault()
        const newUsername = document.querySelector('#username-update').value
        const userId = document.querySelector('#dashboard').dataset.id

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify({newUsername})
        }

        fetch(`${userURL}/${userId}`, reqObj)
            .then(resp => resp)
            
    })
}

newUserListener()
