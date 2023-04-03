import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ContactInformationModal = ({ candidateId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contactInformation, setContactInformation] = useState([]);

    const closeModal = () => setIsOpen(false);

    const openModal = () => setIsOpen(true);

    useEffect(() => {
        const fetchContactInformation = async () => {
            const response = await axios.get(
                `http://localhost:8081/api/v1/contact-informations/candidate/${candidateId}`
            );
            setContactInformation(response.data.data);
        };

        fetchContactInformation();
    }, [candidateId]);

    return (
        <>
            <button
                onClick={openModal}
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Show Contact Information
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <div className="bg-white rounded-lg p-4">
                    <h2 className="text-xl font-medium mb-2">
                        Contact Information of Candidate
                    </h2>
                    <table className="table-auto w-full">
                        <thead>
                        <tr>
                            <th className="px-6 py-6">Email</th>
                            <th className="px-6 py-6">Phone Number</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contactInformation.map((contactInformation) => (
                            <tr key={contactInformation.id}>
                                <td className="border px-4 py-2">
                                    {contactInformation.contactInformationType}
                                </td>
                                <td className="border px-4 py-2">
                                    {contactInformation.emailAddress ||
                                        contactInformation.phoneNumber}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        onClick={closeModal}
                        className="mt-4 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ContactInformationModal;