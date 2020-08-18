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
      <button class="clickNext" style="float: right;"> Next </button>
      </div>`
       const collection = document.getElementById('graph-collection')
       collection.innerHTML += card
      }

function clickNext(){
const clickNext = document.getElementsByClassName('clickNext')
clickNext.addEventListener('click', function(event){

const mBox = document.getElementById("inputM")
const bBox = document.getElementById("inputB")

const totalPoint = 2 * (graphs.length - 1)
  if (parseInt(mBox.innerText) === graph.m  && parseInt(bBox.innerText) === graph.b ) {
    //go to next graph problem
} else {
    //allow to retake once for the specific problem
    //how to set retake time =1?
      if(retakeTime=1)
      //{retake the question}
      {}
      else {
      //go to next problem
      }

  }

  const reqObj = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //???????? nothing to save
        //user.id:UID,

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