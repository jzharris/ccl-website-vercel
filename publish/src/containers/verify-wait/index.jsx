import PropTypes from "prop-types";
import clsx from "clsx";

const VerifyWaitArea = ({ className, space }) => {
    return (
        <div
            className={clsx(
                "verify-wait-area",
                space === 1 && "rn-section-gapTop rn-section-gapBottom",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <h4>Validating code, please wait...</h4>
                </div>
            </div>
        </div>
    );
}

VerifyWaitArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

VerifyWaitArea.defaultProps = {
    space: 1,
};
export default VerifyWaitArea;
