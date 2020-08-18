const graphURL="http://localhost:3000/graphs"


function fetchGraphs(){
  fetch(graphURL)
  .then(resp => resp.json())
  .then(jsonData => {
    jsonData.forEach(data => {renderGraph(data)})
  })
  }



function renderGraph(graph){
      const card = `<div class="card" data-graph-id= "${graph.id}" style="background-color:white;">
      <h2>${graph.id}. Input your answer. </h2>
      <img src="${graph.image_url}.png" class="graph-img" width="250" height="200"/>
      <p> Y = mx+b</p>
      <input type="text" id="mKey" placeholder="m value"> 
      <input type="text" id="bKey" placeholder="b value">
      </div>`
      const collection = document.getElementById('graph-collection')
      collection.innerHTML += card
      }


//Invoke 
fetchGraphs()