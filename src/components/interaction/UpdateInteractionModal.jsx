import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
const validationSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    interactionType: Yup.string().required("Interaction type is required"),
    isCandidateResponded: Yup.string().required("Candidate response is required"),
});

const UpdateInteractionModal = ({ interaction, onClose }) => {
    const handleSubmit = async (values, actions) => {
        try {
            const response = await axios.put(
                `api/v1/interactions/${interaction.id}`,
                values
            );
            console.log("Interaction updated: ", response.data);
            await  Swal.fire({
                title: "Success!",
                text: "Interaction updated successfully",
                icon: "success",
                confirmButtonText: "Close",
            });
            onClose();
            window.location.reload(false);
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: "Error!",
                text: "Failed to update interaction. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
            });
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
                                    Update Interaction
                                </h3>
                                <Formik
                                    initialValues={{
                                        content: interaction.content,
                                        interactionType: interaction.interactionType,
                                        isCandidateResponded: interaction.isCandidateResponded,
                                    }}
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
                                                <p className="block text-gray-700 font-bold mb-2">
                                                    Candidate response:
                                                </p>
                                                <label className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name="isCandidateResponded"
                                                        value="YES"
                                                    />
                                                    <span className="ml-2">YES</span>
                                                </label>
                                                <label className="inline-flex items-center ml-6">
                                                    <Field
                                                        type="radio"
                                                        name="isCandidateResponded"
                                                        value="NO"
                                                    />
                                                    <span className="ml-2">NO</span>
                                                </label>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:ml-3">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="inline-flex justify-center w-full
                                                     rounded-md border border-transparent shadow-sm px-4 py-2
                                                     bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700
                                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    Update Interaction
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

export default UpdateInteractionModal;