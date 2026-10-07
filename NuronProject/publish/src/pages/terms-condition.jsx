import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import TermsAndConditionsArea from "@containers/terms-condition";

import termsData from "../data/general/terms-jzh.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const TermsAndConditions = () => (
    <Wrapper>
        <SEO pageTitle="Terms & Conditions" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Terms & Conditions"
                currentPage="Terms & Conditions"
            />
            <TermsAndConditionsArea conditions={termsData?.content || []} />
        </main>
        <Footer />
    </Wrapper>
);

export default TermsAndConditions;
