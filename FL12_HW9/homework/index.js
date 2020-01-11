function convert() {
	let resultArray = [];
	for (let i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] === 'number') {
			resultArray.push(arguments[i] + '');
		} else {
			resultArray.push( Number(arguments[i]) );
		} 
	}
	return resultArray;
}
convert('1', 2, 3, '4');

function executeforEach(arr, func) {
	for (let key of arr) {
		func(key);
	}
}
executeforEach([1,2,3], (el) => { 
	console.log(el * 2); 
});

function mapArray(arr, func) {
	let transformedArr = [];
	executeforEach(arr, function(key) {
		transformedArr.push( func(Number(key)) );
	})
	return transformedArr;
}
mapArray([2, '5', 8], (el) => {
	return el + 3;
});

function filterArray(arr, func) {
	let filteredArr = [];
	executeforEach(arr, (key) => {
		if ( func(key) ) {
			filteredArr.push(key);
		}
	})
	return filteredArr;
}
filterArray([2, 5, 8], (el) => { 
	return el % 2 === 0; 
});

function flipOver(str) {
	let revesedStr = '';
	for (let i = str.length - 1; i >= 0; i--) {
		revesedStr += str[i];
	}
	return revesedStr;
}
flipOver('hey world');

function makeListFromRange(arr) {
	let resultArr = [];
	for (let i = arr[0]; i <= arr[1]; i++) {
		resultArr.push(i);
	}
	return resultArr;
} 
makeListFromRange([2, 7]);

const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];

function getArrayOfKeys(arr, keyName) {
	let resultArr = [];
	executeforEach(arr, (key) => {
		resultArr.push(key[keyName]);
	})
	return resultArr;
}
getArrayOfKeys(actors, 'name');

function substitute(arr) {
	let resultArr = [];
	mapArray(arr, (key) => {
		key < 30 ? resultArr.push('*') : resultArr.push(key);
	})
	return resultArr;
}
substitute([58, 14, 48, 2, 31, 29]);

const date = new Date(2019, 0, 2);

function getPastDay(date, number) {
	let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let currentDate = new Date(date);
	currentDate.setDate(currentDate.getDate() - number);
	return `${currentDate.getDate()} ${monthArr[currentDate.getMonth()]} ${currentDate.getFullYear()}`; 
}
getPastDay(date, 1);

function formatDate(date) {
	const HOURS = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	const MINUTES = date.getMinutes() < 10 ? `0${date.getHours()}` : date.getMinutes();
	return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${HOURS}:${MINUTES}`;
	
}
formatDate(new Date());