import './styles.css';

import React from "react";

export const BngIconButton = ({type = 'button', icon = 'save', className = '', size = '', children, ...props}) => {
    return (
        <button type={type}
                className={`BngIconButton ${className} ${size}`}
                {...props}>
            {children}
        </button>

    );
};