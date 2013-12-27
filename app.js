var openBrackets = [];
var closeBrackets = [];
var categories = [];
var sentence = "";
var categoryArrays = [];
var combinationArrays = [];
var finalSentences = [];
var finalString = "";

function determineCategories(){
  var container = document.getElementById('putArea')
  container.innerHTML = '';

  sentence = document.getElementById("userSentence").value
  openBrackets = [];
  closeBrackets = [];
  categories = [];

  for (var i = 0; i < sentence.length; i++) {
    if(sentence[i] === "[") {
      openBrackets.push(i)
    };
    if(sentence[i] === "]") {
      closeBrackets.push(i)
    };
  };

  for (var i = 0; i < openBrackets.length; i++) {
    word = sentence.substring(openBrackets[i] +1, closeBrackets[i])
    categories.push(word)
  };

  for (var i = 0; i < categories.length; i++) {
    var categoryTitle = document.createElement("div");
    categoryTitle.innerHTML = categories[i]
    categoryTitle.class = "categoryTitle"
    container.appendChild(categoryTitle)

    var input = document.createElement('textarea');
    input.id = categories[i];
    input.class = "categoryTextArea";
    container.appendChild(input);
  }

  document.getElementById('categoriesDirections').style.visibility = 'visible';
  document.getElementById('combineButton').style.visibility = 'visible';
}

function createLists(){
  categoryArrays = [];
  $.each(categories, function(index, value){
    var array = []
    var string = document.getElementById(categories[index]).value
    array = string.split("\n")
    categoryArrays[index] = array
  })
}

function combinationsController() {
  combinationArrays = [];
  createLists();
  combinations(categoryArrays, log);
  assembleSentences();
  printSentences();
}

function combinations(choices, callback, prefix){
  if(!choices.length) {
    combinationArrays.push(prefix)
    return callback(prefix);
  }

  for(var c = 0; c < choices[0].length; c++) {
      combinations(choices.slice(1), callback, (prefix || []).concat(choices[0][c]));
  }
}

function log(message){ if(typeof console == "object"){ console.log(message); } }

function assembleSentences(){
  finalSentences = [];
  $.each(combinationArrays, function(index,value){
    combinationArrays[index].reverse()
  })
  openBrackets.reverse();
  closeBrackets.reverse();
  $.each(combinationArrays, function(index,value){
    var newSentence = sentence
    $.each(combinationArrays[index], function(index2, value2){
      newSentence = newSentence.substring(0, openBrackets[index2]) + value2 + newSentence.substring(closeBrackets[index2] +1)
    })
    console.log(newSentence)
    finalSentences.push(newSentence + "</br>")
  })
}

function printSentences(){
  finalString = ""
  $.each(finalSentences, function(index, value){
    finalString = finalString + value
  })
  document.getElementById("outputArea").innerHTML = finalString;
}