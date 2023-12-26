import React from 'react';

interface IPopUpWindow {
    message: string;
    type: 'green' | 'red' | 'yellow';
    button?: {
        text: string;
        cb: () => any;
    }
};

export const PopUpWindow: React.FC<IPopUpWindow> = (props: IPopUpWindow) => {
    const { message, type, button } = props;
    return <>
        <div style={{ backgroundColor: type }}>
            <p>{message}</p>

            {
                button && (Object.keys(button).length > 0)
                    ? <button onClick={button.cb}>{button.text}</button>
                    : null
            }
        </div>
    </>
}