window.onload=function(){
		 document.getElementById("selectCategory").style.display='none';
		 //document.getElementById("invalidInput").style.display='none';
		 document.getElementById("statusMessage1").style.display='none';
		 document.getElementById("statusMessage2").style.display='none';
		 category="select";
		// var category = e.options[e.selectedIndex].text;
		//alert("hi");

		// alert(category);
	//setAutoFocus()
	}


	var imageArray = ['./hangmanImages/Image1.gif','./hangmanImages/Image2.gif','./hangmanImages/Image3.gif','./hangmanImages/Image4.gif','./hangmanImages/Image5.gif','./hangmanImages/Image6.gif','./hangmanImages/Image7.gif','./hangmanImages/Image8.gif'];

	var index = 0;

	var wordArray;
	var guessArray = []; //This holds the blank spaces and the correct guesses
	var indexesOfGuess = [];
	var missesArray = [];
	var correctGuesses = [];
	var missCount = 0;

	var imageArrayIndex = 0;
	var word;
	var category;
	var win = false; 
	var lose=false;


//	document.write("<img src=\"" + imageArray[index] + "\" alt=\"hangmanImage\"/>");


	
	
	// document.write(word1.categoryIndex);
	//Calls autofocus after each menu change
	function getCategory(categorySelected){
		//alert(category);
		category=categorySelected;
		//setAutoFocus();


		// if(category===null)	
			//alert("null");
		if(category==="select"){
			setDefaultMessage();

		}
		else{

			loadFile(category);
			setAutoFocus();
			clearDiv("misses");
			clearDiv("statusMessage1");
			clearDiv("statusMessage2");
			resetImage();
			resetInput();
			hideDiv('selectCategory');
			hideDiv("statusMessage1");
			hideDiv("statusMessage2");
		//	hideDiv('invalidInput');
			showDiv('input');
			showDiv('button');
		}
	}

    /*This function loads the file of the category selected, line by line.
      It calls the makeArray function which the converts the javascript object (text from the file) into a string
    */
	function loadFile(category){
		if(category!=='select'){
			var file = "file:///C:/Users/Avi/Desktop/Dropbox/HANGMAN (WEB)/".concat(category).concat(".txt");
			var lines;
			//alert(file);
			var rawFile =  new XMLHttpRequest();
			rawFile.open("GET", category.concat(".txt"),false);
			//alert(rawFile.open("GET", category.concat(".txt"),false));
			rawFile.onreadystatechange = function (){
				if(rawFile.readyState === 4){				
				//alert('hi');			//document is ready to parse 																  
					if(rawFile.status === 200 || rawFile.status ===0){    //file is found 
						var allText = rawFile.responseText;
						var lines  = rawFile.responseText.split("\n");    //Reading the file line by line. Adding a comma after each line
						makeArray(lines);				

					}
				}
			}
			rawFile.send(null);
		}
		else{
			clearDiv("wordlines");
			clearDiv("statusMessage1");
			clearDiv("statusMessage2");
		}

	}

	/*This function receives the data read in from the file as an object
	  It then converts that object to a string
	  It then splits the string (after each comma) and places it into an array
	 */
	function makeArray(fileData){
		var str = String(fileData)	
		//alert(str);
		wordArray= str.split(",");
		getWord();
		printBlankSpaces();
	}

	/*getWord() determines the size of the category based on the length of the array of words which were read in.
	  It then selects a random number from 0 to that number. This number is then used as the index of the array to 
	  determine the word to be selected.
	 */
	function getWord(){
		var categorySize = wordArray.length;
		word = wordArray[Math.floor((Math.random() * categorySize))];
		alert(word);
	}

	/*printBlankSpaces finds the length of the word selected and outputs that blank '_' black lines 
	  to the screen It also pushes the correct number of dashes to guessArray. 
	 */
	function printBlankSpaces(){
		guessArray = []					//making the guessArray empty after each new word is selected
		var wordLength = word.length;
		var blankLines="";
		var div ="";
		
		blankLines+="<pre>";

		for(var x = 0; x < wordLength -1; x++){
			blankLines += " _ ";
			guessArray.push(" _ ");
		}

		blankLines+="</pre>";

		div = document.getElementById("wordlines");
		div.innerHTML = blankLines;
	}

	/*This function sets the focus of the textbox
	*/
	function setAutoFocus(){
		document.getElementById("userInput").focus();
	}

	/*ClearLines removes the blank lines which were printed 'printBlankSpaces'
	*/
	function clearDiv(id){
		// document.getElementById(id).style.display='none';
		div = document.getElementById(id);
		div.innerHTML ='';	
	//	alert(id);
		if(id==='misses'){
			document.getElementById("misses").innerHTML='<pre>_    _    _    _    _    _ </pre>';
			// alert(d);
			// d.write='_    _    _    _    _    _ ';
		}
	}

	function showDiv(id){
		document.getElementById(id).style.display='block';
		setAutoFocus();
	}

	function hideDiv(id){
		 document.getElementById(id).style.display='none';

	}

	// function clearMisses(){
	// 	div = document.getElementById("misses");
	// 	div.innerHTML = "";
	//}

	/*handleInput collects information entered from the form and checks if it is in the word.
	  If the letter is on the word, this function calls the changeWordLines function
	  Otherwise, it calls the "displayWrongInput" function. 
	 */

	 function handleInput(){
	 
	 	var guess= document.getElementsByTagName("input")[0].value;

	 // 	clearDiv("statusMessage1");
		// clearDiv("statusMessage2");
		hideDiv("statusMessage1");
		hideDiv("statusMessage2");
	 	//alert(guess.charCodeAt(0));
	 	//	alert(typeof(category));

	 	if( guess.length == 0 && category==="select"){
	 		//showDiv("invalidInput");
	 		invalidInput();

	 	}
	    else if(guess.charCodeAt(0)<65 || guess.charCodeAt(0) >122) {
	 		//showDiv("invalidInput");
	 		invalidInput();
	 		setAutoFocus();
	 	}
	   else if(guess.length==0){
	 		// showDiv('selectCategory');
	 		 // alert('blank input');
	 		 invalidInput();
	 	}
	    else if(category==="select"){
	 		//alert('choose something else');
	 		//showDiv('selectCategory');
	 		invalidInput();
	 	}
	 	else{
	 		//hideDiv('selectCategory');
	 		hideDiv("statusMessage1");

		 	guess= guess.toLowerCase();
		 	//alert(guess);
		 	//alert(guess + " " + word);

		 	//indexOfGuess checks if the guess is in the word
		 	var indexOfGuess = word.search(guess);

		 	var duplicateGuess = correctGuesses.indexOf(guess);
		 	//alert(duplicateGuess);
		 	//If the guess is in the word, the for loop pushes all of its positions into the indexesOfGuess Array
		 	if(indexOfGuess != -1){
		 		if(duplicateGuess != -1 && correctGuesses.length != 0){
		 			duplicateEntry();
		 		}
		 		else{
			 		correctGuesses.push(guess);
			 		
			 		for(var x =0; x < word.length; x++){
				 		if(guess == word.charAt(x)){
				 			indexesOfGuess.push(word.charAt(x));
				 			changeGuessArray(guess, x);
			 			}	
			 		}

			 		// alert(indexesOfGuess.length + " " + word.length);

			 		if(indexesOfGuess.length == word.length -1){
		 				//alert("you win");
		 				console.log(indexesOfGuess.length + " " + word.length);
		 				youWin();
		 				win = true;
		 				getWinningImage();
		 				//clearDiv("wordlines");
		 				hideDiv("input");
		 				hideDiv("button");
		 			}
			 		//alert("hit");
			 		//alert(word.length);
			 		changeGuessArray(guess,indexesOfGuess);

			 		if(win==false){
			 			goodGuess();
			 		}

			 		updateBlankLines();
			 	}
		 	}
		 	else{
		 		guess += " ";
		 		if(missesArray.indexOf(guess) == -1){
			 		missesArray.push(guess);
			 		alert(missesArray.length);
			 		//changeMissesArray(guess);
			 		printMissesArray(guess);
			 		if(missesArray.length == 6){
		 				//alert("you lose");
		 				console.log(indexesOfGuess.length + " " + word.length);

		 				youLose();
		 				//clearDiv("wordlines");
		 				hideDiv("input");
		 				hideDiv("button");
		 				getLosingImage();

		 			}
		 			else{
			 			changeImage();
			 			badGuess();
			 		}
			 	}
			 	else{
			 		badGuess();
			 	}
		 	}

		 	//Resetting textbox
		 	document.getElementById("userInput").value="";
		 	document.getElementById("userInput").focus();
		 }
		 
	 } 

	 /*This function creates a new string with the blanks and correct guess
	 */
	 function changeGuessArray(guess, index){
	 	guessArray[index] = " " + guess + " ";
	 }

	 function changeMissesArray(guess){
	 	missesArray[missCount] = guess + "  ";
	 	missCount++;

	 }

	 function printMissesArray(miss){
	 	var misses ="";

	 	misses += "<pre>";

	 	//alert(missesArray.length);

	 	var div ="";
		for(var x = 0; x <= missesArray.length -1; x++){
			misses+= missesArray[x];	
			//alert(misses);		
		}

		misses+="</pre>";
		div = document.getElementById("misses");
		div.innerHTML = misses;

	 }

	 /*This function updates the blank lines
	 */
	 function updateBlankLines(){
	 	var newString="";

	 	newString+="<pre>";
	 	//alert(guessArray);

	 	for(var x =0; x < guessArray.length; x++){
	 		newString += guessArray[x];
	 		//alert(guessArray[x]);
	 	//	console.log(newString);
	 	}	

	 	//alert(newString);
	 	newString+="</pre>";

	 	div = document.getElementById("wordlines");

		div.innerHTML = newString;
		div.style.fontSize="20px";
	 }

	 /*This function changes the picture for every wrong guess
	 */
	 function changeImage(){
	 	imageArrayIndex++;
	 	document.getElementById("pic").src=imageArray[imageArrayIndex];
	 }

	 /*This function switches the image to the winning image 
	 */
	 function getWinningImage(){
	 	document.getElementById("pic").src=imageArray[7];
	 }

	 function getLosingImage(){
	 	document.getElementById("pic").src=imageArray[6];
	 	//  div=document.getElementById('playingArea');
	 	//  div.style.display="none";
	 	// document.getElementById('wordlines').innerHTML='';

	 }

	 function resetImage(){
	 	document.getElementById("pic").src=imageArray[0];
	 }

	 function duplicateEntry(){
	 	var message = "You entered that letter already!"
	 	var div = "";

	 	div = document.getElementById("statusMessage1");
	 	div.innerHTML = message;
	 	showDiv("statusMessage1");

	 }

	 function invalidInput(){
	 	var message = "Invalid Entry! Only LETTERS (a-z) are allowed";
	 	var div = "";
	 		// alert("Invalid Input");
	 	if(category==="select"){
	 		message="Please select a category first!";
	 	}

	 	div = document.getElementById("statusMessage1");
	 	div.innerHTML = message;
	 	alert(div.innerHTML);
	 	showDiv("statusMessage1");
	 }


	 function youLose(){
	 	var message = "<strong>You lost!</strong> The word was <strong>" + word + "</strong><br> To play again, select another category!";
	 	var div = "";
	 	lose=true; 

	 	div = document.getElementById("statusMessage1");	 	
	 	div.innerHTML = message;
	 	showDiv("statusMessage1");
	 	
	 }

	 function goodGuess(){
	 	var message = "Good Guess!";
	 	var div = "";

	 	div = document.getElementById("statusMessage2");
	 	div.innerHTML = message;
	 	showDiv("statusMessage2");
	 }

	  function badGuess(){
	  	var message = "Incorrect Guess! Try again";
	 	var div = "";

	 	div = document.getElementById("statusMessage1");
	 	div.innerHTML = message;
	 	showDiv("statusMessage1");
	 }

	 function setDefaultMessage () {
	 	var message = "<p>Select a category!</p>";
	 	var div = "";

	 	div = document.getElementById("wordlines");
	 	div.innerHTML = message;
	 }

	 function youWin(){
	 	var message = "<strong>Congrats! You won!</strong> To play again, select another category!";
	 	var div = "";

	 	div = document.getElementById("statusMessage2");
	 	div.innerHTML = message;

	 	showDiv("statusMessage2");


	 }

	 function resetInput(){
	 	// guessArray = []; //This holds the blank spaces and the correct guesses
		indexesOfGuess = [];
		missesArray = [];
		correctGuesses = [];
		missCount = 0;
	   	imageArrayIndex = 0;
	    index = 0;
	    win = false; 
	    setAutoFocus();
	 }

	 function setBlankLinesMisses(){


	 }
