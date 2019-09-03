// Instantiated in components/TaskList.js, components/Projects.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = ({ 
    icon = 'fas fa-spinner',
    color = 'inherit', 
    size = '2rem', 
    speed = '1s', 
    timing = 'linear' 
}) => {

    const StyledSpinner = styled.i`
        font-size: ${size};
        color: ${color};

        animation: ${spin} ${speed} ${timing} infinite;
    `;

    return (
        <StyledSpinner className={icon}/>
    )
}

export default Spinner;

export const spin = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;