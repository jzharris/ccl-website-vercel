import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import RoadmapArea from "@containers/roadmap/layout-01";
import Padding from "@components/padding";
import Breadcrumb from "@components/breadcrumb";

// Demo Data
import roadmapData from "../data/roadmap.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Roadmap = (props, items) => (
    <Wrapper>
        <SEO pageTitle="Home" />
        <Header />
        <main id="main-content">
            <div style={{ minHeight: "100vh" }}>
                <Breadcrumb
                    pageTitle="ASMBL Roadmap"
                    currentPage="Roadmap"
                    prevTitle={"Home"}
                    prevPage={"/"}
                />
                <RoadmapArea
                    items={roadmapData?.content || []}
                    space={2}
                    showH3={true}
                    showH4={false}
                    showFuture={true}
                />
            </div>
        </main>
        <Footer />
    </Wrapper>
);

export default Roadmap;
