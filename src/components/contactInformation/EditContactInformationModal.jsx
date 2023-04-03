import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

function EditContactInformationModal({ isOpen, onClose, contactInformation,candidateId }) {

    const [selectedOption, setSelectedOption] = useState(contactInformation.contactInformationType);

    const initialValues = {
        emailAddress: contactInformation.emailAddress || "",
        phoneNumber: contactInformation.phoneNumber || "",
        candidateId: candidateId,
    };

    const handleSubmit = async (values, actions) => {
        try {
            const instance = axios.create({
                baseURL: 'http://localhost:8081',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
            });
            const updatedContactInformation = {
                ...values,
                contactInformationType: selectedOption,
                candidateId: candidateId,
            };
            instance.put(`/api/v1/contact-informations/${candidateId}`, updatedContactInformation)
                .then(response => {
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Contact information updated successfully.',
                    });
                })
                .catch(error => {
                    console.error(error);
                    const errorMessage = error.response.data.message;
                    const errorDetail = error.response.data.detail;
                    Swal.fire({
                        icon: 'error',
                        title: {errorMessage},
                        text: errorDetail,
                    });
                });

            onClose();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating contact information.',
            });
        }
        actions.setSubmitting(false);
    }
    useEffect(() => {
        console.log(contactInformation)
        if (contactInformation.length === 1){
        if (contactInformation[0].contactInformationType === "EMAIL") {
            setSelectedOption("EMAIL");
            initialValues.emailAddress = contactInformation[0].emailAddress;
        }
        else if (contactInformation[0].contactInformationType === "PHONE_NUMBER") {
            setSelectedOption("PHONE_NUMBER");
            initialValues.phoneNumber = contactInformation[0].phoneNumber;
        }
        } else{
            setSelectedOption("BOTH");
            if(contactInformation[0].contactInformationType === "EMAIL"){
                initialValues.emailAddress = contactInformation[0].emailAddress;
            } else if (contactInformation[0].contactInformationType === "PHONE_NUMBER"){
                initialValues.phoneNumber = contactInformation[0].phoneNumber;
            }
            if(contactInformation[1].contactInformationType === "EMAIL"){
                initialValues.emailAddress = contactInformation[1].emailAddress;
            }
            else if (contactInformation[1].contactInformationType === "PHONE_NUMBER"){
                initialValues.phoneNumber = contactInformation[1].phoneNumber;
            }
        }

    }, [contactInformation]);

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Contact Information</h3>
                                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form className="mt-4">
                                            <div className="mb-4">
                                                <label htmlFor="contactInformationType" className="block font-medium text-gray-700">
                                                    Contact Information Type
                                                </label>
                                                <div className="mt-1">
                                                    <div>
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="form-radio"
                                                                name="contactInformationType"
                                                                value="PHONE_NUMBER"
                                                                checked={selectedOption === "PHONE_NUMBER"}
                                                                onChange={() => setSelectedOption("PHONE_NUMBER")}
                                                            />
                                                            <span className="ml-2">Phone Number</span>
                                                        </label>
                                                        <label className="inline-flex items-center ml-6">
                                                            <input
                                                                type="radio"
                                                                className="form-radio"
                                                                name="contactInformationType"
                                                                value="EMAIL"
                                                                checked={selectedOption === "EMAIL"}
                                                                onChange={() => setSelectedOption("EMAIL")}
                                                            />
                                                            <span className="ml-2">Email</span>
                                                        </label>
                                                        <label className="inline-flex items-center ml-6">
                                                            <input
                                                                type="radio"
                                                                className="form-radio"
                                                                name="contactInformationType"
                                                                value="BOTH"
                                                                checked={selectedOption === "BOTH"}
                                                                onChange={() => setSelectedOption("BOTH")}
                                                            />
                                                            <span className="ml-2">Both</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedOption === "PHONE_NUMBER" || selectedOption === "BOTH" ? (
                                                <div className="mb-4">
                                                    <label htmlFor="phoneNumber" className="block font-medium text-gray-700">
                                                        Phone Number
                                                    </label>
                                                    <Field
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        type="text"
                                                        autoComplete="tel"
                                                        placeholder="Enter phone number"
                                                        className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            ) : null}                  {selectedOption === "EMAIL" || selectedOption === "BOTH" ? (
                                            <div className="mb-4">
                                                <label htmlFor="emailAddress" className="block font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <Field
                                                    id="emailAddress"
                                                    name="emailAddress"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Enter email address"
                                                    className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                        ) : null}

                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                                >
                                                    {isSubmitting ? "Submitting..." : "Save Changes"}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">  <button
                                type="button"
                                onClick={onClose}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-br from-cyan-500 to-blue-500 text-base font-medium text-white hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditContactInformationModal;