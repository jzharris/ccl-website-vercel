import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRedditAlien,
    faTiktok,
    faTwitter,
    faLinkedin,
    faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";

const SocialWidget = ({ socials }) => {
    const GetFAIcon = (icon) => {
        if (icon === "reddit") {
            return faRedditAlien;
        } else if (icon === "tiktok") {
            return faTiktok;
        } else if (icon === "envelope") {
            return faEnvelope;
        } else if (icon === "linkedin") {
            return faLinkedin;
        } else if (icon === "twitter") {
            return faTwitter;
        } else if (icon === "discord") {
            return faDiscord;
        }
        return faLink;
    };

    return (
        <ul className="social-copyright">
            {socials?.map((social) => (
                <li key={social.id}>
                    <a
                        href={social.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.title}
                    >
                        {social.icon && (
                            <FontAwesomeIcon
                                icon={GetFAIcon(social.icon)}
                                className="color-body"
                            />
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
};

SocialWidget.propTypes = {
    socials: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            icon: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
};

export default SocialWidget;
