const graphURL="http://localhost:3000/graphs"


function fetchGraphs(){
  fetch(graphURL)
  .then(resp => resp.json())
  .then(jsonData => {
    jsonData.forEach(data => {renderGraph(data)})
  })
  }



function renderGraph(graph){
      const card = `<div class="card" data-graph-id= "${graph.id}">
      <h2>Input your answer</h2>
      <img src="${graph.image_url}.png" class="graph-img" />

      </div>`
      const collection = document.getElementById('graph-collection')
      collection.innerHTML += card
      }


//Invoke 
fetchGraphs()