import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import sal from "sal.js";
import { ThemeProvider } from "next-themes";
import "../assets/css/bootstrap.min.css";
import "../assets/css/react-vertical-timeline-component.min.css";
import "../assets/css/feather.css";
import "../assets/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/style.scss";

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        sal({ threshold: 0.1, once: true });
    }, [router.asPath]);

    useEffect(() => {
        sal();
    }, []);
    useEffect(() => {
        document.body.className = `${pageProps.className}`;
    });

    useEffect(() => {
        const threeScript = document.createElement("script");
        threeScript.setAttribute("id", "threeScript");
        threeScript.setAttribute(
            "src",
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.min.js"
        );
        document.getElementsByTagName("head")[0].appendChild(threeScript);
        return () => {
            if (threeScript) {
                threeScript.remove();
            }
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="dark">
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.shape({
        className: PropTypes.string,
    }),
};

export default MyApp;
