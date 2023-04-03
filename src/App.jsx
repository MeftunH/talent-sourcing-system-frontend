import { useState } from 'react'
import './App.css'
import CandidateList from "./components/candidate/CandidateList.jsx";
import AddCandidateModal from "./components/candidate/AddCandidateModal.jsx";
import logo from '../public/TSS-logo.png';
function App() {
    const [addCandidateModalIsOpen, setAddCandidateModalIsOpen] = useState(false);
    const openAddCandidateModalIsOpen = () => {
        setAddCandidateModalIsOpen(true);
    };

    const closeAddCandidateModalIsOpen = () => {
        setAddCandidateModalIsOpen(false);
    };
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="mb-4 mt-40">
                <img className="h-32 md:h-47 lg:h-60 w-100" src={logo} alt="Logo" />

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={openAddCandidateModalIsOpen}
                >
                    Add Candidate
                </button>
                <AddCandidateModal isOpen={addCandidateModalIsOpen} onRequestClose={closeAddCandidateModalIsOpen} />
            </div>
            <CandidateList />
        </div>
    );
}

export default App
