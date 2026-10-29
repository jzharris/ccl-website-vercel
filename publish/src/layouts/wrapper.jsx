import PropTypes from "prop-types";
import ScrollToTop from "@ui/scroll-to-top";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => (
    <>
        <div className="site-video-background" aria-hidden="true">
            <img className="site-video" src="/videos/trailer.gif" alt="" />
            <div className="site-video-overlay" />
        </div>
        {children}
        <ScrollToTop />
        <ToastContainer />
    </>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
