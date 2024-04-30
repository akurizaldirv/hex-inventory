const AuthService = () => {
	const credetial = {
		username: "admin",
		password: "12345678",
	};

	let username = "";
    let loginAt = "";

	const login = (input) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (
					input.username === credetial.username &&
					input.password === credetial.password
				) {
					username = input.username;
					loginAt = new Date().toISOString();

					resolve("Berhasil login");
				} else {
					reject("Username dan Password tidak boleh kosong");
				}
			}, 1000);
		});
	};

	const logout = () => {
		return new Promise((resolve) => {
            username = "";
            loginAt = "";
			resolve("Berhasil logout");
		});
	};

	const getUserInfo = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({username, loginAt});
			}, 1500);
		});
	};

	return { login, logout, getUserInfo };
};

export default AuthService;
