import React, { useState } from 'react';

import MovementComponent from './RuleType.component';
import response from '../../../JSON/movement.json';
import Fact from './fact';
import Generate from './generate';
import Resolution from './validate';
import Decision from './decision';
import RuleTable from './rulesTable';
import { useSelector } from 'react-redux';

const RuleType = ({ ruleType }) => {
    const state = useSelector((state) => state.ruleType);

    return (
        <>
            {state === 'Facts' ? (
                <RuleTable type={'Facts'} />
            ) : state === 'Notification' ? (
                <RuleTable type={'Notification'} />
            ) : state === 'Rule' ? (
                <RuleTable type={'Rule'} />
            ) : state === 'Resolution' ? (
                <RuleTable type={'Resolution'} />
            ) : null}
        </>
    );
};

export default RuleType;
