import React, {useEffect, useState} from "react";
import axios from "axios";
import AddInteractionModal from "./AddInteractionModal.jsx";
import UpdateInteractionModal from "./UpdateInteractionModal.jsx";


function InteractionListModal({candidateId, isOpen, onClose}) {
    const [interactions, setInteractions] = useState([]);
    const [isAddInteractionModalOpen, setIsAddInteractionModalOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedInteraction, setSelectedInteraction] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleDeleteInteraction = async (interactionId) => {
        try {
            const response = await axios.delete(`api/v1/interactions/${interactionId}`);

            // Interaction was successfully deleted, update the interactions list
            const newInteractions = interactions.filter(interaction => interaction.id !== interactionId);
            setInteractions(newInteractions);
        } catch (error) {
            // Handle error
            console.error(`Error deleting interaction with ID ${interactionId}: ${error.message}`);
        }
    }
    const closeAddInteractionModalIsOpen = () => {
        setShowCreateModal(false);
    };

    useEffect(() => {
        const fetchInteractions = async () => {
            const response = await axios.get(
                `api/v1/interactions/candidate/${candidateId}`
            );
            setInteractions(response.data.data);
        };
        fetchInteractions();
    }, [candidateId]);

    const handleUpdateClick = (interaction) => {
        setSelectedInteraction(interaction);
        setShowUpdateModal(true);
    };

    const handleUpdateClose = () => {
        setShowUpdateModal(false);
        setSelectedInteraction(null);
    };

    return (
        <div className={`${
            isOpen ? "block" : "hidden"
        } fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
                    <div className="flex flex-col h-full">
                        <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Interactions List
                            </h3>
                            <div className="mt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    Create Interaction
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
                            {interactions.length === 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    No interactions found.
                                </p>
                            )}
                            {interactions.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex flex-col">
                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div
                                                className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                <div
                                                    className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Content
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Interaction Type
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Is Candidate Responded
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Actions
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                        {interactions.map((interaction) => (
                                                            <tr key={interaction.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                    {interaction.content}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {interaction.interactionType}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {interaction.isCandidateResponded === "YES" ? (
                                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                        Yes
                                                                    </span>
                                                                    ) : (
                                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
No
</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button

                                                                        className="bg-amber-500 text-white active:bg-amber-600
                                                                    font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg
                                                                    outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all
                                                                     duration-150" type="button"
                                                                            onClick={() => handleUpdateClick(interaction)}
                                                                    >
                                                                        Update Interaction
                                                                    </button>

                                                                    <button  className="bg-red-500 text-white
                                                                    active:bg-red-600 font-bold uppercase text-sm px-6 py-3
                                                                    rounded-full shadow hover:shadow-lg outline-none
                                                                     focus:outline-none mr-1 mb-1 ease-linear
                                                                      transition-all duration-150" type="button"
                                                                            onClick={() => handleDeleteInteraction(interaction.id)}
                                                                    >
                                                                        Delete Interaction
                                                                    </button>

                                                                </td>
                                                                {showUpdateModal && (
                                                                    <UpdateInteractionModal
                                                                        interaction={selectedInteraction}
                                                                        onClose={handleUpdateClose}
                                                                    />
                                                                )}

                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InteractionListModal;