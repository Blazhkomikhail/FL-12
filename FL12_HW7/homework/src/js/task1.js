let userCheck = prompt('Enter your email, please', '');
let users = {
	'user@gmail.com' : 'UserPass',
	'admin@gmail.com': 'AdminPass'
};

if ( !userCheck ) {

	alert('Canceled.');

} else if ( userCheck.length < 5 ) {

	alert('I don\'t know any emails having name length less than 5 symbols');

} else if ( users[userCheck] ) {

	let passwordCheck = prompt('Enter password', '');

	if ( passwordCheck === '' || passwordCheck === null ) {

		alert( 'Canceled.' );

	} else if ( passwordCheck === users[userCheck] ) {

		let isPassChange = confirm('Do you want to change your password?');

		if ( !isPassChange ) {

			alert('You have failed the change.');

		} else {
			let oldPass = prompt('Enter old password', '');

			if ( users[userCheck] === oldPass ){

				let newPass = prompt('Enter new password', '');

				if ( !newPass ) {

					alert('Canceled.');

				} else if ( newPass.length < 6 ) {

					alert('It’s too short password. Sorry.');

				} else {
					let repeatNewPass = prompt('Repeat new password, please', '');

					if ( newPass !== repeatNewPass ) {
						alert('You wrote the wrong password.');
					} else {
						alert('You have successfully changed your password.');
						// users[userCheck] = newPass;
					}
				}
			} else if ( oldPass === '' || oldPass === null ) {
				alert('Canceled.');
			} else {
				alert('Wrong password');
			}
		}
	} else {
		alert('Wrong password');
	}

} else {
	alert('I don’t know you');
}
