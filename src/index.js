const graphURL="http://localhost:3000/graphs"
let currentScore = 0

function fetchGraphs(session){ //start
  fetch(`http://localhost:3000/graphs/1`)
  .then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData)
  checkButton(jsonData, session)
  sessionData(session)
    })
  }

function renderGraph(graph){
  const card = `<div class="card" data-take="1" style="background-color:white;">
  <h2>${graph.id}. Input your answer. </h2>
  <img src=${graph.image_url}.png class="graph-img" width="250" height="200"/>
  <br>
  <p>Y =  <input type="text" class="checkM" id="inputM" placeholder="m" size="3" /> x+ <input type="text" class="checkB" id="inputB" placeholder="b" size="3" /> 

  </div>`

  const collection = document.getElementById('graph-collection')
  collection.innerHTML = card
}

function checkButton(graph, session){
  const collection = document.getElementById('graph-collection')
  collection.innerHTML += `<button id="submit" data-id=${session.id}> Check </button>`
  submit(graph)
}

function sessionData(session){
  const sessionInfo = document.querySelector('#sessions')
  sessionInfo.innerHTML = `<h2>Current Score: ${session.score}</h2>`
}


function submit(graph){
  const submit = document.getElementById("submit")
  submit.addEventListener('click',function(event){
    checkGrade(graph)
  })
}

function NextGraph(graphID,session){
let updateGraphID = parseInt(graphID) + 1
fetch(`${graphURL}/${updateGraphID}`)
.then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData)
  checkButton(jsonData, session)
  })
}

function nextButton(graph){
  console.log(graph.id)
  const collection = document.getElementById('graph-collection')
  if (graph.id === 31){
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
      let graphID= event.target.dataset.id
      NextGraph(graphID,session)
    }else if (event.target.id === 'finished'){
      console.log('clicker works')
      finalCall(session)
    }
  })
}

function checkGrade(graph){
  const mBox = document.getElementById("inputM")
  const bBox = document.getElementById("inputB")
  if (parseInt(mBox.value) === graph.m  && parseInt(bBox.value) === graph.b){
    mBox.placeholder = mBox.value
    bBox.placeholder = bBox.value
    currentScore += 2
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({currentScore})
    }
    
    fetch(`http://localhost:3000/sessions/${event.target.dataset.id}`, reqObj)
    .then(resp => resp.json())
    .then(respData => {
      sessionData(respData)
      Next(respData)
    })
    nextButton(graph)
  
  }else{
    console.log(event.target)
  }
}

function finalCall(session){
  const collection = document.getElementById('graph-collection')
  collection.innerHTML = ''
  // console.log(session)
  const finalInfo = `
  <h2>Final Score: ${session.score}</h2>`
  collection.innerHTML = finalInfo
}
