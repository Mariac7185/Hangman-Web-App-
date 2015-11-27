//This class is responsible for:
//-ascertaining the number of words in a category
//-Detecting which category is selected
//-Pick a random word from the category selected

var word = function(){
		var numWords;
		var wordIndex;
		var category;
		
		this.getSelectedCategory = function(){
			var e = document.getElementById("menu");
			this.category=e.options[e.selectedIndex].value;
		}

		this.setNumCategories = function(num){
			this.numCategories = num;
		}

		this.setWordIndex = function(){
			this.wordIndex = Math.floor((Math.random() * this.numCategories) );
		}

		this.getNumWords =function(){

		}

		//This function will read the contents of the file 
		this.readFile = function(fileName){

		}
}