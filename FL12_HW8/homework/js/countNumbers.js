function countNumbers (str) {
	let readyObj = {};
	for (let i = 0; i < str.length; i++) {
		if ( isFinite(str[i]) ) {
			if ( readyObj[ str[i] ] ) {
				readyObj[ str[i] ] += 1;
			} else {
				readyObj[ str[i] ] = 1; 
			}
		} 
	}
	return readyObj;
}	

countNumbers ('erer384jj4444666888jfd123');