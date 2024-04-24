import { Component } from "react";
import Toast from "../toast/Toast";

const WithState = (WrappedComponent) => {
	return class HOC extends Component {
		state = {
			isLoading: false,
			showToast: false,
			toastMessage: "",
			toastColor: "primary",
		};

		handleShowLoading = () => {
			this.setState({ isLoading: true });
		};

		handleHideLoading = () => {
			this.setState({ isLoading: false });
		};

		handleShowToast = (message, color) => {
			this.setState({
				showToast: true,
				toastMessage: message,
				toastColor: color || this.state.toastColor,
			});

			setTimeout(() => {
				this.setState({
					showToast: false,
				});
			}, 3000);
		};

		render() {
			return (
				<>
					{this.state.showToast && (
						<Toast
							color={this.state.toastColor}
							message={this.state.toastMessage}
						/>
					)}
					<WrappedComponent
						{...this.props}
						isLoading={this.state.isLoading}
						handleHideLoading={this.handleHideLoading}
						handleShowLoading={this.handleShowLoading}
						handleShowToast={this.handleShowToast}
					/>
				</>
			);
		}
	};
};

export default WithState;
