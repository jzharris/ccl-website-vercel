import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ContactTopArea from "@containers/contact-top";
import ContactFormArea from "@containers/contact-form";
import GoogleMapArea from "@containers/google-map";

import { useEffect, useRef, useState } from "react";
// import WAVES from "vanta/dist/vanta.waves.min.js";
import WAVES from "../lib/jzh.waves.min";
import * as THREE from "three";
import { useWindowDimensions } from "@hooks";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Contact = () => {
    const { width, height } = useWindowDimensions();
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                WAVES({
                    THREE: THREE,
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 0.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x1f005e,
                    specular: 0xffae00,
                    shininess: 15.0,
                    waveHeight: 20.5,
                    waveSpeed: 0.45,
                    zoom: 1.0,
                    backgroundAlpha: 0,
                    position: "fixed",
                })
            );
        }

        return () => {
            if (vantaEffect) {
                vantaEffect.destroy();
            }
        };
    }, [vantaEffect]);

    useEffect(() => {
        if (vantaEffect) {
            vantaEffect.resize();
        }
    }, [width, height]);

    return (
        <Wrapper>
            <SEO pageTitle="Contact" />
            <Header />
            <main id="main-content">
                <div ref={vantaRef}>
                    <Breadcrumb
                        pageTitle="Contact Us"
                        currentPage="Contact Us"
                    />
                    <ContactTopArea />
                    <ContactFormArea />
                    {/* <GoogleMapArea /> */}
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
}

export default Contact;
