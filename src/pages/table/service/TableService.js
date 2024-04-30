const TableService = () => {
	let tables = [
		{
			id: 1,
			nama: "Meja",
			status: true
		},
	];

	const create = (table) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (table) {
					tables = [...tables, table];
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
				resolve(tables);
			}, 2000);
		});
	};

	const update = (updated) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (updated) {
					let found = false;
					tables = tables.map((table) => {
						if (table.id === updated.id) {
							found = true;
							return updated;
						} else {
							return table;
						}
					});
					if (found) {
						resolve("Data berhasil disimpan");
					} else {
						reject("Data tidak ditemukan");
					}
				}
			}, 2000);
		});
	};

	const remove = (id) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (id) {
					const idx = tables.findIndex((table) => table.id === id);
					if (idx !== -1) {
						tables = tables.filter((table) => table.id !== id);
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

	return { create, getAll, update, remove };
};

export default TableService;
