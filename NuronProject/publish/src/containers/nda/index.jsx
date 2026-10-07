import PropTypes from "prop-types";
import clsx from "clsx";

const NDAArea = ({ className, space, conditions }) => (
    <div
        className={clsx(
            "rn-privacy-policy-area",
            space === 1 && "ptb--30",
            className
        )}
    >
        <div className="container">
            <div className="row mb_dec--50">
                <div className="offset-lg-2 col-lg-8 ">
                    <div className="privacy-wrapper">
                        <h1>Beta Tester Non-Disclosure Agreement</h1>
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
                    <Button path="#" size="medium" className="mr--15 ml--25">
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

NDAArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    conditions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            descriptions: PropTypes.arrayOf(PropTypes.string),
        })
    ),
};
NDAArea.defaultProps = {
    space: 1,
};

export default NDAArea;
