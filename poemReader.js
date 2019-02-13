function readText() {
    var poems;
    const fs = require('fs')
    var poem = fs.readFile('Poem1.txt', (err, data) => { 
    	if (err) throw err; 
    	var poem = data.toString();
    	var splitPoem = poem.split("/n");
    	for (var i = 0; i < splitPoem.length; i++) {
            console.log(splitPoem[i]);
    	}
    });
}

// function readText() {
//                     var poems;
//                     const fs = require('fs');
//                     var poem = fs.readFile('Poem1.txt', (err, data) => { 
//                       if (err) throw err; 
//                       var poem = data.toString();
//                       var splitPoem = poem.split("/n");
//                       for (var i = 0; i < splitPoem.length; i++) {
//                             console.log(splitPoem[i]);
//                       }
//                       document.getElementById("stanza").innerHTML = splitPoem;
//                     }); 
//                 }

// window.addEventListener('load', loadPoems, false);
// console.log(poems[0]);
// function loadPoems() {
// 	var newDiv = window.document.createElement("div");
// 	newDiv.classList.add("mySlides");
// 	newDiv.classList.add("fade");
// 	var textDiv = window.document.createElement("div");
// 	textDiv.classList.add("text");
//     for (var i = 0; i < poem[0].length; i++) {
//     	var newContent = window.document.createTextNode("Hi there and greetings!");
//     	textDiv.appendChild(newContent);
//     }
// 	newDiv.appendChild(textDiv);  
// 	var currentDiv = window.document.getElementsByClassName("slideshow-container")[0]; 
// 	currentDiv.appendChild(newDiv);
// }


