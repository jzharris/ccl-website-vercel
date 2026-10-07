import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@ui/button";
import { HeadingType, TextType, ButtonType, ImageType } from "@utils/types";

const HeroArea = ({ data }) => (
    <div className="slider-one rn-section-gapTop pb--20">
        <div className="container">
            <div className="row align-items-center">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        {data?.images?.[0]?.src && (
                            <div className="slider-thumbnail">
                                <Image
                                    src={data.images[0].src}
                                    alt={data.images[0]?.alt || "Slider Images"}
                                    width={585}
                                    height={593}
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-lg-6">
                        {data?.buttons && (
                            <div className="row">
                                {data.buttons.map(
                                    ({ content, id, ...btn }, i) => (
                                        <div>
                                            <div className="row g-5">
                                                <div
                                                    className="col-lg-12"
                                                    data-sal="slide-up"
                                                    data-sal-delay="150"
                                                    data-sal-duration="800"
                                                >
                                                    <div className="section-title mb--30 text-center">
                                                        {/* <h2 className="title">Community</h2> */}
                                                        <p className="description">
                                                            There are many
                                                            variations of
                                                            passages of Lorem
                                                            Ipsum available,{" "}
                                                            <br /> but the
                                                            majority have
                                                            suffered alteration.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <Button
                                                    {...btn}
                                                    data-sal-delay={
                                                        400 + i * 100
                                                    }
                                                    data-sal="slide-up"
                                                    data-sal-duration="800"
                                                    key={id}
                                                >
                                                    {content}
                                                </Button>
                                            </div>
                                            <div
                                                className="row"
                                                style={{ height: 20 }}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

HeroArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(HeadingType),
        texts: PropTypes.arrayOf(TextType),
        buttons: PropTypes.arrayOf(ButtonType),
        images: PropTypes.arrayOf(ImageType),
    }),
};

export default HeroArea;
