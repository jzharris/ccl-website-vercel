import PropTypes from "prop-types";
import clsx from "clsx";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { icons } from "../icons";
import ImageLink from "@components/image-link";

const RoadmapImage = ({ src, width, height, link }) => {
    return (<ImageLink href={link} image={src} width={width} height={height}/>);
}

const RoadmapArea = ({ className, space, items, showH3, showH4, title, showFuture }) => {

    return (
        <div
            className={clsx(
                "roadmap-area",
                space === 1 && "rn-section-gapTop",
                space === 2 && "rn-section-gapTop-3",
                className
            )}
        >
            <div className="container">
                {title && (
                    <div className="row text-center">
                        <div className="col-12">
                            <h2
                                className="title"
                                data-sal-delay="200"
                                data-sal="slide-up"
                                data-sal-duration="800"
                            >
                                {title}
                            </h2>
                        </div>
                    </div>
                )}
                <VerticalTimeline>
                    {items?.map((item) => {
                        let statusColor = 'var(--background-color-4)'
                        if (item.finished) {
                            statusColor = 'var(--color-secondary)'
                        } else if (item.ongoing) {
                            statusColor = 'var(--color-primary)';
                        }
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: statusColor, color: '#fff' }}
                                contentArrowStyle={{ borderRight: statusColor + " 7px solid" }}
                                date={item.date}
                                dateClassName="timeline-date"
                                iconStyle={{ background: statusColor, color: '#fff' }}
                                icon={(!item.finished) ? icons[item.doingIcon] : icons[item.doneIcon]}
                            >
                                {item.image && <RoadmapImage src={item.image} width={item.width || "100%"} height={item.height || "100%"} link={null}/>}
                                {showH3 && (<h3 className="vertical-timeline-element-title" style={{paddingTop:10}}>{item.h3}</h3>)}
                                {showH4 && (<h4 className="vertical-timeline-element-subtitle" style={{paddingTop:10}}>{item.h4}</h4>)}
                                {item.p && (<p>{item.p}</p>)}
                                <ul style={{marginBottom:0}}>
                                    {item.li?.map((message) => (
                                        <li key={message.id}>{message.message}</li>
                                    ))}
                                </ul>
                                {item.html && (item.html)}
                            </VerticalTimelineElement>
                        )
                    })}
                    {showFuture && (
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'var(--background-color-4)', color: '#fff' }}
                            contentArrowStyle={{ borderRight: '7px solid  var(--background-color-4)' }}
                            iconStyle={{ background: 'var(--background-color-4)', color: '#fff' }}
                            icon={icons['infinite']}
                        >
                            {showH3 && (<h3 className="vertical-timeline-element-title">The Future</h3>)}
                            {showH4 && (<h4 className="vertical-timeline-element-title">Much more to come</h4>)}
                            <p>
                            We can&apos;t wait to see what&apos;s in store. Please send us your feedback! Join us on our journey to a bright future!
                            </p>
                        </VerticalTimelineElement>
                    )}
                </VerticalTimeline>
            </div>
        </div>
    )
};

RoadmapArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3]),
    items: PropTypes.array,
    showH3: PropTypes.bool,
    showH4: PropTypes.bool,
    title: PropTypes.string,
    showFuture: PropTypes.bool
};
RoadmapArea.defaultProps = {
    space: 1,
    showH3: true,
    showH4: true,
    title: "",
    showFuture: false
};

export default RoadmapArea;
