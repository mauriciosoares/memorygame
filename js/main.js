var game = (function() {
	'use strict';

	var cards = [],
	nCards,
	timer = 0,
	timerDiv = document.getElementById('timer'),
	timerInterval,
	board = document.getElementById('board'),
	activeCards = document.getElementsByClassName('active');

	// function to start game, receives the number of pair of cards
	function start (numberOfCards) {
		document.getElementById('question').remove();
		nCards = numberOfCards * 2;
		createCards();

		timerDiv.innerHTML = timer;
		timerInterval = setInterval(function() {
			timer++;
			timerDiv.innerHTML = timer;
		}, 1000);
	}

	// create the cards in the game
	function createCards () {
		var valueCard = 1;

		// counts the number of cards defined by the user
		for(var i = 1; i <= nCards; i++) {
			// use 3 variables to define card front and back
			var newCard, frontCard, backCard;

			// create the element of the card
			newCard = document.createElement('div');
			newCard.className = 'card';
			newCard.setAttribute('data-card', Math.floor(valueCard));
			// adds an event listener to the click of the card
			newCard.addEventListener('click', cardClick);

			// create the element front of the card
			frontCard = document.createElement('div');
			frontCard.className = 'face front';
			frontCard.innerHTML = Math.floor(valueCard);

			// create the element back of the card
			backCard = document.createElement('div');
			backCard.className = 'face back';

			// append the front and back of the card to the newCard variable
			newCard.appendChild(frontCard);
			newCard.appendChild(backCard);

			// adds the new card to the array of cards
			cards.push(newCard);

			// increase the value of card by half, os when using the Math.floor function it 
			// will get always 2 cards of each
			valueCard = valueCard + 0.5;
		}

		shuffle();
	}

	// internet found function to shuffle an array :D
	function shuffleCards(o){
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

	// shuffle the cards and append everything to the body
	function shuffle () {
		shuffleCards(cards);

		cards.forEach(function(e) {
			board.appendChild(e);
		});
	}

	function cardClick() {
		var theCard = this;

		// when clicked on a card, it verifys if there is already 2 active cards on the table,
		// and if the clicked card isnt already active or inactive
		if(activeCards.length < 2){
			if(!theCard.classList.contains('inactive') && !theCard.classList.contains('active')) {

				// activate the card
				theCard.classList.add('active');
				checkCards();
			}
		}
	}

	// check the selected cards
	function checkCards() {
		activeCards = document.getElementsByClassName('active');

		// if there is 2 shown cards on the table
		if(activeCards.length === 2){
			// gets both cards
			var card1 = activeCards[0],
				card2 = activeCards[1];

			// check if they are the same card
			if(card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
				// decreases the number of cards on the table
				nCards = nCards - 2;

				// set timetimeout to give a little magic :S
				setTimeout(function() {
					card1.classList.remove('active');
					card1.classList.add('inactive');
					card2.classList.remove('active');
					card2.classList.add('inactive');

					// if there is no card on the table, finishes the game
					if(nCards === 0) {
						endGame();
						return false;
					}
				}, 2000);

			// if they arent the same, then it turns off the card
			}else{
				setTimeout(function() {
					card1.classList.remove('active');
					card2.classList.remove('active');
				}, 2000);
			}

		}
	}

	// finishes the game
	function endGame() {
		clearInterval(timerInterval);
		alert('Você terminou o jogo em ' + timer + 'segundos :)');
	}

	return{
		start: start
	};
}());