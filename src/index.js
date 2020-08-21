const graphURL="http://localhost:3000/graphs"
let currentScore = 0
let clickCount = 0

function fetchGraphs(session){
  fetch(`http://localhost:3000/graphs/1`)
    .then(resp => resp.json())
      .then(jsonData => {
        renderGraph(jsonData)
        checkButton(jsonData, session)
        sessionData(session)
      })
}

function renderGraph(graph){
  const card = `<div class="card" style="background-color:white;">
  <h4>${graph.id}. Input your answer. </h4>
  <img src=${graph.image_url}.png class="graph-img"/>
  <br>
  <p>y = <input type="text" class="checkM" id="inputM" placeholder="m" size="3" /> x + <input type="text" class="checkB" id="inputB" placeholder="b" size="3" /> 

  </div>`
  const collection = document.getElementById('graph-collection')
  collection.innerHTML = card
}

function checkButton(graph, session){
  console.log("session",session)
  const collection = document.getElementById('graph-collection')
  collection.innerHTML += `
  <button id="submit" data-id=${session.id} data-clickCount=0 > Check </button>
  `
  submit(graph, session)
}

function sessionData(session){
  const sessionInfo = document.querySelector('#sessions')
  sessionInfo.innerHTML = `<h2>Current Score: ${session.score}</h2>`
}

function submit(graph, session){
  const submit = document.getElementById("submit")
  submit.addEventListener('click',function(event){
    checkGrade(graph, session)
    console.log("in submit function, line 58")
  })
}

function NextGraph(graphID,session){
  gradeArea.innerHTML = ''
  let updateGraphID = parseInt(graphID) + 1
  fetch(`${graphURL}/${updateGraphID}`)
    .then(resp => resp.json())
      .then(jsonData => {
        renderGraph(jsonData)
        checkButton(jsonData, session)
    })
}

function nextButton(graph){
  const collection = document.getElementById('graph-collection')
  collection.removeChild(document.getElementById('submit'))
  if (graph.id === 5){
    const finishButton = `<button id='finished' data-id=${graph.id}> Finished </button>`
    collection.innerHTML += finishButton
  } else {
    const nextButton = `<button id='clickNext' data-id=${graph.id}> Next </button>`
    collection.innerHTML += nextButton
  }
}

function Next(session){
  document.addEventListener('click', function(event){
    if (event.target.id === 'clickNext'){
      let graphID = event.target.dataset.id
      NextGraph(graphID,session)
    }else if (event.target.id === 'finished'){
      finalCall(session)
    }
  })
}

function checkGrade(graph, session){
  const mBox = document.getElementById("inputM")
  const bBox = document.getElementById("inputB")
    if (parseInt(mBox.value) === graph.m  && parseInt(bBox.value) === graph.b){
      if (clickCount === 0){
        mBox.placeholder = mBox.value
        bBox.placeholder = bBox.value
        currentScore += 2 
        const resultMessage= `<p style="color:green;">Correct</p>`
        gradeArea.innerHTML = resultMessage
        const reqObj = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({currentScore})
        }
        
        sessionID = event.target.dataset.id
        fetch(`http://localhost:3000/sessions/${sessionID}`, reqObj)
        .then(resp => resp.json())
          .then(respData => {
            sessionData(respData)
            Next(respData)
          })
        nextButton(graph)
      } else if (clickCount === 1){
        mBox.placeholder = mBox.value
        bBox.placeholder = bBox.value
        currentScore += 1 
        const resultMessage= `<p style="color:green;">Correct</p>`
        gradeArea.innerHTML = resultMessage
        const reqObj = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({currentScore})
        }
        
        sessionID = event.target.dataset.id
        fetch(`http://localhost:3000/sessions/${sessionID}`, reqObj)
        .then(resp => resp.json())
        .then(respData => {
          sessionData(respData)
          Next(respData)
        })
        nextButton(graph)
        clickCount = 0
        }

    } else if (parseInt(mBox.value) !== graph.m && parseInt(bBox.value) === graph.b 
    || parseInt(mBox.value) !== graph.m  && parseInt(bBox.value) !== graph.b 
    || parseInt(mBox.value) === graph.m  && parseInt(bBox.value) !== graph.b){
      if(clickCount === 0){
        const resultMessage= `<p style="color:red;"> Think again,you have one time to retake this question</p>`
        gradeArea.innerHTML = resultMessage
        clickCount+=1
      } else if (clickCount === 1){
        const resultMessage= `<p style="color:red;"> The correct answer is: ${graph.equation}</p>`
        gradeArea.innerHTML = resultMessage
        nextButton(graph)
        Next(session)
        clickCount = 0
      }      
      console.log(gradeArea)
    }
}

function finalCall(session){
  gradeArea.innerHTML = ''
  const collection = document.getElementById('graph-collection')
  collection.innerHTML = ''
  const finalInfo = `
  <h2>Final Score: ${session.score}</h2>
  <button type="button" data-id=${session.user_id} id="restart">Play Again</button>
  `
  gradeArea.innerHTML = ``
  collection.innerHTML = finalInfo
  const sessionInfo = document.querySelector('#sessions')
  sessionInfo.innerHTML = ``
}
