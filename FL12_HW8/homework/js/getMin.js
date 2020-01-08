function getMin() {
	let smaller = arguments[0];
	for (let i = 0; i < 3; i++) {

		if (arguments[i] < smaller) {
			smaller = arguments[i];
		}
	}
	return smaller;
}

getMin (1, -2, 4);