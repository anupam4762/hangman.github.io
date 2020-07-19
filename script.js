const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'java', 'google', 'node', 'python', 'android', 'kotlin', 'eclipse', 'arduino', 'sublime', 'excellent', 'hangman', 'business', 'startup', 'amazon'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show the word
function showWord(){
	wordEl.innerHTML = `
	${selectedWord
		.split('')
		.map(
			letter => ` 
			<span class="letter">
			${correctLetters.includes(letter) ? letter : '' }
			</span>
			`
			)
		.join('')}
	`;

	const innerWord = wordEl.innerText.replace(/\n/g,'');
	if(innerWord === selectedWord){
		finalMessage.innerText = 'Congratulations! You won!' ;
		popup.style.display = 'flex';
	}
}

//update the wrong letters array
function updateWrongLettersEl(){
	 // Display wrong letters
	  wrongLettersEl.innerHTML = `
	    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
	    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
	  `;

	  //figure parts display
	  figureParts.forEach((part, index) => {
	  	const errors = wrongLetters.length;
	  	if(index < errors){
	  		part.style.display = 'block';
	  	}
	  	else {
	  		part.style.display = 'none';
	  	}
	  });

	  //check if lost
	  if(wrongLetters.length === figureParts.length){
	  	finalMessage.innerText = 'Unfortunately you lost!';
	  	popup.style.display = 'flex';
	  }
}

//Show notification function
function showNotification(){
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

//key letter presses
window.addEventListener('keydown', e => {
	/*console.log(e.keyCode);*/
	if(e.keyCode >= 65 && e.keyCode <= 90){
		const letter = e.key;
		if(selectedWord.includes(letter)){
			if(!correctLetters.includes(letter)){
				correctLetters.push(letter);
				showWord();
			} 
			else{
				showNotification();
			}
		}
		else {
			if(!wrongLetters.includes(letter)){
				wrongLetters.push(letter);
				updateWrongLettersEl();
			}
			else{
				showNotification();
			}
		}
	}
});

//play button event listener
playAgainBtn.addEventListener('click', () =>{
	wrongLetters.splice(0);
	correctLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];
	showWord();

	updateWrongLettersEl();
	popup.style.display = 'none';

});
showWord();