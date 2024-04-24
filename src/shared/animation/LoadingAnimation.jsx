import food from "../../assets/animations/food.json"
import bowl from "../../assets/animations/bowl.json"
import Lottie from "lottie-react"

const LoadingAnimation = () => {
	return (
		<div className="d-flex justify-content-center myy-5">
			<span style={{ width: 200 }}>
                <Lottie animationData={bowl} />
            </span>
		</div>
	);
};

export default LoadingAnimation;
