function pipe(num) {

	for (let i = 1; i < arguments.length; i++) {
		num = arguments[i](num);
	}

	return num;
}

function addOne(x) {
  return x + 1;
}

pipe(5, addOne, addOne);