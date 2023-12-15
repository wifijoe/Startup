function login() {
	loginOrCreate(`/api/auth/login`);
}

function register() {
	loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
	const username = document.querySelector("#user-name")?.value;
	const password = document.querySelector("#pass")?.value;

	if (!username || !password) {
		const errorMessage = document.querySelector("#error-message");
		errorMessage.textContent = `ERROR: No username or password!`;
		return
	}

	const response = await fetch(endpoint, {
		method: 'post',
		body: JSON.stringify({username: username, password, password}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	if (response.ok) {
		localStorage.setItem('username', username);
		window.location.href = "Home.html";
	} else {
		const body = await response.json();
		const errorMessage = document.querySelector("#error-message");
		errorMessage.textContent = `ERROR: ${body.msg}`;
	}
}