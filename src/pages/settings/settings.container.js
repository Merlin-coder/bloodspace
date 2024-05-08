import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsPage from './settings.component';
import { apiResponseType, associateUnitValidationAction } from '../../redux/actions/settings/settingsActions';
import { getDropDown } from 'redux/actions';

const Settings = (props) => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const { options } = useSelector((state) => state.getDropDown);
    const dispatch = useDispatch();
    const { apiBehavior } = useSelector((state) => state.changeResponse);
    const { validationRequired } = useSelector((state) => state.associateValidation);
    const handleChange = (event) => {
        dispatch(apiResponseType(event.target.value));
    };
    const [associateUnitValidation, setAssociateUnitValidation] = useState(validationRequired);
    const handleAssociateUnitValidaion = (e) => {
        setAssociateUnitValidation(!e);
        dispatch(associateUnitValidationAction(!e));
    };

    // const handleLFTag = () => {

    // }

    useEffect(() => {
        console.log(options);
    }, [options]);

    return (
        <div>
            <SettingsPage
                handleChange={handleChange}
                apiBehavior={apiBehavior}
                props={props}
                handleAssociateUnitValidaion={handleAssociateUnitValidaion}
                associateUnitValidation={associateUnitValidation}
            />
        </div>
    );
};

export default Settings;
