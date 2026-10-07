import PropTypes from "prop-types";
import clsx from "clsx";

const VerifyFailedArea = ({ className, space }) => {
    return (
        <div
            className={clsx(
                "verify-failed-area",
                space === 1 && "rn-section-gapTop rn-section-gapBottom",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <h4>Validating code failed, please request another code and try again</h4>
                </div>
            </div>
        </div>
    );
}

VerifyFailedArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

VerifyFailedArea.defaultProps = {
    space: 1,
};
export default VerifyFailedArea;
