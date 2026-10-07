import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import PrivacyPolicyArea from "@containers/privacy-policy";

import policyData from "../data/general/privacy-policy-jzh.json";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const PrivacyPolicy = () => (
    <Wrapper>
        <SEO pageTitle="Assemble Privacy Policy" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Assemble Privacy Policy"
                currentPage="Assemble Privacy Policy"
            />
            <PrivacyPolicyArea conditions={policyData?.content || []} />
        </main>
        <Footer />
    </Wrapper>
);

export default PrivacyPolicy;
