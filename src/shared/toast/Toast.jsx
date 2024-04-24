import { Component } from "react";
import PropTypes from "prop-types";

class Toast extends Component {
	render() {
		const { message, color } = this.props;

		return (
			<div
				className={`position-absolute z-3 toast show top-25 end-0 me-4 mt-3 align-item-center text-bg-${color} text-white border-0`}
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div className="d-flex toast-body">
					{message}
					<button
						className="btn-close btn-close-white me-2 m-auto"
						type="button"
						data-bs-dismiss="toast"
						aria-label="close"
					></button>
				</div>
			</div>
		);
	}
}

Toast.propTypes = {
	message: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};

export default Toast;
