import PropTypes from "prop-types";
import clsx from "clsx";

const PrivacyPolicyArea = ({ className, space, conditions }) => (
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
                        <h1>ASMBL Game and Website Privacy Policy</h1>
                        {conditions?.map((condition) => (
                            <section key={condition.title} style={{paddingBottom:10}}>
                                <h2>{condition?.title}</h2>
                                {condition?.descriptions?.map((description) => (
                                    <p key={description}>{description}</p>
                                ))}
                                {condition?.bullets?.length > 0 && (
                                    <ul>
                                        {condition.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

PrivacyPolicyArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    conditions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            descriptions: PropTypes.arrayOf(PropTypes.string),
            bullets: PropTypes.arrayOf(PropTypes.string),
        })
    ),
};
PrivacyPolicyArea.defaultProps = {
    space: 0,
};

export default PrivacyPolicyArea;
