import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

function PlayerTable({ allPlayers }) {
    allPlayers.sort((a, b) => b.wins - a.wins || a.loses - b.loses);

    return (
        <div style={{ width: '30rem', height: '60rem'}}>
            <Table striped bordered small className="text-black" style={{ height: '79%', background: "lightgrey", fontWeight: 'bold' }}>
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
                        const winrate = player.wins / (player.wins + player.loses);
                        return (
                            <tr key={`${player}-${index}`}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.wins}</td>
                                <td>{player.loses}</td>
                                <td style={{
                                    color: Math.round(winrate * 100) > 50 ? 'green' : (player.wins > 0 || player.loses > 0 ) && Math.round(winrate * 100) <= 49  ? 'red' : 'black'
                                }}>{winrate ? Math.round(winrate * 100) : 0}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

PlayerTable.propTypes = {
    allPlayers: PropTypes.array.isRequired,
}

export default PlayerTable

