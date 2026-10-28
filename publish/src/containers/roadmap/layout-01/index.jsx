import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { icons } from "../icons";
import ImageLink from "@components/image-link";

const RoadmapImage = ({ src, width, height, link }) => {
    return <ImageLink href={link} image={src} width={width} height={height} />;
};

const RoadmapArea = ({
    className,
    space,
    items,
    showH3,
    showH4,
    title,
    showFuture,
}) => {
    const horizontalScrollRef = useRef(null);
    const horizontalOngoingRef = useRef(null);
    const verticalOngoingRef = useRef(null);
    const roadmapItems = [
        ...(items || []),
        ...(showFuture
            ? [
                  {
                      h3: "The Future",
                      h4: "Much more to come",
                      p: "We can’t wait to see what’s in store. Please send us your feedback! Join us on our journey to a bright future!",
                      doingIcon: "infinite",
                  },
              ]
            : []),
    ];

    useEffect(() => {
        const landscapeQuery = window.matchMedia(
            "(orientation: landscape) and (min-width: 768px)"
        );
        let frameId;

        const scrollToOngoing = () => {
            window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(() => {
                frameId = window.requestAnimationFrame(() => {
                    if (landscapeQuery.matches) {
                        const container = horizontalScrollRef.current;
                        const target = horizontalOngoingRef.current;
                        if (!container || !target) return;

                        container.scrollTo({
                            left:
                                target.offsetLeft -
                                (container.clientWidth - target.clientWidth) /
                                    2,
                            behavior: "smooth",
                        });
                        return;
                    }

                    const target = verticalOngoingRef.current;
                    if (!target) return;

                    const targetTop =
                        window.scrollY +
                        target.getBoundingClientRect().top -
                        window.innerHeight / 2 +
                        200;
                    window.scrollTo({ top: targetTop, behavior: "smooth" });
                });
            });
        };

        scrollToOngoing();
        landscapeQuery.addEventListener("change", scrollToOngoing);

        return () => {
            window.cancelAnimationFrame(frameId);
            landscapeQuery.removeEventListener("change", scrollToOngoing);
        };
    }, [items, showFuture]);

    const renderItemContent = (item) => (
        <>
            {item.image && (
                <RoadmapImage
                    src={item.image}
                    width={item.width || "100%"}
                    height={item.height || "100%"}
                    link={null}
                />
            )}
            {showH3 && item.h3 && <h3>{item.h3}</h3>}
            {showH4 && item.h4 && <h4>{item.h4}</h4>}
            {item.p && <p>{item.p}</p>}
            {item.li?.length > 0 && (
                <ul style={{ marginBottom: 0 }}>
                    {item.li.map((message) => (
                        <li key={message.id}>{message.message}</li>
                    ))}
                </ul>
            )}
            {item.html}
        </>
    );

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
                <div
                    className="roadmap-horizontal-scroll"
                    role="region"
                    aria-label="Roadmap milestones"
                    style={{paddingTop:0}}
                    ref={horizontalScrollRef}
                >
                    <ol className="roadmap-horizontal">
                        {roadmapItems.map((item, index) => {
                            let statusColor = "var(--background-color-4)";
                            if (item.finished) {
                                statusColor = "var(--color-secondary)";
                            } else if (item.ongoing) {
                                statusColor = "var(--color-primary)";
                            }

                            return (
                                <li
                                    className="roadmap-horizontal-item"
                                    key={item.h3 || item.date || index}
                                    ref={
                                        item.ongoing
                                            ? horizontalOngoingRef
                                            : null
                                    }
                                    style={{ "--roadmap-status": statusColor }}
                                >
                                    <div className="roadmap-horizontal-date">
                                        {item.date}
                                    </div>
                                    <div className="roadmap-horizontal-marker">
                                        {item.finished
                                            ? icons[item.doneIcon]
                                            : icons[item.doingIcon]}
                                    </div>
                                    <article
                                        className="roadmap-horizontal-card"
                                        style={{
                                            background: statusColor,
                                            borderTopColor: statusColor,
                                            color: "#fff",
                                        }}
                                    >
                                        {renderItemContent(item)}
                                    </article>
                                </li>
                            );
                        })}
                    </ol>
                </div>
                <div
                    className="roadmap-vertical"
                    role="region"
                    aria-label="Roadmap milestones"
                >
                    <VerticalTimeline>
                        {roadmapItems.map((item, index) => {
                            let statusColor = "var(--background-color-4)";
                            if (item.finished) {
                                statusColor = "var(--color-secondary)";
                            } else if (item.ongoing) {
                                statusColor = "var(--color-primary)";
                            }

                            return (
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: statusColor,
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: `${statusColor} 7px solid`,
                                    }}
                                    date={item.date}
                                    dateClassName="timeline-date"
                                    iconStyle={{
                                        background: statusColor,
                                        color: "#fff",
                                    }}
                                    icon={
                                        item.finished
                                            ? icons[item.doneIcon]
                                            : icons[item.doingIcon]
                                    }
                                    key={item.h3 || item.date || index}
                                >
                                    {item.ongoing && (
                                        <span
                                            className="roadmap-scroll-anchor"
                                            ref={verticalOngoingRef}
                                            aria-hidden="true"
                                        />
                                    )}
                                    {renderItemContent(item)}
                                </VerticalTimelineElement>
                            );
                        })}
                    </VerticalTimeline>
                </div>
            </div>
        </div>
    );
};

RoadmapArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2, 3]),
    items: PropTypes.array,
    showH3: PropTypes.bool,
    showH4: PropTypes.bool,
    title: PropTypes.string,
    showFuture: PropTypes.bool,
};
RoadmapArea.defaultProps = {
    space: 0,
    showH3: true,
    showH4: true,
    title: "",
    showFuture: false,
};

export default RoadmapArea;
