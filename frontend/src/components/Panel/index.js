import { MainPanel, SubPanel } from './styles'

import React from "react";

export const Panel = ({className = '', children, whiteBg = false, ...props}) => {
    return (
        <MainPanel className={className} {...props} whiteBg>
            {children}
        </MainPanel>
    )
};

export const PanelHeader = ({className = '', title = null, children, ...props}) => {
    return (
        <SubPanel header className={className} {...props}>
            {title &&
            <h1 className="Title">{title}</h1>
            }
            {children}
        </SubPanel>
    )
};

export const PanelFooter = ({className = '', children, ...props}) => {
    return (
        <SubPanel footer className={className} {...props}>
            {children}
        </SubPanel>
    )
};