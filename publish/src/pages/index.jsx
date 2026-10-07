import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-jzh01";
import ServiceArea from "@containers/services/layout-jzh01";
import { normalizedData } from "@utils/methods";

import { useEffect, useRef, useState } from "react";
// import WAVES from "vanta/dist/vanta.waves.min.js";
import WAVES from "../lib/jzh.waves.min";
import * as THREE from "three";
import { useWindowDimensions } from "@hooks";

// Demo Data
import homepageData from "../data/homepages/home-jzh01.json";
// import productData from "../data/products.json";
// import sellerData from "../data/sellers.json";
// import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
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

    const content = normalizedData(homepageData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <div ref={vantaRef}>
                    <div style={{ minHeight: height }}>
                        <HeroArea data={content["hero-section"]} />
                        <ServiceArea
                            data={content["service-section"]}
                            space={2}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
