import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ChangeStatusModal from "./actions/ChangeStatusModal.jsx";
import UpdateCandidateModal from "./UpdateCandidateModal.jsx";
import InteractionListModal from "../interaction/InteractionListModal.jsx";
import AddContactInformationModal from "../contactInformation/AddContactInformationModal.jsx";
import EditContactInformationModal from "../contactInformation/EditContactInformationModal.jsx";
import ContactInformationModal from "../contactInformation/ContactInormationModal.jsx";


function CandidateList() {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
    const [isUpdateCandidateModalOpen, setIsUpdateCandidateModalOpen] = useState(false);
    const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [addCandidateModalIsOpen, setAddCandidateModalIsOpen] = useState(false);
    const [editContactInformationModalIsOpen, setEditContactInformationModalIsOpen] = useState(false);
    const [ContactInformationModalIsOpen, setContactInformationModalIsOpen] = useState(false);
    const [contactInformation, setContactInformation] = useState(null);

    const openAddCandidateModalIsOpen = (candidateId) => {
        setSelectedCandidateId(candidateId)
        setAddCandidateModalIsOpen(true);
    }
    const closeAddCandidateModalIsOpen = () => {
        setAddCandidateModalIsOpen(false);
    }
    const openEditCandidateInformationModal = async (candidateId) => {
        const contactInfo = await fetchContactInformation(candidateId);
        setContactInformation(contactInfo);
        setSelectedCandidateId(candidateId);
        setEditContactInformationModalIsOpen(true);
    };
    const closeEditCandidateInformationModal = () => {
        setEditContactInformationModalIsOpen(false);
    };

    const openContactInformationModal = async (candidateId) => {
        setSelectedCandidateId(candidateId);
        setContactInformationModalIsOpen(true);
    };
    const closeContactInformationModal = () => {
        setContactInformationModalIsOpen(false);
    };
    const fetchCandidates = async () => {
        try {
            const response = await axios.get('/api/v1/candidates');
            setCandidates(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };



    async function fetchContactInformation(candidateId) {
        const url = `/api/v1/contact-informations/candidate/${candidateId}`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }



    useEffect(() => {
        fetchCandidates();
    }, []);
    const handleDelete = (id) => {
        setIsDeleting(true);
        axios
            .delete(`/api/v1/candidates/${id}`)
            .then(() => {
                console.log("Candidate deleted successfully");
                // Optionally update your UI to reflect the deletion
            })
            .catch((error) => {
                console.error("Error deleting candidate: ", error);
                // Optionally update your UI to show an error message
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };
    // Update candidate status and close modal
    const handleStatusUpdate = async (candidateId, newStatus) => {
        try {
            const response = await axios.patch(`/api/v1/candidates/${candidateId}/status`, {
                candidateStatus: newStatus,
            });
            const updatedCandidate = response.data;
            // Update candidates state with the updated candidate
            setCandidates(candidates.map(candidate => candidate.id === updatedCandidate.id ? updatedCandidate : candidate));
            setIsChangeStatusModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleOpenChangeStatusModal = (candidate) => {
        console.log("candidate:"+candidate.id);
        setSelectedCandidateId(candidate.id);
        console.log("Selected candidate:"+candidate.id);

        setIsChangeStatusModalOpen(true);
    };
    const handleOpenInteractionModal = (candidate) => {
        setSelectedCandidateId(candidate.id);

        setIsInteractionModalOpen(true);
    };
    const handleOpenUpdateCandidateModal = (candidate) => {
        setSelectedCandidate(candidate);
        console.log("Selected candidate:"+candidate.name);
        setIsUpdateCandidateModalOpen(true);
    };

    const handleCloseChangeStatusModal = () => {
        setIsChangeStatusModalOpen(false);
    };
    const statusBadge = (status) => {
        switch (status) {
            case 'SOURCED':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-green-800">Sourced</span>;
            case 'INTERVIEWING':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Interviewing</span>;
            case 'OFFER_SEND':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Offer Sent</span>;
            case 'HIRED':
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Hired</span>;
            default:
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
        }
    };

    return (
        <div className="min-h-screen bg-white-100">
            <div className="container mx-auto px-12 sm:px-12 lg:px-12">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Candidate List</h1>
                <div className="flex flex-col">
                    <div className="-my-2 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Surname
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        ></th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {candidates.map((candidate) => (

                                        <tr key={candidate.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {candidate.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {candidate.surname}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <td className="border border-gray-400 p-2">
                                                    {statusBadge(candidate.candidateStatus)}
                                                </td>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {!candidate.contactInformation || candidate.contactInformation.length === 0 ?
                                                    <button onClick={() => openAddCandidateModalIsOpen(candidate.id)}
                                                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >Add Contact Information

                                                    </button> :
                                                    <button
                                                        onClick={() => openEditCandidateInformationModal(candidate.id)}
                                                        type="button"
                                                            className="text-white bg-gradient-to-r
                                                             from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br
                                                             focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800
                                                              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                                        Edit Contact Information
                                                    </button>
                                                }
                                                {selectedCandidateId && contactInformation && (
                                                    <EditContactInformationModal
                                                        isOpen={editContactInformationModalIsOpen}
                                                        onClose={closeEditCandidateInformationModal}
                                                        contactInformation={contactInformation}
                                                        candidateId={selectedCandidateId}
                                                    />
                                                )}


                                                <button
                                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-visible text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                                    onClick={() => handleOpenChangeStatusModal(candidate)}
                                                >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Update Candidate Status
                        </span>
                                                </button>
                                                <ChangeStatusModal
                                                    isOpen={isChangeStatusModalOpen}
                                                    onRequestClose={() => setIsChangeStatusModalOpen(false)}
                                                    candidateId={selectedCandidateId}
                                                />
                                                <ContactInformationModal
                                                    isOpen={ContactInformationModalIsOpen}
                                                    onRequestClose={() => setContactInformationModalIsOpen(false)}
                                                    candidateId={selectedCandidateId}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button type="button"
                                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                                                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
                                                     shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm
                                                      px-5 py-2.5 text-center mr-2 mb-2 " onClick={() => handleOpenUpdateCandidateModal(candidate)}>
                                                    Update Candidate
                                                </button>

                                                <UpdateCandidateModal
                                                    candidate={selectedCandidate}
                                                    isOpen={isUpdateCandidateModalOpen}
                                                    onRequestClose={() => setIsUpdateCandidateModalOpen(false)}
                                                />
                                                <button type="button"
                                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600
                                                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300
                                                    dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80
                                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                        onClick={() => handleDelete(candidate.id)}
                                                >Delete Candidate
                                                </button>

                                                <button type="button"
                                                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500
                                                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300
                                                     dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg
                                                     dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                        onClick={() => handleOpenInteractionModal(candidate)}>
                                                    Interactions
                                                </button>

                                                <InteractionListModal
                                                    onClose={() => setIsInteractionModalOpen(false)}
                                                    isOpen={isInteractionModalOpen}
                                                    candidateId={selectedCandidateId}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CandidateList;