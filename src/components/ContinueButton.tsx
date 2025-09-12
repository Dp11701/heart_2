import React from "react";
import '../styles/Common.css'

export interface ContinueButtonProps extends React.HTMLAttributes<HTMLElement> {
    text: string;
    disabled?: boolean;
    additionClassName?: string;
}

function ContinueButton(props: ContinueButtonProps): React.JSX.Element {

    const {text, disabled, additionClassName, ...rest} = props;
    const baseClass = props.disabled ? 'continue-button-disabled' : 'continue-button';
    const fullClassName = `${baseClass} ${props.additionClassName || ""}`.trim();

    return <div
        className={fullClassName}
        style={props.disabled === true ? {
            pointerEvents: 'none'
        } : {}}
        {...rest}
    >
        <span>{props.text}</span>
    </div>
}

export default ContinueButton;