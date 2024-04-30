const MenuService = () => {
	let menus = [
		{
			id: 1,
			nama: "Nasi Goreng",
			harga: 20000,
		},
	];

	const create = (menu) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (menu) {
					menus = [...menus, menu];
					resolve("Berhasil menambahkan data");
				} else {
					reject("Data tidak boleh kosong");
				}
			}, 1000);
		});
	};

	const getAll = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(menus);
			}, 2000);
		});
	};

	const remove = (id) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (id) {
					const idx = menus.findIndex((menu) => menu.id === id);
					if (idx !== -1) {
						menus = menus.filter((menu) => menu.id !== id);
						resolve("Berhasil menghapus data");
					} else {
						reject("Index tidak ditemukan");
					}
				} else {
					reject("Index tidak boleh kosong");
				}
			}, 3000);
		});
	};

	return { create, getAll, remove };
};

export default MenuService;
