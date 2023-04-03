import {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Modal from "react-modal";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
});

const UpdateCandidateModal = ({ candidate, isOpen, onRequestClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(initialValues.name);
        setIsLoading(true);
        try {
            const updatedCandidate = {
                ...candidate,
                ...values,
            };
            const response = await axios.put(
                `api/v1/candidates/${candidate.id}`,
                updatedCandidate
            );
            onRequestClose();
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };
    const initialValues = {
        name: candidate.name,
        surname: candidate.surname,
        personType: "CANDIDATE",
    };

    return (
        <div
            className={`${
                isOpen ? "block" : "hidden"
            } fixed z-10 inset-0 overflow-y-auto`}
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Form className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle max-w-md w-full p-6">
                            <div className="text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Edit Candidate Information
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update the candidate's information below:
                                </p>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={`${
                                        formik.touched.name && formik.errors.name ? "border-red-500" : ""
                                    } mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md`}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 mt-1 text-sm"
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                    Surname
                                </label>
                                <Field
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    className={`${
                                        formik.touched.surname && formik.errors.surname ? "border-red-500" : ""
                                    } mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md`}
                                />
                                <ErrorMessage
                                    name="surname"
                                    component="div" className="text-red-500 mt-1 text-sm"
                                />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading || formik.isSubmitting}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {isLoading ? (
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onRequestClose}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    disabled={isLoading || formik.isSubmitting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UpdateCandidateModal;