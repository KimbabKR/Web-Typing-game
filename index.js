const quotes = [
	'개이득.',
	'나는 기린 그림을 그렸고, 옆 친구도 기린 그림을 그렸다',
	'죽을 약 곁에 살 약이 있다.',
	'사람은 어렸을 때부터 좋은 습관을 들이는 것이 중요하다.',
	'꿩 먹고 알 먹는다.',
	'기와 한 장 아껴서 대들보 썩힌다.',
	'앉아서 주고 서서 받는다.',
	'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// default value for startTime (will be set on start)
let startTime = Date.now();

// grab UI items
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {

	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];

	words = quote.split(' ');

	wordIndex = 0;

	const spanWords = words.map(function(word) { return `<span>${word} </span>`});

	quoteElement.innerHTML = spanWords.join('');

	quoteElement.childNodes[0].className = 'highlight';

	messageElement.innerText = '';

	typedValueElement.value = '';

	typedValueElement.focus();

	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {

	const currentWord = words[wordIndex];

	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {


		const elapsedTime = new Date().getTime() - startTime;
		const message = `축하드립니다! 당신은 ${elapsedTime / 1000} 초 안에 완료하셨습니다.`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {

		
		typedValueElement.value = '';
		
		wordIndex++;
		
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		
		typedValueElement.className = '';
	} else {
		
		typedValueElement.className = 'is-invalid';
	}
});
