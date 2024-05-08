import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddReceipientComponent from './add-recepient.component';
// import Response from '../ResponseResults.json';

const AddRecepient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male');
    const [dob, setDob] = useState(null);
    const [bloodGroupSelected, setVloodGroupSelected] = useState('');
    const [receipientId, setReceipientId] = useState('');
    const [bloodGroupOpen, setBloodGroupOpen] = useState(false);
    const history = useHistory();
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [bloodGroupError, setBloodGroupError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [receipientIdError, setReceipientIdError] = useState(false);

    const handleSave = () => {
        if (!firstName.match(/[a-zA-Z]+$/)) {
            //Do Nothing
        } else if (!lastName.match(/^[a-zA-Z]+$/)) {
            //Do Nothing
        } else if (dobError) {
            //Do Nothing
        } else if (!receipientId.match(/^[a-zA-Z0-9]+$/)) {
            //Do Nothing
        } else if (bloodGroupError) {
            //Do Nothing
        } else {
            let today = dob;
            const dd = String(today?.getDate())?.padStart(2, '0');
            const mm = String(today?.getMonth() + 1)?.padStart(2, '0'); //January is 0!
            const yyyy = today?.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            // Response.data_array.push({
            //     name: firstName + ' ' + lastName,
            //     firstName: firstName,
            //     lastName: lastName,
            //     recipientId: receipientId,
            //     productCode: receipientId,
            //     badgeNumber: receipientId,
            //     bloodGroup: bloodGroupSelected,
            //     units: 5,
            //     dob: today,
            //     dereservationDate: '13/01/1998',
            //     gender: gender
            // });

            history.push(`/dashboard/assign-unit/r/${receipientId}`);
        }
    };

    const validation = () => {
        firstName.match(/[a-zA-Z]+$/) ? null : setFirstNameError(true);
        lastName.match(/^[a-zA-Z]+$/) ? null : setLastNameError(true);
        String(dob) === 'null' || String(dob) === 'Invalid Date' || dob.getTime() > new Date().getTime()
            ? setDobError(true)
            : null;
        receipientId.match(/^[a-zA-Z0-9]+$/) ? null : setReceipientIdError(true);
        bloodGroupSelected === '' ? setBloodGroupError(true) : null;
        handleSave();
    };

    const handleCancel = () => {
        history.push('/dashboard/assignunit');
    };

    const handleDate = (date) => {
        setDob(date);
    };

    const handleBloodGroup = (e, group) => {
        let selectedGroup = group?.desc;
        setVloodGroupSelected(selectedGroup);
    };

    const handleAutoCompleteChange = (e) => {
        e?.target?.value && e?.target?.value.length > 2 && e?.target?.id === 'blood'
            ? setBloodGroupOpen(true)
            : setBloodGroupOpen(false);
    };
    const handleClickAway = () => {
        setBloodGroupOpen(false);
    };

    return (
        <AddReceipientComponent
            handleDate={handleDate}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            gender={gender}
            receipientId={receipientId}
            bloodGroupSelected={bloodGroupSelected}
            dob={dob}
            setReceipientId={setReceipientId}
            setGender={setGender}
            handleBloodGroup={handleBloodGroup}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleAutoCompleteChange={handleAutoCompleteChange}
            setBloodGroupOpen={setBloodGroupOpen}
            bloodGroupOpen={bloodGroupOpen}
            handleClickAway={handleClickAway}
            validation={validation}
            firstNameError={firstNameError}
            setFirstNameError={setFirstNameError}
            setLastNameError={setLastNameError}
            setDobError={setDobError}
            setReceipientIdError={setReceipientIdError}
            setBloodGroupError={setBloodGroupError}
            bloodGroupError={bloodGroupError}
            lastNameError={lastNameError}
            receipientIdError={receipientIdError}
            dobError={dobError}
        />
    );
};

export default AddRecepient;
