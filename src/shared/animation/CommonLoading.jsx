import loading from "../../assets/animations/loading.json";
import Lottie from "lottie-react";
const CommonLoading = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center background"
			style={{ height: "100vh", width: "100%" }}
		>
			<div style={{width: 300}} className="white-blur rounded-3 shadow">
				<span style={{ width: 200, margin: 50 }}>
					<Lottie animationData={loading} />
				</span>
			</div>
		</div>
	);
};

export default CommonLoading;
