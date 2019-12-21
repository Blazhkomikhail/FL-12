let a = +prompt('Enter A side length', '');
let b = +prompt('Enter B side length', '');
let c = +prompt('Enter C side length', '');

if ( a === '' || a === undefined 
  || b === '' || b === undefined 
  || c === '' || c === undefined ) {

	alert( 'Input values should be ONLY numbers' );

} else if ( a === 0 || b === 0 || c === 0 ) {

	alert( 'A triangle must have 3 sides with a positive definite length' );

} else if ( a < 0 || b < 0 || c < 0) {

	alert( 'Triangle doesn’t exist' );

} else {
	if ( a === b && a === c ) {

	console.log( 'Equilateral triangle' );

	} else if ( a === b || a === c || b === c ) {

	console.log( 'Isosceles triangle' );

	} else {

	console.log( 'Scalene triangle' );
	}
}
