import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const useHeaderHeight = (headerRef) => {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
            // Handler to call on window resize
            function handleResize() {
                if (headerRef) {
                    setHeaderHeight(headerRef?.current?.clientHeight);
                }
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return headerHeight;
}

const Padding = ({ headerRef }) => {
    const headerHeight = useHeaderHeight(headerRef);
    return (
        <div style={{paddingTop: headerHeight+"px"}}></div>
    );
};

Padding.propTypes = {
    headerRef: PropTypes.any,
};

export default Padding;