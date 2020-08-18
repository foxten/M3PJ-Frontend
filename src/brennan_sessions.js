//new/create--new button in dashboard
//read
//edit/update (scores updated) - a field in leaderboard



function main() {
    newGameListener()
    updateLeaderBoard()
}

function newGameListener() {
    const newGame = document.getElementById('new')
    newGame.addEventListener('click', function(event){
        const session = document.getElementById(`sessions`)
        session.innerHTML += `<p>Session: ${session.id}</p>`

        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: 1})
          }
        
        fetch("http://localhost:3000/sessions", reqObj)
          .then(res => res.json())
          .then(data => console.log(data));
    })
}


function updateLeaderBoard() {

}





main()