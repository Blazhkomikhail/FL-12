let numberRange = {
	'min' : 0,
	'max' : 8
}

let isWantToPlay = confirm('Do you want to play a game?');

if ( isWantToPlay ) {
	let tempMaxNum = numberRange.max;
	let attemptsCount = 3;
	let totalPrize = '0' + '$';
	let startPossiblePrize = '100' + '$';
	let currentPrize = startPossiblePrize;
	let maxGamePrize = startPossiblePrize;

	while ( attemptsCount > 0 ) {
		
		let randomNum = Math.floor(Math.random() * (tempMaxNum - numberRange.min + 1)) + numberRange.min;
		let askUserNum = prompt(`Choose a roulette pocket number from ${numberRange.min} to ${tempMaxNum}
Attempts left: ${attemptsCount}
Total prize: ${totalPrize}
Possible prize on current attempt: ${currentPrize}`, '');

		if ( randomNum === Number(askUserNum) ) {

			totalPrize = parseInt(totalPrize) + parseInt(currentPrize) + '$';

			let isWinnerWantToPlay = confirm(`Congratulation, you won!
Your prize is: ${totalPrize}.
Do you want to continue?`);

			if ( isWinnerWantToPlay ) {
				attemptsCount = 3;
				maxGamePrize = parseInt( maxGamePrize ) * 2 + '$';
				currentPrize = maxGamePrize;
				tempMaxNum += 4; 
			} else {
				let isWinnerSure = confirm(`Thank you for your participation.
Your prize is: ${totalPrize}.
Maybe still you want to play a game?`);

				if ( isWinnerSure ) {
					attemptsCount = 3;
					maxGamePrize = parseInt( maxGamePrize ) * 2 + '$';
					currentPrize = maxGamePrize;
					tempMaxNum += 4; 
				} else {
					attemptsCount = 0;
					alert('See you...');
				}
			}

		} else if ( randomNum !== askUserNum && attemptsCount === 1 ) {

			alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
			let isWantToPlay = confirm('Do you want to play again?');

			if ( isWantToPlay ) {
				attemptsCount = 3;
				currentPrize = startPossiblePrize;
				totalPrize = '0' + '$';
				tempMaxNum = numberRange.max;
			} else {
				attemptsCount = 0;
			}
		} else {
			currentPrize = parseInt(currentPrize) / 2 + '$';
			attemptsCount--;
		}
	}
	
} else {
	alert( 'You did not become a billionaire, but can.' );
}