import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";

const TermsAndConditionsArea = ({ className, space, conditions }) => (
    <div
        className={clsx(
            "terms-condition-area",
            space === 1 && "ptb--30",
            className
        )}
    >
        <div className="container">
            <div className="row">
                <div className="offset-lg-2 col-lg-8 ">
                    <div className="condition-wrapper">
                        <h1>Terms and Conditions</h1>
                        {conditions?.map((condition) => (
                            <>
                                <h2>{condition?.title}</h2>
                                {condition?.descriptions.map((description) => (
                                    <p>{description}</p>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="row mt--50">
                <div className="offset-lg-2 col-lg-8">
                    <Button path="#" size="medium" className="mr--15">
                        Accept
                    </Button>
                    <Button path="#" color="primary-alta" size="medium">
                        Decline
                    </Button>
                </div>
            </div> */}
        </div>
    </div>
);

TermsAndConditionsArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};
TermsAndConditionsArea.defaultProps = {
    space: 1,
};

export default TermsAndConditionsArea;
