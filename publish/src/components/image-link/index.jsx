import PropTypes from "prop-types";
import clsx from "clsx";
import { IoInformationCircle } from "react-icons/io5";

const ImageLink = ({ href, image, width, height, padding, showBorder }) => {
    let styleProps = {};
    if (width) {
        if (typeof width === 'string') {
            if (width.includes("%")) {
                styleProps['width'] = width;
            } else {
                styleProps['width'] = width;
            }
        } else {
            styleProps['width'] = width - padding;
        }
    }
    if (height) {
        if (typeof height === 'string') {
            if (height.includes("%")) {
                styleProps['height'] = height;
            } else {
                styleProps['height'] = height;
            }
        } else {
            styleProps['height'] = height - padding;
        }
    }

    let borderProps = {}
    if (!showBorder) {
        borderProps['display'] = 'contents';
    }
    if (showBorder) {
        borderProps['width'] = width;
    }

    return (
        // <div className="container">
            <div className="pd-tab-inner" style={{paddingLeft: padding, paddingRight: padding}}>
                <div className="product-tab-wrapper">
                    <div className="rn-pd-content" style={{paddingLeft: '0', display: 'flex', justifyContent: 'center'}}>
                        <div className="rn-pd-thumbnail" style={{...borderProps}}>
                            {href !== null ? (
                                <a href={href} style={{display:'flex', justifyContent: 'center'}}><img src={image} style={{...styleProps}}/><span className={clsx("background-color-1")} style={{fontSize: 30, position: 'absolute', top:5, right:10}}><IoInformationCircle/></span></a>
                            ) : (
                                <a style={{display:'flex', justifyContent: 'center'}}><img src={image} style={{...styleProps}}/></a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
}

ImageLink.propTypes = {
    href: PropTypes.string,
    image: PropTypes.object,
    width: PropTypes.number,
    padding: PropTypes.number,
    showBorder: PropTypes.bool
};

ImageLink.defaultProps = {
    width: 200,
    padding: 0,
    showBorder: false
};

export default ImageLink;