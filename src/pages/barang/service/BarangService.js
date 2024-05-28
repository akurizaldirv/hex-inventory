const BarangService = () => {
	let barangs = [
		{
			id: 1,
			nama: "Meja",
			status: true
		},
	];

	const create = (barang) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (barang) {
					barangs = [...barangs, barang];
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
				resolve(barangs);
			}, 2000);
		});
	};

	const update = (updated) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (updated) {
					let found = false;
					barangs = barangs.map((barang) => {
						if (barang.id === updated.id) {
							found = true;
							return updated;
						} else {
							return barang;
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
					const idx = barangs.findIndex((barang) => barang.id === id);
					if (idx !== -1) {
						barangs = barangs.filter((barang) => barang.id !== id);
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

export default BarangService;
