import React from 'react';
import styles from './Login.module.css';
import { getPlayers } from './loginAPI';

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [players, setPlayers] = React.useState<{ name: string }[]>([]);

    React.useEffect(
        () => {
            setIsLoading((prev) => true);
            fetch()
            setIsLoading((prev) => false);


            async function fetch() {
                try {
                    const players = await getPlayers();
                    setPlayers((prev) => players);
                    setError((prev) => '');
                } catch (error) {
                    let err = error as Error;
                    let errMsg = 'Something went wrong during data fetch!';
                    if (err.message)
                        errMsg = err.message;

                    setError((prev) => errMsg);
                }
            }
        },
        []
    )

    return (
        <>
            <div className={styles['wrapper']}>
                {
                    isLoading
                        ? <p>LOADING...</p>
                        : error === ''
                            ? <p>ERROR: ${error}</p>
                            : players.map(
                                ({ name }, ind) => (
                                    <div key={name}>
                                        <p>{ind + 1}</p>
                                        <p>{name}</p>
                                    </div>
                                )
                            )
                }

            </div>
        </>
    )
}
