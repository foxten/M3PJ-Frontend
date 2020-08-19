const graphURL="http://localhost:3000/graphs"

function fetchGraphs(){
  // fetch(`${graphURL}/${graphID}`)
  fetch(`http://localhost:3000/graphs/1`)
  .then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData)
    })
  }

function renderGraph(graph){
  
      const card = `<div class="card" data-id= "${graph.id}" style="background-color:white;">
      <h2>${graph.id}. Input your answer. </h2>
      <img src="${graph.image_url}.png" class="graph-img" width="250" height="200"/>


      <br>
      <p>Y =  <input type="text" class="checkM" id="inputM" placeholder="m" size="3" /> x+ <input type="text" class="checkB" id="inputB" placeholder="b" size="3" />
      <button id="clickNext" data-id= "${graph.id}" style="float: right;"> Next </button>

      </div>`
      const collection = document.getElementById('graph-collection')
      collection.innerHTML = card
      const clickNext = document.getElementById('clickNext')

      clickNext.addEventListener('click', function(event){
      let graphID= event.target.dataset.id
      NextGraph(graphID)

})
}

function NextGraph(graphID){
let updateGraphID = parseInt(graphID) + 1
fetch(`${graphURL}/${updateGraphID}`)
.then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData)
})
}


// function clickNext(){
// let graphID= 1
// const clickNext = document.getElementById('clickNext')
// clickNext.addEventListener('click', function(event){
// console.log(event.target)
// const mBox = document.getElementById("inputM")
// const bBox = document.getElementById("inputB")

// const totalPoint = 62
//   if (mBox.value === graph.m  && parseInt(bBox.innerText) === graph.b ) {
//     //go to next graph problem
// } else {
//     //allow to retake once for the specific problem
//     //how to set retake time =1?
//       if(retakeTime=1){
//       //{retake the question}
//       alert("Think! You have one more chance to retake this questinon!");

//       }
//       else {
//       //go to next problem
//       }

//   }

  // const reqObj = {
  //     method: 'PATCH',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       //???????? nothing to save
  //       //UID：user.id.value?, SID：session.id.value，score=user.score.value???

  //     })
  // }

//   const Id= event.target.dataset.id //this should be the graph ID
//   fetch(`${graphURL}/${Id}`, reqObj)//this should be user json link? 
//   .then(resp => resp.json())  // how to save??? create a user json?
//   .then(data => {
     
//   })
//   })

// }

//Invoke 
fetchGraphs()
// clickNext()