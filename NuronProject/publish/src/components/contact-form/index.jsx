import { useState } from "react";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";

const ContactForm = () => {
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
        fetch("/api/contact",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.ok) {
                handleServerResponse(true, "Message sent, we will get back with you as soon as we can!", form);
            } else {
                handleServerResponse(false, response.error, form);
            }
        })
        .catch((error) => {
            handleServerResponse(false, "Uh-oh! An error occured, wait a few minutes and then try again", form);
        });
    };
    return (
        <div className="form-wrapper-one registration-area">
            <h3 className="mb--30">Contact Us</h3>
            <form
                className="rwt-dynamic-form"
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-5">
                    <label htmlFor="contact-name" className="form-label">
                        Your Name
                    </label>
                    <input
                        id="contact-name"
                        type="text"
                        {...register("contactName", {
                            required: "Name is required",
                        })}
                    />
                    {errors.contactName && (
                        <ErrorText>{errors.contactName?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="contact-email" className="form-label">
                        Email
                    </label>
                    <input
                        name="contact-email"
                        type="email"
                        {...register("contactEmail", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.contactEmail && (
                        <ErrorText>{errors.contactEmail?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="subject" className="form-label">
                        Subject
                    </label>
                    <input
                        name="subject"
                        type="text"
                        {...register("subject", {
                            required: "Subject is required",
                        })}
                    />
                    {errors.subject && (
                        <ErrorText>{errors.subject?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="contact-message" className="form-label">
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        rows="3"
                        {...register("contactMessage", {
                            required: "Message is required",
                        })}
                    />
                    {errors.contactMessage && (
                        <ErrorText>{errors.contactMessage?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5 rn-check-box">
                    <input
                        id="condition"
                        type="checkbox"
                        className="rn-check-box-input"
                        {...register("condition", {
                            required: "Condition is required",
                        })}
                    />
                    <label htmlFor="condition" className="rn-check-box-label">
                        I agree to all Terms and Conditions
                    </label>
                    <br />
                    {errors.condition && (
                        <ErrorText>{errors.condition?.message}</ErrorText>
                    )}
                </div>
                <Button type="submit" size="medium">
                    Send Message
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
export default ContactForm;
