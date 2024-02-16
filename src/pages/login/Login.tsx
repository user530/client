import React from 'react';
import styles from './Login.module.css';
import { getPlayers } from './loginAPI';

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [players, setPlayers] = React.useState<{ name: string, id: string }[]>([]);

    React.useEffect(
        () => {
            setIsLoading((prev) => true);
            fetch()
            setIsLoading((prev) => false);


            async function fetch() {
                try {
                    console.log('Sideeffect Fetch - Start fetch...');
                    const players = await getPlayers();
                    console.log('Sideeffect Fetch - Setting players');
                    setPlayers((prev) => players);
                    console.log('Sideeffect Fetch - Reset Error');
                    setError((prev) => '');
                } catch (error) {
                    let err = error as Error;
                    console.log('Sideeffect Fetch - Error!')
                    console.log(error);
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
                        : error !== ''
                            ? <p>ERROR: {error}</p>
                            : players.map(
                                ({ name, id }, ind) => (
                                    <div key={name}>
                                        <p>{ind + 1}</p>
                                        <p>{name}</p>
                                        <p>{id}</p>
                                    </div>
                                )
                            )
                }

            </div>
        </>
    )
}
