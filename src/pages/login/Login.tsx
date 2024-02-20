import React, { FormEvent } from 'react';
import styles from './Login.module.css';
import { getPlayers, addPlayer, CreatePlayerDTO, ResponsePlayerDTO } from './loginAPI';
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
    const [showForm, setShowForm] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    const loginHandler = (): void => {
        if (!selectedPlayer) return;

        const { id: playerId, name: playerName } = selectedPlayer;
        dispatch(setPlayer({ playerId, playerName }));
        dispatch(hubSocketConnection());
    };

    const addPlayerHandler = (): void => {
        console.log('Add player handler fired!');
        setShowForm(true);
    }

    const submitToDTO = (e: FormEvent<HTMLFormElement>): CreatePlayerDTO => {
        const { target } = e;
        const formData = new FormData(target as HTMLFormElement);

        return { name: 'test' }
    }

    const createPlayerHandler = async (createPlayerDTO: CreatePlayerDTO): Promise<void> => {
        console.log('Add player submit fired!');
        const { name } = createPlayerDTO;
        const newPlayer = await addPlayer({ name });
        console.log('Add player:');
        console.log(newPlayer);

        setShowForm(false);
    }

    React.useEffect(
        () => {
            setIsLoading(true);
            fetch()
            setIsLoading(false);

            async function fetch() {
                try {
                    console.log('Sideeffect Fetch - Start fetch...');
                    const players = await getPlayers();
                    console.log('Sideeffect Fetch - Setting players');
                    setPlayers(players);
                    console.log('Sideeffect Fetch - Reset Error');
                    setError('');
                } catch (error) {
                    let err = error as Error;
                    console.log('Sideeffect Fetch - Error!')
                    console.log(error);
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

                            {
                                showForm
                                    ? <form onSubmit={(e) => { e.preventDefault(); submitToDTO(e); }}>
                                        <input type="text" name='name' placeholder='User name' />

                                        <button type='submit'>Add user</button>
                                    </form>
                                    : null
                            }
                        </div>
                    </div>

                    {
                        (error !== '' || !players)
                            ? null
                            :
                            <div className={styles['content-footer']}>
                                <button
                                    className={styles['footer-btn']}
                                    onClick={addPlayerHandler}
                                >Add player</button>
                                {
                                    selectedPlayer
                                        ? <button
                                            className={`${styles['footer-btn']} ${styles['footer-btn--big']}`}
                                            onClick={loginHandler}
                                        >Enter!</button>
                                        : null
                                }
                            </div>
                    }

                </div>
            </div>

    )
}
