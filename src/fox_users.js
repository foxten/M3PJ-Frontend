const userURL="http://localhost:3000/users"

function originalDiv(){
    const originalForm = document.querySelector('#dashboard')
    originalForm.innerHTML = `
    <form id="username">
    <input type='text' placeholder="Username"></input>
    <input type='submit' id='submit' value='Login'></input>
  </form>`

  const graphArea = document.getElementById('graph-collection')
  graphArea.innerHTML =``
  const scores = document.getElementById('leaderboard')
  scores.innerHTML = ``
  gradeArea.innerHTML = ``
  sessions.innerHTML = ``
  newUserListener()
}

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
            .then(respData => {    
            userDashboard(respData)
            })
    })
}

function editUserInfo(event){
    const update = document.querySelector('#update')
    const userId = document.querySelector('#dashboard').dataset.id
    update.addEventListener('click', function(event){
        event.preventDefault()
        const newUsername = document.querySelector('#username-update').value

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify({newUsername})
        }

        fetch(`${userURL}/${userId}`, reqObj)
            .then(resp => resp.json())
                .then(resp => userDashboard(resp))
    })
}

function userDashboard(user){
    const leaderBoard = document.getElementById('leaderboard')
    leaderBoard.innerHTML = `<h4>Score Board</h4><ul id='leader-board'>
    </ul>`
    userLeaderboard(user)

    const dashboard = document.querySelector('#dashboard')
    dashboard.dataset.id = user.id
    const userInfo = `
    <h2>Welcome ${user.username}</h2>
    
    <button type="button" data-id=${user.id} id="new">Start a New Game</button>   
    <button type="button" data-id=${user.id} id="edit-username">Edit Username</button>
    <button type="button" data-id=${user.id} id="delete-me">Delete Account</button>
 `

    dashboard.innerHTML = userInfo
    
        dashboard.addEventListener('click', function(event){
        if (event.target.id === 'edit-username'){
            dashboard.innerHTML = `
            <form id="username">
            <input type='text' placeholder="Username" id="username-update" value=${user.username}></input>
            <input type='button' id="update" value='Update Username'></input>
            </form>`

            editUserInfo(event)

        } else if (event.target.id === 'delete-me'){
            console.log('gotta delete em')
            console.log(event.target.dataset.id)
            if (confirm ("Are you sure?")){
                const reqObj = {
                    method: 'DELETE'
                }
                fetch(`${userURL}/${event.target.dataset.id}`, reqObj)
                    .then(resp => resp)
                
                originalDiv()
            }
        }
    })
}

function userLeaderboard(user){
    const leaderBoard = document.querySelector('#leader-board')
        if (user.sessions.length > 0){
            user.sessions.forEach(session => {
            const newItem = `<li>${session.score}</li>`
            leaderBoard.innerHTML += newItem
        })
        }else{
            const noItems = `<li>You have no previous games.</li>`
            leaderBoard.innerHTML = noItems
        }
}

newUserListener()
