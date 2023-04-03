import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    interactionType: Yup.string().required("Interaction type is required"),
    isCandidateResponded: Yup.string().required("Candidate response is required")
});

const initialValues = {
    content: "",
    interactionType: "",
    isCandidateResponded: ""
};

const AddInteractionModal = ({ candidateId, onClose }) => {
    const handleSubmit = async (values, actions) => {
        try {
            const response = await axios.post(
                "api/v1/interactions",
                { ...values, candidateId }
            );
            console.log("New interaction created: ", response.data);
            window.location.reload(false);
        } catch (error) {
            console.error(error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Create Interaction
                                </h3>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="mt-4">
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="content"
                                                    className="block text-gray-700 font-bold mb-2"
                                                >
                                                    Content
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="content"
                                                    id="content"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="interactionType"
                                                    className="block text-gray-700 font-bold mb-2"
                                                >
                                                    Interaction Type
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="interactionType"
                                                    id="interactionType"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Select an interaction type</option>
                                                    <option value="PHONE">Phone</option>
                                                    <option value="EMAIL">Email</option>
                                                </Field>

                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="isCandidateResponded"
                                                    className="block text-gray-700 font-bold mb-2"
                                                >
                                                   Is Candidate Responded
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="isCandidateResponded"
                                                    id="isCandidateResponded"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Select an type</option>
                                                    <option value="YES">YES</option>
                                                    <option value="NO">NO</option>
                                                </Field>

                                            </div>


                                            <div className="mt-8">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Create Interaction
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
        </div>
    );
};

export default AddInteractionModal;