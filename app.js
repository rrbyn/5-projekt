const textBoxDiv = document.getElementById('text-box')
const answerArea = document.getElementById('answer-area')
const feedBackDiv = document.getElementById('feedback')
const timerDiv = document.getElementById('timer')
const questionDiv = document.getElementById('question')

//Tegeleb .json file valimisega


// See muutuja otsustab milliseid küsimusi kasutada
var selectedJson = "citys"


var counter = 1
getinfo()

function getinfo(){
    fetch('./json/' + selectedJson + '.json')
        .then((response) => {
        return response.json()
      })
      .then((data) => {
        var selectedData = Object.values(data.meta)[1]
        selectedData = data[selectedData]
        max = Object.keys(selectedData).length
        question = Object.values(data.meta)[0]
        randint = Math.floor(Math.random() * max)
        randQuestion = Object.keys(selectedData)[randint]
        correctAnswer = (Object.values(selectedData)[randint])
        question = question.replace("*", randQuestion)
        
        questionDiv.innerHTML = '<div class="question">' +  question +  "</div>"                 
    
      });
    }
answerArea.focus()
answerArea.addEventListener('keydown', event => {
  console.log(event.keyCode)
  if (event.keyCode == 13) {
    if (answerArea.value.toUpperCase() == correctAnswer.toUpperCase()) {
      console.log("Correct")
      feedBackDiv.innerHTML = "<div id=correct>" + "Õige vastus" + "</div>"
    } else{
      console.log("Incorrect")
      console.log(answerArea.value)
      console.log(correctAnswer)
      feedBackDiv.innerHTML = "<div id=incorrect>" + "Vale vastus" + "</div>"
      + '<div>' + "Õige vastus oli " + correctAnswer +  '</div>'
    }
  counter++
  getinfo()
  answerArea.value = ""
  
}
  
})


    