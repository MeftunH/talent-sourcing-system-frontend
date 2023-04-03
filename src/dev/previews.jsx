import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App.jsx";
import CandidateList from "../components/candidate/CandidateList.jsx";
import UpdateCandidateModal from "../components/candidate/UpdateCandidateModal.jsx";
import ChangeStatusModal from "../components/candidate/actions/ChangeStatusModal.jsx";
import AddCandidateModal from "../components/candidate/AddCandidateModal.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/CandidateList">
                <CandidateList/>
            </ComponentPreview>
            <ComponentPreview path="/UpdateCandidateModal">
                <UpdateCandidateModal/>
            </ComponentPreview>
            <ComponentPreview path="/ChangeStatusModal">
                <ChangeStatusModal/>
            </ComponentPreview>
            <ComponentPreview path="/AddCandidateModal">
                <AddCandidateModal/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;