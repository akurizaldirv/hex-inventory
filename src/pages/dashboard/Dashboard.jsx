import { Component } from "react";

export default class Dashboard extends Component {
	render() {
		return (
			<div
				className="text-center rounded-4 px-4 py-2"
				style={{ marginRight: "2vh", marginBottom: "2vh" }}
			>
				<div className="my-5">
					<img
						src="https://thumbs.dreamstime.com/b/inventory-management-words-white-paper-against-background-table-numbers-calculator-banknotes-inventory-215015659.jpg"
						alt="HEX Inventory"
						width={300}
						className="rounded-5"
					/>
				</div>
				<h1>HEX Inventory</h1>
				<p style={{ maxWidth: "500px" }} className="mx-auto">
					Selamat datang di Hex Inventory, solusi unggulan untuk
					manajemen inventaris bisnis Anda. Dengan teknologi canggih
					dan antarmuka yang mudah digunakan, Hex Inventory membantu
					Anda mengelola stok barang dengan efisien dan akurat. Pantau
					persediaan secara real-time, dapatkan notifikasi otomatis
					saat stok menipis, dan buat laporan mendalam untuk analisis
					yang lebih baik. 
				</p>
			</div>
		);
	}
}
