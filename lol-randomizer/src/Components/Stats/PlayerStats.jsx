import React from 'react'
import { Table } from 'react-bootstrap';

export default function PlayerStats({stats, statsPlayer}) {
    return (
        <Table striped bordered small="true" className="text-black" style={{ background: "lightblue", fontWeight: 'bold' }}>
        <thead>
            <tr >
                <th></th>
                <th></th>
                <th></th>
                <th>{statsPlayer}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <tr >
                <th>#</th>
                <th>Player</th>
                <th>Wins with</th>
                <th>Loses with</th>
                <th>Team WR %</th>
                <th>Wins vs.</th>
                <th>Loses vs.</th>
                <th>Enemy WR %</th>
            </tr>
        </thead>
        <tbody>
            {stats.map((stat, index) => {
                const teamWinrate = stat.teamWins / (stat.teamWins + stat.teamLoses);
                const enemyWinrate = stat.enemyWins / (stat.enemyWins + stat.enemyLoses);
                return (
                    <tr key={`${stat.player}`}>
                        <td>{index + 1}</td>
                        <td>{stat.player}</td>
                        <td>{stat.teamWins}</td>
                        <td>{stat.teamLoses}</td>
                        <td style={{
                            color: Math.round(teamWinrate * 100) > 50 ? 'green' : (stat.teamWins > 0 || stat.teamLoses > 0) && Math.round(teamWinrate * 100) <= 49 ? 'red' : 'white'
                        }}>{teamWinrate ? Math.round(teamWinrate * 100) : 0}%</td>
                        <td>{stat.enemyWins}</td>
                        <td>{stat.enemyLoses}</td>
                        <td style={{
                            color: Math.round(enemyWinrate * 100) > 50 ? 'green' : (stat.enemyWins > 0 || stat.enemyWins > 0) && Math.round(enemyWinrate * 100) <= 49 ? 'red' : 'white'
                        }}>{enemyWinrate ? Math.round(enemyWinrate * 100) : 0}%</td>

                    </tr>
                )
            })}
        </tbody>
    </Table>
    )
}
