import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, Stack } from '@devexpress/dx-react-chart';

function PlayerTable() {
    const [stats, setStats] = useState([]);
    const [statsPlayer, setStatsPlayer] = useState("");
    const [hideTable, setHideTable] = useState(false)
    const [allPlayers, setAllPlayers] = useState([]);
    const handleStats = (id, name) => () => {
        axios.get(`http://localhost:5000/stats/${id}`).then(res => {
            res.data.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
            setStatsPlayer(name);
            setStats(res.data);
            setHideTable(true);
        });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/players')
            .then(res => {
                const data = res.data;
                data.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
                setAllPlayers(data);
            })
    }, [])

    const handleShowTable = () => {
        setHideTable(false);
    }

    return !hideTable ? (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'space-around', backgroundColor: '#333333', padding: '10rem 0rem 12rem 0rem' }}>
            <Table striped bordered small="true" className="text-black" style={{ width: '50rem', background: "lightgrey", fontWeight: 'bold' }}>
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
                                <td onClick={handleStats(player.id, player.name)} style={{ cursor: 'pointer' }}>{player.name}</td>
                                <td>{player.wins}</td>
                                <td>{player.loses}</td>
                                <td style={{
                                    color: player.winrate > 50 ? 'green' : (player.wins > 0 || player.loses > 0) && player.winrate <= 49 ? 'red' : 'black'
                                }}>{player.winrate ? player.winrate : 0}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Paper style={{ width: '55rem', height: '34rem' }} >
                <Chart
                    data={allPlayers}
                >
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries
                        valueField="wins"
                        argumentField="name"
                        name="Wins"
                    />
                    <BarSeries
                        valueField="loses"
                        argumentField="name"
                        name="Loses"
                    />
                    <Title text="Games" />
                    <Animation />
                    <Legend />
                    <Stack />
                </Chart>
            </Paper>
        </div>
    ) :
        (<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', backgroundColor: '#333333', paddingBottom: '5rem' }}>
            <div><Button variant="secondary" type="button" onClick={handleShowTable} style={{ marginBottom: '1rem', marginTop: "6rem" }}>
                Back to all players
                        </Button>
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
                                        color: Math.round(teamWinrate * 100) > 50 ? 'green' : (stat.teamWins > 0 || stat.teamLoses > 0) && Math.round(teamWinrate * 100) <= 49 ? 'red' : 'black'
                                    }}>{teamWinrate ? Math.round(teamWinrate * 100) : 0}%</td>
                                    <td>{stat.enemyWins}</td>
                                    <td>{stat.enemyLoses}</td>
                                    <td style={{
                                        color: Math.round(enemyWinrate * 100) > 50 ? 'green' : (stat.enemyWins > 0 || stat.enemyWins > 0) && Math.round(enemyWinrate * 100) <= 49 ? 'red' : 'black'
                                    }}>{enemyWinrate ? Math.round(enemyWinrate * 100) : 0}%</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div style={{ marginTop: "1rem" }} >
                < Paper style={{ marginBottom: '1rem' }}>
                    <Chart
                        data={stats} height="400" width="750"
                    >
                        <ArgumentAxis />
                        <ValueAxis />
                        <BarSeries
                            valueField="teamWins"
                            argumentField="player"
                            name="Wins"
                        />
                        <BarSeries
                            valueField="teamLoses"
                            argumentField="player"
                            name="Loses"
                        />
                        <Title text={`With ${statsPlayer}`} />
                        <Animation />
                        <Legend />
                        <Stack stacks={[{ series: ['Wins', 'Loses'] }]} />
                    </Chart>
                </Paper>
                <Paper >
                    <Chart
                        data={stats} height="400" width="750"
                    >
                        <ArgumentAxis />
                        <ValueAxis />
                        <BarSeries
                            valueField="enemyWins"
                            argumentField="player"
                            name="Wins"
                        />
                        <BarSeries
                            valueField="enemyLoses"
                            argumentField="player"
                            name="Loses"
                        />
                        <Title text={`Against ${statsPlayer}`} />
                        <Animation />
                        <Legend />
                        <Stack stacks={[{ series: ['Wins', 'Loses'] }]} />
                    </Chart>
                </Paper>
            </div >
        </div >);
}

export default PlayerTable

