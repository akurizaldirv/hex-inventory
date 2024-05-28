import loading from "../../assets/animations/loading.json"
import Lottie from "lottie-react"

const LoadingAnimation = () => {
	return (
		<div className="d-flex justify-content-center my-5">
			<span style={{ width: 200 }}>
                <Lottie animationData={loading} />
            </span>
		</div>
	);
};

export default LoadingAnimation;
