import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types'

function PlayerTable({ propplayers }) {
    // demo object till prop is ready
    const testPlayers = [
        {
            name: "Sachin",
            wins: 5,
            loses: 0,
        },
        {
            name: "Zack",
            wins: 4,
            loses: 1,
        },
        {
            name: "Parth",
            wins: 3,
            loses: 2,
        },
        {
            name: "Blink",
            wins: 2,
            loses: 3,
        },
    ]

    const [players, setPlayers] = useState(testPlayers);
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
                {players.map((player, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{player.name}</td>
                        <td>{player.wins}</td>
                        <td>{player.loses}</td>
                        <td>{player.wins / (player.wins + player.loses) * 100}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

PlayerTable.propTypes = {
    propplayers: PropTypes.object.isRequired,
}

export default PlayerTable

