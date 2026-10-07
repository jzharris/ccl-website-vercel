import PropTypes from "prop-types";
import clsx from "clsx";
import ForgotPasswordForm from "@components/forgot-form";

const ForgotPasswordArea = ({ className, space }) => (
    <div
        className={clsx(
            "login-area",
            space === 1 && "rn-section-gapTop rn-section-gapBottom",
            className
        )}
    >
        <div className="container">
            <div className="row g-5">
                <ForgotPasswordForm />
            </div>
        </div>
    </div>
);

ForgotPasswordArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

ForgotPasswordArea.defaultProps = {
    space: 1,
};
export default ForgotPasswordArea;
