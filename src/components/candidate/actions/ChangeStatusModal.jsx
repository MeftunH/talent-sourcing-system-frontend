import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const validationSchema = Yup.object().shape({
});

function ChangeStatusModal({ isOpen, onRequestClose, candidateId, currentStatus }) {
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleSubmit = (values, actions) => {
        const data = {
            candidateStatus: newStatus,
        };

        console.log("cId:"+candidateId);
        axios.patch(`/api/v1/candidates/${candidateId}/status`, data)
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
            contentLabel="Change Candidate Status Modal"
        >
            <div className="text-xl font-bold mb-4">Change Candidate Status</div>
            <Formik
                initialValues={{ candidateStatus: newStatus }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
                                Candidate Status
                            </label>
                            <Field
                                className="border border-gray-400 p-2 w-full"
                                as="select"
                                id="status"
                                name="candidateStatus"
                                value={newStatus}
                                onChange={(event) => setNewStatus(event.target.value)}
                            >
                                <option value="SOURCED">Sourced</option>
                                <option value="INTERVIEWING">Interviewing</option>
                                <option value="OFFER_SEND">Offer Sent</option>
                                <option value="HIRED">Hired</option>
                            </Field>
                            <ErrorMessage name="candidateStatus" component="div" className="text-red-500" />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Update Status
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default ChangeStatusModal;