import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
// import { storeSessionToken, storeUsername } from "@utils/user";

const LoginForm = ({ className }) => {
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
        fetch("/api/login",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.ok) {
                // storeSessionToken(response);
                // storeUsername(response.response.username);
                router.push({
                    pathname: "/",
                });
            } else {
                switch(response.error) {
                case "Incorrect password":
                case "Email not found":
                case "User not found":
                    handleServerResponse(false, "Incorrect email or password, please try again", form);
                    break;
                default:
                    handleServerResponse(false, response.error, form);
                }
            }
        })
        .catch((error) => {
            switch(error) {
            case "Incorrect password":
            case "Email not found":
            case "User not found":
                handleServerResponse(false, "Incorrect email or password, please try again", form);
                break;
            default:
                handleServerResponse(false, "Uh-oh! An error occured, wait a few minutes and then try again", form);
            }
        });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Login</h4>
            <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorText>
                            {errors.password?.message}
                        </ErrorText>
                    )}
                </div>
                {/* <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1")}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Remember me
                    </label>
                </div> */}
                <Button type="submit" size="medium" className="mr--15">
                    Log In
                </Button>
                <Button path="/sign-up" color="primary-alta" size="medium">
                    Sign Up
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

LoginForm.propTypes = {
    className: PropTypes.string,
};
export default LoginForm;
