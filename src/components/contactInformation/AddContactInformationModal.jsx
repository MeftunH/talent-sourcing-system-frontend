import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AddContactInformationModal = ({ candidateId, isOpen, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const initialValues = {
        contactInformationType: "",
        emailAddress: "",
        phoneNumber: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        console.log(candidateId);

        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await axios.post(
                "/api/v1/contact-informations",
                {
                    candidateId: candidateId,
                    ...values,
                }
            );
            resetForm();
            setIsSubmitting(false);
            onClose();
        } catch (error) {
            console.error(error);
            setSubmitError(error.message);
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={`${
                isOpen ? "block" : "hidden"
            } fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75`}
        >
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Add Contact Information
                            </h3>
                            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                {({ isSubmitting, values }) => (
                                    <Form className="mt-4">
                                        <div className="mb-4">
                                            <label
                                                htmlFor="contactInformationType"
                                                className="block text-gray-700 font-bold mb-2"
                                            >
                                                Contact Information Type
                                            </label>
                                            <Field
                                                as="select"
                                                id="contactInformationType"
                                                name="contactInformationType"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            >
                                                <option value="">Select Contact Information Type</option>
                                                <option value="EMAIL">Email</option>
                                                <option value="PHONE">Phone</option>
                                                <option value="BOTH">Both</option>
                                            </Field>
                                            <ErrorMessage
                                                name="contactInformationType"
                                                component="p"
                                                className="text-red-500 text-sm mt-2"
                                            />
                                        </div>
                                        {values.contactInformationType === "EMAIL" ||
                                        values.contactInformationType === "BOTH" ? (
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="emailAddress"
                                                    className="block text-gray-700 font-bold mb-2"
                                                >
                                                    Email Address
                                                </label>
                                                <Field
                                                    type="email"
                                                    id="emailAddress"
                                                    name="emailAddress"
                                                    placeholder="Enter Email Address"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage
                                                    name="emailAddress"
                                                    component="p"
                                                    className="text-red-500 text-sm mt-2"
                                                />
                                            </div>
                                        ) : null}
                                        {values.contactInformationType === "PHONE" ||
                                        values.contactInformationType === "BOTH" ? (
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className="block text-gray-700 font-bold mb-2"
                                                >
                                                    Phone Number
                                                </label>
                                                <Field
                                                    type="tel"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder="Enter Phone Number"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage
                                                    name="phoneNumber"
                                                    component="p"
                                                    className="text-red-500 text-sm mt-2"
                                                />
                                            </div>
                                        ) : null}
                                        {submitError && (
                                            <p className="text-red-500 text-sm mb-4">{submitError}</p>
                                        )}
                                        <div className="flex items-center justify-end mt-6">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className={`${isSubmitting ? "opacity-50 cursor-wait" : ""} bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                                                disabled={isSubmitting}
                                            >
                                            {isSubmitting ? "Submitting" : "Submit"}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddContactInformationModal;