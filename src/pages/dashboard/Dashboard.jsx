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
						src="https://beritausaha.com/wp-content/uploads/2022/12/trays-with-take-away-food-close-up-assorted-food_188913-1529.jpg"
						alt="Warung Makan Bahari"
                        width={300}
                        className="rounded-5"
					/>
				</div>
				<h1>Warung Makan Bakari</h1>
				<p style={{maxWidth: "500px"}} className="mx-auto">
					Warung Makan Bahari adalah tempat santai yang menyajikan
					hidangan laut segar. Dengan dekorasi sederhana yang
					mencerminkan nuansa laut, warung ini menyajikan menu beragam
					mulai dari ikan bakar, udang goreng, hingga sop seafood.
					Suasana hangat dan ramah membuat pengunjung betah menikmati
					hidangan lezat di sini.
				</p>
			</div>
		);
	}
}
