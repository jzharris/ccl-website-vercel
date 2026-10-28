import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ForgotPasswordArea from "@containers/forgot";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const SignUp = () => (
    <Wrapper>
        <SEO pageTitle="Forgot Password" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Forgot Password" currentPage="Forgot Password" />
            <ForgotPasswordArea />
        </main>
        <Footer />
    </Wrapper>
);

export default SignUp;
