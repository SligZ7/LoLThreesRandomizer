import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

function PlayerTable({ allPlayers }) {
    allPlayers.sort((a, b) => b.wins - a.wins || a.loses - b.loses);

    return (
        <Table striped bordered className="text-white">
            <thead>
                <tr>
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
                            <td>{winrate ? Math.round(winrate * 100) : 0}%</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

PlayerTable.propTypes = {
    allPlayers: PropTypes.array.isRequired,
}

export default PlayerTable

