const graphURL="http://localhost:3000/graphs"

function fetchGraphs(sessionId){
  // fetch(`${graphURL}/${graphID}`)
  fetch(`http://localhost:3000/graphs/32`)
  .then(resp => resp.json())
  .then(jsonData => {
  renderGraph(jsonData, sessionId)
    })
  }

function renderGraph(graph, session){
  
      const card = `<div class="card" data-id= "${session}" style="background-color:white;">
      <p>${graph.id}. Input your answer. </p>
      <img src="${graph.image_url}.png" class="graph-img" width="250" height="200" />
      <br>
      <p>y =  <input type="text" class="checkM" id="inputM" placeholder="m" size="3" /> x+ <input type="text" class="checkB" id="inputB" placeholder="b" size="3" />
      
      <button id="submit" data-id= "${graph.id}" style="float: right;"> Check </button>

      </div>`

      //need to add submit button to div card with session stored as data-id
      const collection = document.getElementById('graph-collection')
      collection.innerHTML = card
      submit(graph)
}


function submit(graph){
  // Next()
  const submit =document.getElementById("submit")
  submit.addEventListener('click',function(event){
  event.preventDefault()
  console.log("event")
  checkGrade(graph)

  

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

function Next(){
  const clickNext = document.getElementById('clickNext')
  clickNext.addEventListener('click', function(event){
  let graphID= event.target.dataset.id
  NextGraph(graphID)
})
}

function checkGrade(graph){
  console.log("test")
const mBox = document.getElementById("inputM")
const bBox = document.getElementById("inputB")
let curretS = 0
if (mBox.value === graph.m  && parseInt(bBox.innerText) === graph.b){
  curretS+=2
  console.log(`your score is ${curretS}/62`)
}else{
  console.log("retry")
}


// //grab input data?
// console.log("11")

// let curretS = 0
// //   if (mBox.value === graph.m  && parseInt(bBox.innerText) === graph.b ) {

// //   }
// //   const gradeResult = `<div id="result" data-id= "${graph.id}" >
// //       <h2>Your grade is ${graph.id}./62. </h2>`
// // })
// })
// // }
// }

}



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
//fetchGraphs()
// clickNext()
//checkGrade()