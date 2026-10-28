import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import HeroArea from "@containers/hero/layout-jzh01";
import ServiceArea from "@containers/services/layout-jzh01";
import { normalizedData } from "@utils/methods";

// Demo Data
import homepageData from "../data/homepages/home-jzh01.json";
// import productData from "../data/products.json";
// import sellerData from "../data/sellers.json";
// import collectionsData from "../data/collections.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main id="main-content">
                <div style={{ minHeight: "100vh" }}>
                    <HeroArea data={content["hero-section"]} />
                    <div style={{height:20}}></div>
                    <ServiceArea data={content["service-section"]} />
                </div>
            </main>
            <Footer />
        </Wrapper>
    );
};

export default Home;
