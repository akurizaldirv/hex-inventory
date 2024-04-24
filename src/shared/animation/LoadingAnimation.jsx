import food from "../../assets/animations/food.json"
import Lottie from "lottie-react"

const LoadingAnimation = () => {
	return (
		<div className="d-flex justify-content-center myy-5">
			<span style={{ width: 200 }}>
                <Lottie animationData={food} />
            </span>
		</div>
	);
};

export default LoadingAnimation;
