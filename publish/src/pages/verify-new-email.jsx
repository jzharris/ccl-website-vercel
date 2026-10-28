import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import VerifyArea from "@containers/verify-new-email";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Verify = () => (
    <Wrapper>
        <SEO pageTitle="Verify email" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Verify email" currentPage="Verify email" />
            <VerifyArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Verify;
