import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

function PlayerTable({ players }) {
    return (
        <Table striped bordered hover variant="light">
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
                {players.map((player, index) => {
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
    players: PropTypes.array.isRequired,
}

export default PlayerTable

