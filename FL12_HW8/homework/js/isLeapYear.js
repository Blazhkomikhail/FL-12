function isLeapYear(data) {
	const DATE = new Date(data);
	let year = '';
	let isLeapYearCheck;
	let result;

	if ( !isNaN( DATE.getFullYear() ) ) {
		year = DATE.getFullYear();
        isLeapYearCheck = new Date(year, 1, 29).getDate() === 29;
        result = isLeapYearCheck ? `${year} is a leap year` : `${year} is not a leap year`;
            return result;
	} else {
		return 'Invalid Date';
	}
}

isLeapYear('2020-01-01 00:00:00'); 