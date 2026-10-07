import PropTypes from "prop-types";
import clsx from "clsx";
import FooterLinkWidget from "@widgets/footer-link-widget";
import SocialWidget from "@widgets/social-widget";
import { ItemType } from "@utils/types";
import React from "react";

// Demo data
import footerData from "../../../data/general/footer-jzh01.json";
import contactData from "../../../data/general/contact-jzh.json";

const Footer = ({ space, className, data }) => (
    <>
        <div className="copy-right-one ptb--20 bg-color--1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="copyright-left">
                            {footerData.copyright_text?.map(
                                (copyright_tx, index) => (
                                    <React.Fragment key={index}>
                                        <span>{copyright_tx} &nbsp;</span>
                                        <br></br>
                                    </React.Fragment>
                                )
                            )}
                            {/* <span>{footerData.copyright_text}</span> */}
                            <FooterLinkWidget
                                data={footerData["footer-link-widget"]}
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="copyright-right">
                            <SocialWidget socials={contactData.socials} />
                        </div>
                    </div> */}
                    <div
                        className="col-md-4 col-sm-4"
                        style={{ textAlign: "center" }}
                    >
                        {footerData.footer_address?.map(
                            (address_line, index) => (
                                <React.Fragment key={index}>
                                    <span>{address_line}</span>
                                    <br></br>
                                </React.Fragment>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
);

Footer.propTypes = {
    space: PropTypes.oneOf([1, 2, 3]),
    className: PropTypes.string,
    data: PropTypes.shape({
        items: PropTypes.arrayOf(ItemType),
    }),
};

Footer.defaultProps = {
    space: 1,
};

export default Footer;
