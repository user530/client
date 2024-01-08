import React from 'react';
import { useAppDispatch } from '../../app/hooks/useStore';
import { setPopup } from '../../app/store/reducers/slices/game-data.slice';

interface IPopUpWindow {
    message: string;
    type: 'green' | 'red' | 'yellow';
    cb?: (...args: any) => any;
};

export const PopUpWindow: React.FC<IPopUpWindow> = (props: IPopUpWindow) => {
    const { message, type, cb } = props;
    const dispatch = useAppDispatch();

    const btnHandler = () => {
        // Execute optional callback
        if (cb) cb();

        // Close pop-up
        dispatch(setPopup(null));
    }

    return <>
        <div style={{ backgroundColor: type }}>
            <p>{message}</p>

            {
                <button onClick={btnHandler}>Ok</button>
            }
        </div>
    </>
}