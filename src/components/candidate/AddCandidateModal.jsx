import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    candidateStatus: Yup.string().required('Candidate status is required'),
});

function AddCandidateModal({isOpen, onRequestClose}) {
    const handleSubmit = (values, actions) => {
        const data = {
            name: values.name,
            surname: values.surname,
            candidateStatus: values.candidateStatus,
            personType: 'CANDIDATE'
        };

        axios.post('/api/v1/candidates', data)
            .then((response) => {
                console.log(response.data);
                onRequestClose();
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Candidate Modal"
        >
            <div className="text-xl font-bold mb-4">Add Candidate</div>
            <Formik
                initialValues={{name: '', surname: '', candidateStatus: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <Field
                                className="border border-gray-400 p-2 w-full"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="surname">
                                Surname
                            </label>
                            <Field
                                className="border border-gray-400 p-2 w-full"
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Enter surname"
                            />
                            <ErrorMessage name="surname" component="div" className="text-red-500"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
                                Candidate Status
                            </label>
                            <Field
                                className="border border-gray-400 p-2 w-full"
                                as="select"
                                id="status"
                                name="candidateStatus"
                            >
                                <option value="">Select a status</option>
                                <option value="SOURCED">Sourced</option>
                                <option value="INTERVIEWING">Interviewing</option>
                                <option value="OFFER_SEND">Offer Sent</option>
                                <option value="HIRED">Hired</option>
                            </Field>
                            <ErrorMessage name="candidateStatus" component="div" className="text-red-500"/>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Add Candidate"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default AddCandidateModal;