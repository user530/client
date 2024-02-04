import React from 'react';
import styles from './popup-window.module.css';
import { useAppDispatch } from '../../../app/hooks/useStore';
import { setPopup } from '../../../app/store/reducers/slices/game-data.slice';

interface IPopUpWindow {
    heading: string;
    message: string;
    colorSchema: 'error' | 'success' | 'fail' | 'neutral';
    cb?: (...args: any) => any;
};

export const PopUpWindow: React.FC<IPopUpWindow> = (props: IPopUpWindow) => {
    const { heading, message, colorSchema, cb } = props;
    const dispatch = useAppDispatch();

    const btnHandler = () => {
        // Execute optional callback
        if (cb) cb();

        // Close pop-up
        dispatch(setPopup(null));
    }

    return <>
        <div className={styles['pop-up-wrapper']}>
            <div className={styles['pop-up-window']}>
                <div className={
                    `${styles['pop-up-heading']} ${colorSchema === 'error' ? styles['heading__error'] : ''} ${colorSchema === 'success' ? styles['heading__success'] : ''} ${colorSchema === 'fail' ? styles['heading__fail'] : ''} ${colorSchema === 'neutral' ? styles['heading__neutral'] : ''}`
                }>
                    <h2 className={styles['h2']}>{heading}</h2>
                </div>

                <div className={styles['pop-up-main']}>
                    <p>{message}</p>
                </div>

                <div className={styles['pop-up-controls']}>
                    <input type='button' onClick={btnHandler} value={'Confirm'} />
                </div>
            </div>
        </div >
    </>
}