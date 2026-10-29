import PropTypes from "prop-types";
import Logo from "@components/logo";

const LogoWidget = ({ data }) => (
    <div className="footer-left">
        <Logo logo={data.logo} width={160} height={92} />
        {data?.text && <p className="rn-footer-describe">{data.text}</p>}
    </div>
);

LogoWidget.propTypes = {
    data: PropTypes.shape({
        logo: PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.string.isRequired,
                alt: PropTypes.string,
            })
        ),
        text: PropTypes.string,
    }),
};

export default LogoWidget;
