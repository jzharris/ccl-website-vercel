import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import RoadmapArea from "@containers/roadmap/layout-01";
import Padding from "@components/padding";
import Breadcrumb from "@components/breadcrumb";

import { useEffect, useRef, useState } from "react";
// import WAVES from "vanta/dist/vanta.waves.min.js";
import WAVES from "../lib/jzh.waves.min";
import * as THREE from "three";
import { useWindowDimensions } from "@hooks";

// Demo Data
import roadmapData from "../data/roadmap.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Roadmap = (props, items) => {
    const { width, height } = useWindowDimensions();
    const [vantaEffect, setVantaEffect] = useState(0);
    const vantaRef = useRef(null);
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                WAVES({
                    THREE: THREE,
                    el: vantaRef.current,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 0.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x1f005e,
                    specular: 0xffae00,
                    shininess: 15.0,
                    waveHeight: 10.5,
                    waveSpeed: 0.25,
                    zoom: 0.7,
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
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <div ref={vantaRef}>
                    <div style={{ minHeight: height }}>
                        <Breadcrumb
                            pageTitle="Assemble Roadmap"
                            currentPage="Roadmap"
                            prevTitle={"Home"}
                            prevPage={"/"}
                        />
                        <RoadmapArea items={roadmapData?.content || []} space={2} showH3={true} showH4={false} showFuture={true} />
                    </div>
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Roadmap;
