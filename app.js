const textBoxDiv = document.getElementById('text-box')
const answerArea = document.getElementById('answer-area')
const feedBackDiv = document.getElementById('feedback')
const timerDiv = document.getElementById('timer')
const questionDiv = document.getElementById('question')


var selectedQuestions = "citys"
getinfo()

function getinfo(){
    fetch('./key_value.json')
        .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        randint = Math.floor(Math.random() * (Object.keys(data.citys).length - 1))
        correctAnswer = (Object.values(data.citys)[randint])
        questionDiv.innerHTML = '<div class="question">' + "Mis on " + Object.keys(data.citys)[randint] + " pealinn?" +  "</div>"                 
    
      });
    }
answerArea.focus()
answerArea.addEventListener('keydown', event => {
  console.log(event.keyCode)
  if (event.keyCode == 13) {
    if (answerArea.value == correctAnswer) {
    console.log("Correct")
    feedBackDiv.innerHTML = "<div id=correct>" + "Õige vastus" + "</div>"
  } else{
    console.log("Incorrect")
    console.log(answerArea.value)
    console.log(correctAnswer)
    feedBackDiv.innerHTML = "<div id=incorrect>" + "Vale vastus" + "</div>"
  }
  getinfo()
  answerArea.value = ""
  
}
  
})


    