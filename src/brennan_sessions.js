//new/create--new button in dashboard
//read
//edit/update (scores updated) - a field in leaderboard



function main() {
    clickListener()
    //updateLeaderBoard()
}

function clickListener() {
    const newGameClick = document.addEventListener('click', function(event) {
        const dataId = event.target.dataset.id
        console.log(dataId)
        if (event.target.id === 'restart' || event.target.id === "new"){
            // console.log(event);

        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({dataId})
          }
        
        fetch("http://localhost:3000/sessions", reqObj)
          .then(res => res.json())
          .then(data => fetchGraphs(data.id));
        }
    })
}


function gameStart() {
    const div = document.getElementById('graph-collection')
}

// function updateLeaderBoard() {
//     const ul = document.getElementById('leader-board')
//     ul.innerHTML += `<li>${session.score}.....${user.username}</li>`
// }





main()