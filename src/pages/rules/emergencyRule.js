import React, { useState } from 'react';

import MovementComponent from './RuleType.component';
import response from '../../../JSON/movement.json';
import Fact from './fact';
import Generate from './generate';
import Resolution from './validate';
import Decision from './decision';
import Rules from './rules';
import { useSelector } from 'react-redux';

const EmergencyType = ({ ruleType }) => {
    const state = useSelector((state) => state.ruleType);

    return (
        <>
            {state === 'Facts' ? (
                <Rules type={'Facts'} />
            ) : state === 'Notification' ? (
                    <Rules type={'Notification'} />
            ) : state === 'Rule' ? (
                        <Rules type={'Rule'} />
            ) : state === 'Resolution' ? (
                            <Rules type={'Resolution'} />
            ) : null}
        </>
    );
};

export default EmergencyType;