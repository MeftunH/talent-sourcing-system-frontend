import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ContactInformationModal = ({ candidateId, isOpen, onRequestClose }) => {
    const [contactInformation, setContactInformation] = useState([]);

    useEffect(() => {
        const fetchContactInformation = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/v1/contact-informations/candidate/${candidateId}`
                );
                setContactInformation(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (isOpen) {
            fetchContactInformation();
        }
    }, [candidateId, isOpen]);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-xl font-medium mb-2">
                    Contact Information of Candidate
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-4 border border-gray-300">Email</th>
                        <th className="p-4 border border-gray-300">Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contactInformation.map((contactInfo) => (
                        <tr key={contactInfo.id} className="border border-gray-300">
                            <td className="p-4 border border-gray-300">{contactInfo.emailAddress}</td>
                            <td className="p-4 border border-gray-300">{contactInfo.phoneNumber}</td>
                        </tr>
                    ))}
                    {contactInformation.length === 0 && (
                        <tr className="border border-gray-300">
                            <td colSpan="2" className="p-4 text-center">No contact information available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <button
                    onClick={onRequestClose}
                    className="mt-4 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ContactInformationModal;