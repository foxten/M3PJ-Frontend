const graphURL="http://localhost:3000/graphs"


function fetchGraphs(){
  fetch("http://localhost:3000/graphs/1")
  .then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData)
    })
  }

function renderGraph(graph){
      const card = `<div class="card" data-graph-id= "${graph.id}" style="background-color:white;">
      <h2>${graph.id}. Input your answer. </h2>
      <img src="${graph.image_url}.png" class="graph-img" width="250" height="200"/>
      <br>
      <p>Y =  <input type="text" class="checkM" id="inputM" placeholder="m" size="3" /> x+ <input type="text" class="checkB" id="inputB" placeholder="b" size="3" />
      <button class="clickNext"> Next </button>
      </div>`
       const collection = document.getElementById('graph-collection')
       collection.innerHTML += card
      }

function clickNext(){
const clickNext = document.getElementsByClassName('clickNext')
clickNext.addEventListener('click', function(event){
  // const getElementById 

  //compare inputM and inputB with json keys
  //if correct, go to next, if wrong, show "retake" for one time

  //if inputM === ${graph.M} && inputB ===${graph.B}

  const reqObj = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //???????? nothing to save
      })
  }

  const Id= event.target.dataset.id //this should be the graph ID
  fetch(`${graphURL}/${Id}`, reqObj)
  .then(resp => resp.json())  // how to save??? create a user json?
  .then(data => {
     
  })
  })

}

//Invoke 
fetchGraphs()