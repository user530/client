import React from 'react';

interface IGameHubPage {

}

export const GameHubPage: React.FC<IGameHubPage> = (props: IGameHubPage) => {
    const lobbyList = [
        { id: 1, name: 'asd' },
        { id: 2, name: 'bbb' },
        { id: 3, name: 'ccc' },
    ];

    let selectedLobbyId: null | number = null;

    const setSelectedLobby = (id: number) => {

        selectedLobbyId = id;
        console.log('Lobby selected: ', selectedLobbyId)
    };
    const handleQuitHubClick = () => { console.log('Quit btn clicked!') };
    const handleHostGameClick = () => { console.log('Host Game btn clicked!') };
    const handleJoinGameClick = () => { console.log('Join Game btn clicked!') };

    return <>
        <div style={{ minWidth: 600, minHeight: 350, backgroundColor: 'gray', padding: 50 }}>
            <div className="lobby-list" style={{ minWidth: 300, minHeight: 200, backgroundColor: 'white' }} >
                {
                    lobbyList.map(
                        ({ id, name }) => (
                            <div
                                key={id}
                                style={{ display: 'flex' }}
                                onClick={(e) => setSelectedLobby(id)}>
                                <p>{id}</p>
                                <p>{name}</p>
                            </div>
                        )
                    )
                }
            </div>

            <div className='hub-controls'>
                <button onClick={handleQuitHubClick}>Quit</button>
                <button onClick={handleHostGameClick}>Host</button>
                <button onClick={handleJoinGameClick}>Join</button>
            </div>
        </div>
    </>
};