const textBoxDiv = document.getElementById('text-box')
const answerArea = document.getElementById('answer-area')
const feedBackDiv = document.getElementById('feedback')
const timerDiv = document.getElementById('timer')
const questionDiv = document.getElementById('question')
const progressDiv = document.getElementById('progress')
const titleDiv = document.getElementById('title')

//Tegeleb .json file valimisega


// See muutuja otsustab milliseid küsimusi kasutada
var selectedJson = "citys"
var correct = 0
getinfo()

let timer = 0
timerDiv.innerText = "0:00"
setInterval(() => {
    minutes = parseInt(timer / 60)
    seconds = (timer % 60).toString().padStart(2, '0')
    timer++
    timerDiv.innerText = minutes + ":" + seconds 
}, 1000);

function getinfo(){
    fetch('./json/' + selectedJson + '.json')
        .then((response) => {
        return response.json()
      })
      .then((data) => {
        selectedData = data.data
        max = Object.keys(selectedData).length
        question = Object.values(data.meta)[0]
        howmany = Object.values(data.meta)[1]    
        randint = Math.floor(Math.random() * max)

        randQuestion = Object.keys(selectedData)[randint]
        correctAnswer = (Object.values(selectedData)[randint])
        question = question.replace("*", randQuestion)

        titleDiv.innerHTML = Object.values(data.meta)[2]
        questionDiv.innerHTML = '<div class="question">' +  question +  "</div>"
        progressDiv.innerHTML = correct + "/" + howmany    
       
    
      });
    }
answerArea.focus()
answerArea.addEventListener('keydown', event => {
  console.log(event.keyCode)
  
  if (event.keyCode == 13) {
    if (answerArea.value.toUpperCase() == correctAnswer.toUpperCase()) {
      correct++
      console.log("Correct")
      progressDiv.innerHTML = correct + "/" + howmany    
      feedBackDiv.innerHTML = "<div id=correct>" + "Õige vastus" + "</div>"
    } else{
      console.log("Incorrect")
      console.log(answerArea.value)
      console.log(correctAnswer)
      feedBackDiv.innerHTML = "<div id=incorrect>" + "Vale vastus" + "</div>"
      + '<div>' + "Õige vastus oli " + correctAnswer +  '</div>'
    }
    if (correct != howmany){
      getinfo()
    }else{
      clearInterval()
      feedBackDiv.innerHTML = "<div id=correct>" + "Saite " + correct + "/" + howmany + " õieti " + "Aega kulus: " + minutes + ":" + seconds  + "</div>"
      timerDiv.innerHTML = ' '
    }
  answerArea.value = "" 
}

  
})


    