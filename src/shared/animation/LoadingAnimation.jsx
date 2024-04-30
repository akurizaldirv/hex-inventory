import bowl from "../../assets/animations/bowl.json"
import Lottie from "lottie-react"

const LoadingAnimation = () => {
	return (
		<div className="d-flex justify-content-center my-5">
			<span style={{ width: 200 }}>
                <Lottie animationData={bowl} />
            </span>
		</div>
	);
};

export default LoadingAnimation;
