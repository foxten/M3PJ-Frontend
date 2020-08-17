const graphURL=""


function fetchGraphs(){
  fetch(graphURL)
  .then(resp => resp.json())
  .then(graphs => {
      graphs.map(renderGraph)
  })
}


function renderGraph(graph){
      const card = `<div class="card" data-graph-id= "${graph.id}">
      <h2>Input your answer</h2>
      <img src="${graph.image_url}" class="graph-img" />
      <p>${toy.likes} Likes</p>  
      </div>`
      const collection = document.getElementById('graph-collection')
      collection.innerHTML += card
      }


//Invoke 
fetchGraphs()