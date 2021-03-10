const quotes = [
	'예를 들어 업무 과정에서 이메일을 보내거나 문자메시지를 보내는 경우는 물론이고, 직장에서 각종 보고서나 자료를 작성할 때도 반드시 오타 여부를 체크하는 게 좋다. 오타가 몇개 정도 있다고 해서 받아보는 측이 내용을 이해 못 하는 것은 아니지만, 이러한 오타를 보게 되면 내용과는 별개로 문서 작성자나 발신자의 진정성이나 신뢰성이 꽤 손상을 입는 것이 현실이다.'
	'나는 기린 그림을 그렸고, 옆 친구도 기린 그림을 그렸다',
	'There is nothing more deceptive than an obvious fact.',
	'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
	'I never make exceptions. An exception disproves the rule.',
	'What one man can invent another can discover.',
	'Nothing clears up a case so much as stating it to another person.',
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
		
		typedValueElement.className = 'error';
	}
});
