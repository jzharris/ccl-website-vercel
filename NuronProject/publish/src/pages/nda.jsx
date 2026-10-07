import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import NDAArea from "@containers/nda";

import ndaData from "../data/general/nda-08092023-jzh.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const NDA = () => (
    <Wrapper>
        <SEO pageTitle="NDA" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Beta Tester NDA"
                currentPage="Beta Tester NDA"
            />
            <NDAArea conditions={ndaData?.content || []} />
        </main>
        <Footer />
    </Wrapper>
);

export default NDA;
