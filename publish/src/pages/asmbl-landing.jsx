import Image from "next/image";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import { FaDiscord, FaRedditAlien, FaTiktok, FaYoutube } from "react-icons/fa";
import styles from "./asmbl-landing.module.scss";

import ServiceArea from "@containers/services/layout-jzh01";
import homepageData from "../data/homepages/home-jzh01.json";
import { normalizedData } from "@utils/methods";

const highlights = [
    {
        title: "BUILD",
        description:
            "Pilot your own land, air, space, and mech vehicles. From elegant machines to utterly ridiculous contraptions - the only limit is your imagination!",
    },
    {
        title: "BATTLE",
        description:
            "Compete head-to-head with your friends in fast-paced multiplayer games where design and strategy decide the winner.",
    },
    {
        title: "BREAK",
        description:
            "ASMBL has realistic physics and a full damage system. Tear your designs to shreds, then reset and start building again.",
    },
];

const gameFeatures = [
    {
        id: "ground",
        title: "DOMINATE THE GROUND.",
        image: "/images/jzh/roadmap/rob.webp",
        imageAlt: "ASMBL land vehicle artwork",
        emphasis: "If it rolls, crawls, drills, or explodes… it's fair game.",
    },
    {
        id: "air",
        title: "TAKE TO THE SKIES.",
        image: "/images/jzh/roadmap/porky.webp",
        imageAlt: "ASMBL aircraft artwork",
        emphasis: "The sky isn't the limit. It's your testing ground.",
    },
    {
        id: "space",
        title: "ACHIEVE ESCAPE VELOCITY.",
        image: "/images/jzh/roadmap/spacefox.webp",
        imageAlt: "ASMBL space vehicle artwork",
        emphasis: "Space belongs to the bold.",
    },
    {
        id: "mech",
        title: "TAKE THE FIGHT INTO YOUR OWN HANDS.",
        image: "/images/jzh/roadmap/BATTLE.webp",
        imageAlt: "ASMBL mech battle artwork",
        emphasis: "Engineering skill decides victory.",
    },
];

const gameplayImages = [
    {
        src: "/images/jzh/roadmap/Demo%20video.gif",
        alt: "ASMBL gameplay demo",
    },
    {
        src: "/images/jzh/roadmap/driving.gif",
        alt: "Driving a custom-built ASMBL vehicle",
    },
    {
        src: "/images/jzh/roadmap/Early%20Access.gif",
        alt: "ASMBL early access gameplay",
    },
    {
        src: "/images/jzh/roadmap/v0.1%20gif.gif",
        alt: "ASMBL building gameplay",
    },
    {
        src: "/images/jzh/roadmap/v0.3%20gif.gif",
        alt: "ASMBL multiplayer gameplay",
    },
    {
        src: "/images/jzh/roadmap/v1.0%20gif.gif",
        alt: "ASMBL gameplay showcase",
    },
];

const socials = [
    {
        name: "Discord",
        href: "https://discord.gg/P3pN5WvJek",
        Icon: FaDiscord,
    },
    {
        name: "TikTok",
        href: "https://www.tiktok.com/@carboncopyzach",
        Icon: FaTiktok,
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@ASMBL_VR",
        Icon: FaYoutube,
    },
    {
        name: "Reddit",
        href: "https://www.reddit.com/user/carboncopyzach/",
        Icon: FaRedditAlien,
    },
];

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const AsmblLanding = () => {
    const content = normalizedData(homepageData?.content || []);
    return (
    <Wrapper>
        <SEO pageTitle="ASMBL" />
        <Header />
        <main className={styles.landing} id="main-content">
            <section className={`${styles.scene} ${styles.hero}`}>
                <div className={styles.heroContent}>
                    <Image
                        src="/images/jzh/logo/ASMBL_Logo_Demo_S1.PNG"
                        alt="ASMBL"
                        width={1660}
                        height={475}
                        priority
                        className={styles.logo}
                    />
                    <h1>Build. Battle. Break.</h1>
                    <a className={styles.button} href="#community">
                        WISHLIST NOW
                    </a>
                </div>
                <a className={styles.scrollLink} href="#game">
                    Scroll to explore <span aria-hidden="true">↓</span>
                </a>
            </section>

            {/* <section className={`${styles.scene} ${styles.about}`} id="features">
                <div className={styles.contentWidth}>
                    <div className={styles.highlightGrid}>
                        {highlights.map((highlight) => (
                            <article
                                className={styles.highlight}
                                key={highlight.title}
                            >
                                <h2>{highlight.title}</h2>
                                <p>{highlight.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section> */}

            {gameFeatures.map((feature, index) => (
                <section
                    className={`${styles.scene} ${styles.featureScene} ${
                        styles[feature.id]
                    }`}
                    key={feature.id}
                >
                    <div
                        className={`${styles.featureContent} ${
                            index % 2 ? styles.reverse : ""
                        }`}
                    >
                        <div className={styles.featureArtwork}>
                            <Image
                                src={feature.image}
                                alt={feature.imageAlt}
                                width={700}
                                height={700}
                                className={styles.featureImage}
                            />
                        </div>
                        <div className={styles.copyPanel}>
                            <h2>{feature.title}</h2>
                            <p className={styles.emphasis}>
                                {feature.emphasis}
                            </p>
                        </div>
                    </div>
                </section>
            ))}

            <section className={styles.gallery} id="media">
                <div className={styles.contentWidth}>
                    <p className={styles.eyebrow}>SEE WHAT YOU CAN CREATE</p>
                    <h2>BUILT IN ASMBL</h2>
                    <div className={styles.galleryGrid}>
                        {gameplayImages.map((image) => (
                            <a
                                className={styles.galleryItem}
                                href={image.src}
                                key={image.src}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${image.alt}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={400}
                                    height={225}
                                    unoptimized
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section
                className={`${styles.scene2}`}
                id="community"
            >
                <div className={styles.communityContent}>
                    <p className={styles.eyebrow}>YOUR NEXT BUILD AWAITS</p>
                    <h2>
                        GET STARTED
                    </h2>
                    <ServiceArea data={content["service-section"]} />
                </div>
            </section>
        </main>
        <Footer />
    </Wrapper>
    );
}

export default AsmblLanding;
