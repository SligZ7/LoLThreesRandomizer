import React from 'react'
import { Table } from 'react-bootstrap';
import { winrateColor} from '../../utils';

export default function AllPlayersTable({allPlayers, isAram}) {
    return (
        <Table striped bordered className="text-white" small="true" style={{ fontWeight: 'bold' }}>
            <thead>
                <tr >
                    <th>Player</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>W/R %</th>
                </tr>
            </thead>
            <tbody>
                {allPlayers.map((player, index) => {
                    return (
                        <tr key={`${player.id}-${index}`}>
                            <td>{player.name}</td>
                            <td>{isAram ? player.aram_wins : player.wins}</td>
                            <td>{isAram ? player.aram_loses : player.loses}</td>
                            <td style={{
                                backgroundColor: isAram ? winrateColor(player.aram_winrate, player.aram_wins, player.aram_loses) :  winrateColor(player.winrate, player.wins, player.loses) 
                            }}>{isAram ? player.aram_winrate : player.winrate }%</td>
                        </tr>
                    )
                })}
            </tbody>
    </Table>
    )
}
