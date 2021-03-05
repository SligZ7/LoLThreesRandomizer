import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AllPlayersTable from './AllPlayersTable';
import AllPlayersChart from './AllPlayersChart';
import PlayerStats from './PlayerStats';
import PlayerCharts from './PlayerCharts';
import { Table } from 'react-bootstrap';

const PlayerTable = () => {
    const [stats, setStats] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [sortedAllPlayers, setSortedAllPlayers] = useState([]);
    console.log('stats', stats, allPlayers);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:5000/players');

            const sortedData = data.slice();
            sortedData.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
            let arr = await Promise.all(data.map(async (player) => await axios.get(`http://localhost:5000/stats/${player.id}`)));
            arr = arr.map((res) => res.data);

            data.map((player, index) => arr.map((stat, i) => {
                if (i === index) stat.splice(i, 0, "NA")
            }));
            setStats(arr);
            setAllPlayers(data);
            setSortedAllPlayers(sortedData);
        })()
    }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', alignItems: 'space-around', marginTop: '2rem', height: '100%', width: '100%' }}>
            <AllPlayersTable allPlayers={sortedAllPlayers} />
            <div>
                <Table striped bordered className="text-white" small="true" style={{ width: '65rem', fontWeight: 'bold' }}>
                    {<tr>
                        <td>Games against</td>
                        {allPlayers.map((player, index) => <td>{player.name}</td>)}
                    </tr>}
                    {allPlayers.map((player, index) =>
                        <tr>
                            <td style={{ color: 'royalblue' }}>{player.name}</td>
                            {stats[index].map((stat, i) =>
                                <td style={{ color: stat.enemyWins / (stat.enemyWins + stat.enemyLoses) > .5 ? 'green' : stat.enemyWins / (stat.enemyWins + stat.enemyLoses) < .5 ? 'red' : stat.enemyWins / (stat.enemyWins + stat.enemyLoses) === .5 ? 'yellow' : 'white' }}>{stat.player ? `${stat.enemyWins}-${stat.enemyLoses}` : "NA"}</td>
                            )}
                        </tr>)}
                </Table>
            </div>
            <div>
                <Table striped bordered className="text-white" small="true" style={{  width: '65rem', fontWeight: 'bold' }}>
                    {<tr>
                        <td>Games With</td>
                        {allPlayers.map((player, index) => <td>{player.name}</td>)}
                    </tr>}
                    {allPlayers.map((player, index) =>
                        <tr>
                            <td style={{ color: 'royalblue' }}>{player.name}</td>
                            {stats[index].map((stat, i) =>
                                <td style={{ color: stat.teamWins / (stat.teamWins + stat.teamLoses) > .5 ? 'green' : stat.teamWins / (stat.teamWins + stat.teamLoses) < .5 ? 'red' : stat.teamWins / (stat.teamWins + stat.teamLoses) === .5 ? 'yellow' : 'white' }}>{stat.player ? `${stat.teamWins}-${stat.teamLoses}` : "NA"}</td>
                            )}
                        </tr>)}
                </Table>
            </div>

        </div>
    );

};

export default PlayerTable;