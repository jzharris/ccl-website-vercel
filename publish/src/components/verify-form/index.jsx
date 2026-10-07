import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const VerifyForm = ({ className }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });
        if (ok) {
            form.reset();
        }
    };
    const onSubmit = (data, e) => {
        const form = e.target;
        let formData = data;
        formData.code = router.query.code;

        setServerState({ submitting: true });
        fetch("/api/finalize",{
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.ok) {
                handleServerResponse(true, "You're all set! You can now sign into the game with this email", form);
            } else {
                handleServerResponse(false, response.error, form);
            }
        })
        .catch((err) => {
            handleServerResponse(false, "Uh-oh! An error occured, wait a few minutes and then try again", form);
        });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Finish creating your account</h4>
            <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-5">
                    Read our <b><a onClick={() => window.open("https://carboncopylabs.com/terms-condition", "_blank")} href="#">terms and conditions</a></b> and then click the button below.
                </div>
                {/* <div className="mb-5">
                    <label htmlFor="birthday" className="form-label">
                        Birthday
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        {...register("birthday", {
                            required: "Birthday is required"
                        })}
                    />
                    {errors.birthday && (
                        <ErrorText>
                            {errors.birthday?.message}
                        </ErrorText>
                    )}
                </div> */}
                <Button type="submit" size="medium" className="mr--15">
                    Verify account
                </Button>
                {serverState.status && (
                    <p
                        className={`mt-4 font-14 ${
                            !serverState.status.ok
                                ? "text-danger"
                                : "text-success"
                        }`}
                    >
                        {serverState.status.msg}
                    </p>
                )}
            </form>
        </div>
    );
};

VerifyForm.propTypes = {
    className: PropTypes.string,
};
export default VerifyForm;
