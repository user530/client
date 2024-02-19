import React from 'react';
import styles from './Login.module.css';
import { getPlayers } from './loginAPI';
import { Loader } from '../../components/loader-component/Loader';
import { PlayerItem } from '../../components/player-item/Player-item';

interface PlayerData {
    id: string;
    name: string;
}

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [players, setPlayers] = React.useState<PlayerData[]>([]);
    const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerData | null>(null);

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


        isLoading
            ? <Loader />
            :
            <div className={styles['wrapper']} onClick={() => setSelectedPlayer(null)}>
                <div className={styles['content']}>
                    <div className={styles['content-header']}>
                        <h1 className={styles['h1']}>Login:</h1>
                    </div>

                    <div className={styles['content-body']}>
                        <div className={styles['body-inner']}>
                            {
                                error !== ''
                                    ? error
                                    : null
                            }

                            {
                                players.length > 0
                                    ? players.map(
                                        (player, ind) => (
                                            <PlayerItem
                                                key={player.id}
                                                index={ind + 1}
                                                playerName={player.name}
                                                isSelected={selectedPlayer?.id === player.id}
                                                clickHandler={
                                                    (e) => {
                                                        e.stopPropagation();
                                                        setSelectedPlayer(player);
                                                    }}
                                            />
                                        )
                                    )
                                    : null
                            }
                        </div>
                    </div>

                    {
                        (error !== '' || !players)
                            ? null
                            :
                            <div className={styles['content-footer']}>
                                <button className={styles['footer-btn']}>Add player</button>
                                {
                                    selectedPlayer
                                        ? <button className={`${styles['footer-btn']} ${styles['footer-btn--big']}`}>Enter!</button>
                                        : null
                                }
                            </div>
                    }

                </div>
            </div>

    )
}
