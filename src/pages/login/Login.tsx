import React from 'react';
import styles from './Login.module.css';
import { getPlayers, ResponsePlayerDTO } from './loginAPI';
import { Loader } from '../../components/loader-component/Loader';
import { PlayerItem } from '../../components/player-item/Player-item';
import { useDispatch } from 'react-redux';
import { hubSocketConnection } from '../../app/store/reducers/slices/socket-messages.slice';
import { setPlayer } from '../../app/store/reducers/slices/game-data.slice';

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [players, setPlayers] = React.useState<ResponsePlayerDTO[]>([]);
    const [selectedPlayer, setSelectedPlayer] = React.useState<ResponsePlayerDTO | null>(null);

    const dispatch = useDispatch();

    const loginHandler = (): void => {
        if (!selectedPlayer) return;

        const { id: playerId, name: playerName } = selectedPlayer;
        dispatch(setPlayer({ playerId, playerName }));
        dispatch(hubSocketConnection());
    };

    React.useEffect(
        () => {
            setIsLoading(true);
            fetch()
            setIsLoading(false);

            async function fetch() {
                try {

                    const players = await getPlayers();

                    setPlayers(players);

                    setError('');
                } catch (error) {
                    let err = error as Error;

                    let errMsg = 'Something went wrong during data fetch!';
                    if (err.message)
                        errMsg = err.message;

                    setError(errMsg);
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

                    <div className={styles['content-footer']}>
                        <button
                            className={`${styles['footer-btn']} ${styles['footer-btn--big']}`}
                            onClick={loginHandler}
                            disabled={selectedPlayer === null}
                        >Enter!</button>
                    </div>

                </div>
            </div>

    )
}
