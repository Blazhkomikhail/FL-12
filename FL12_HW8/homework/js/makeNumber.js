function makeNumber (str) {
	let readyStr = '';
	for (let i = 0; i < str.length; i++) {
		if ( isFinite(str[i]) ) {
			readyStr += str[i];
		}
	}
	return readyStr;
}

makeNumber ('erer384jjjfd123');