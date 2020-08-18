//new/create--new button in dashboard
//read
//edit/update (scores updated) - a field in leaderboard



function main() {
    clickListener()
    updateLeaderBoard()
}

function clickListener() {
    const newGameClick = document.addEventListener('click', function(event) {
        if (event.target.id === 'restart' || event.target.id === "new"){
            console.log(event);
            gameStart()
        }
  

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


function gameStart() {
    
}

function updateLeaderBoard() {

}





main()