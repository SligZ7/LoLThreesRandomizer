import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import axios from 'axios';

function PlayerTable({ allPlayers }) {
    const [stats, setStats] = useState([]);
    const [hideTable, setHideTable] = useState(false)

    const handleStats = (id) => () => {
        axios.get(`http://localhost:5000/stats/${id}`).then(res => {
            res.data.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
            setStats(res.data);
            setHideTable(true);
        });
    };

    const handleShowTable = () => {
        setHideTable(false);
    }

    return (
        <div style={{ width: '30rem', height: '60rem' }}>
            {!hideTable &&
                <Table striped bordered small="true" className="text-black" style={{ height: '79%', background: "lightgrey", fontWeight: 'bold' }}>
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
                                <tr key={`${player.id}-${index}`}>
                                    <td>{index + 1}</td>
                                    <td onClick={handleStats(player.id)} style={{ cursor: 'pointer' }}>{player.name}</td>
                                    <td>{player.wins}</td>
                                    <td>{player.loses}</td>
                                    <td style={{
                                        color: Math.round(winrate * 100) > 50 ? 'green' : (player.wins > 0 || player.loses > 0) && Math.round(winrate * 100) <= 49 ? 'red' : 'black'
                                    }}>{winrate ? Math.round(winrate * 100) : 0}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>}
            {hideTable && (<div>
                <Button variant="secondary" type="button" onClick={handleShowTable} style={{ marginBottom: '1rem' }}>
                    Back
                        </Button>
                <Table striped bordered small="true" className="text-black" style={{ height: '79%', background: "lightblue", fontWeight: 'bold' }}>
                    <thead>
                        <tr >
                            <th>#</th>
                            <th>Team mate</th>
                            <th>Wins</th>
                            <th>Loses</th>
                            <th>W/R %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((stat, index) => {
                            const winrate = stat.wins / (stat.wins + stat.loses);
                            return (
                                <tr key={`${stat.player}`}>
                                    <td>{index + 1}</td>
                                    <td>{stat.player}</td>
                                    <td>{stat.wins}</td>
                                    <td>{stat.loses}</td>
                                    <td style={{
                                        color: Math.round(winrate * 100) > 50 ? 'green' : (stat.wins > 0 || stat.loses > 0) && Math.round(winrate * 100) <= 49 ? 'red' : 'black'
                                    }}>{winrate ? Math.round(winrate * 100) : 0}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>)}
        </div>
    )
}

PlayerTable.propTypes = {
    allPlayers: PropTypes.array.isRequired,
}

export default PlayerTable

