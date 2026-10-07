import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { checkParam } from "@utils/utilities";

const ForgotPasswordForm = ({ className }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
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
        setServerState({ submitting: true });
        fetch("/api/forgot",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.ok) {
                handleServerResponse(true, "Reset link sent! Check your email to reset your password", form);
            } else {
                handleServerResponse(false, response.error, form);
            }
        })
        .catch((err) => {
            handleServerResponse(false, "Uh-oh! An error occured, wait a few minutes and then try again", form);
        })
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Password Reset</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorText>
                            {errors.email?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="agreeToTerms"
                        {...register("agreeToTerms", {
                            required: "Checkbox is required",
                        })}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="agreeToTerms"
                    >
                        I agree to all Terms & Conditions
                    </label>
                    <br />
                    {errors.agreeToTerms && (
                        <ErrorText>{errors.agreeToTerms?.message}</ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium" className="mr--15" disabled={serverState.submitting}>
                    Reset Password
                </Button>
                {/* <Button path="/login" color="primary-alta" size="medium">
                    Log In
                </Button> */}
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

ForgotPasswordForm.propTypes = {
    className: PropTypes.string,
};
export default ForgotPasswordForm;
