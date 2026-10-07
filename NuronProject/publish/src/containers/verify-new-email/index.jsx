import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VerifyWaitArea from "@containers/verify-wait";
import VerifyFailedArea from "@containers/verify-failed";
import VerifySucceededArea from "@containers/verify-succeeded";

const VerifyArea = ({ className, space }) => {
    const router = useRouter();
    const [serverState, setServerState] = useState({
        codeIsValid: false,
        checkingCode: false,
        start: true,
        done: false
    });

    // Wait for the server to check the code before asking user to complete verification
    useEffect(() => {
        if (router.query.code != undefined && !serverState.checkingCode && !serverState.done) {
            setServerState({
                codeIsValid: false,
                checkingCode: true,
                start: true,
                done: false
            });
            setTimeout(() => {
                setServerState({
                    codeIsValid: false,
                    checkingCode: true,
                    start: false,
                    done: false
                });
                let data = {code: router.query.code};
                fetch("/api/verify-new-email", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-type": "application/json",
                      "Accept": "application/json"
                    }
                })
                .then((_res) => {
                    setServerState({
                        codeIsValid: _res.ok,
                        checkingCode: false,
                        start: false,
                        done: true
                    });
                })
                .catch((err) => {
                    setServerState({
                        codeIsValid: false,
                        checkingCode: false,
                        start: false,
                        done: true
                    });
                });
            }, 1000);
        }
    });

    return (
        <div
            className={clsx(
                "verify-area",
                space === 1 && "rn-section-gapTop rn-section-gapBottom",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    {
                        (serverState.start || serverState.checkingCode) && <VerifyWaitArea />
                    }
                    {
                        !serverState.start && !serverState.checkingCode && serverState.codeIsValid && <VerifySucceededArea />
                    }
                    {
                        !serverState.start && !serverState.checkingCode && !serverState.codeIsValid && <VerifyFailedArea />
                    }
                </div>
            </div>
        </div>
    );
}

VerifyArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

VerifyArea.defaultProps = {
    space: 1,
};
export default VerifyArea;
