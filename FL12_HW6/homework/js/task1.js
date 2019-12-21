let a = prompt('Enter a value', '');
let b = prompt('Enter b value', '');
let c = prompt('Enter c value', '');

if ( isFinite(a) 
	&& isFinite(b) 
	&& isFinite(c) 
	&& a !== 0 
	&& a !== null 
	&& b !== null 
	&& c !== null ) {
	
		let D = b * b - 4 * a * c; 
	
		if (D < 0) {

			console.log('no solutions');

		} else if (D === 0) {

			let x = -b / (2 * a);
			console.log(`x = ${x}`);

		} else {

			let x1 = ( -b + Math.sqrt(D) ) / (2 * a); 
			let x2 = ( -b - Math.sqrt(D) ) / (2 * a);
			console.log(`x1 = ${x1}, and x2 = ${x2}`);

		}

	} else {
		console.log('Invalid input data');
	}
   