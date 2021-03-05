import React from 'react'
import { Table } from 'react-bootstrap';

export default function AllPlayersTable({allPlayers, handleStats}) {
    return (
        <Table striped bordered className="text-white" small="true" style={{ width: '65rem', fontWeight: 'bold' }}>
        <thead>
            <tr >
                <th>#</th>
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
                        <td>{index + 1}</td>
                        <td>{player.name}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td style={{
                            color: player.winrate > 50 ? 'green' : (player.wins > 0 || player.loses > 0) && player.winrate <= 49 ? 'red' : 'white'
                        }}>{player.winrate ? player.winrate : 0}%</td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
    )
}