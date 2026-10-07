import PropTypes from "prop-types";
import clsx from "clsx";

const VerifySucceededArea = ({ className, space }) => {
    return (
        <div
            className={clsx(
                "verify-succeeded-area",
                space === 1 && "rn-section-gapTop rn-section-gapBottom",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <h4>Your email has been changed!</h4>
                </div>
            </div>
        </div>
    );
}

VerifySucceededArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

VerifySucceededArea.defaultProps = {
    space: 1,
};
export default VerifySucceededArea;
