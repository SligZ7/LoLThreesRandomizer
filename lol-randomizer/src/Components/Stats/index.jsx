import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllPlayersTable from './AllPlayersTable';
import { Table } from 'react-bootstrap';

const Stats = () => {
    const [stats, setStats] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [sortedAllPlayers, setSortedAllPlayers] = useState([]);
    const [isAram, setIsAram] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:5000/players');

            const sortedData = data.slice();
            isAram ? sortedData.sort((a, b) => b.aram_wins - a.aram_wins || a.aram_loses - b.aram_loses) : sortedData.sort((a, b) => b.wins - a.wins || a.loses - b.loses);
            let arr = await Promise.all(data.map(async (player) => await axios.get(isAram ?  `http://localhost:5000/aramStats/${player.id}` : `http://localhost:5000/stats/${player.id}` )));
            arr = arr.map((res) => res.data);

            data.map((player, index) => arr.forEach((stat, i) => {
                if (i === index) stat.splice(i, 0, "NA")
            }));
            setStats(arr);
            setAllPlayers(data);
            setSortedAllPlayers(sortedData);
        })()
    }, [isAram])

    const handleSetAram = () => {
        setIsAram((curr) => !curr);
    }

    return (
        <div> 
            <button onClick={handleSetAram} style={{marginTop: '30px'}}>Aram Toggle</button>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'center', marginTop: '2rem', height: '100%', width: '100%' }}>
                <div>
                    <AllPlayersTable allPlayers={sortedAllPlayers} isAram={isAram} />
                </div>
                <div>
                    <Table striped bordered className="text-white" small="true" style={{ fontWeight: 'bold' }}>
                        <thead>
                            {<tr>
                                <td style={{ backgroundColor: 'DodgerBlue' }}>Games against</td>
                                {allPlayers.map((player, index) => <td>{player.name}</td>)}
                            </tr>}
                        </thead>
                        <tbody>
                            {allPlayers.map((player, index) =>
                                <tr>
                                    <td>{player.name}</td>
                                    {stats[index].map((stat, i) =>
                                        <td style={{ backgroundColor: stat.enemyWins / (stat.enemyWins + stat.enemyLoses) > .5 ? 'SeaGreen' : stat.enemyWins / (stat.enemyWins + stat.enemyLoses) < .5 ? 'indianred' : stat.enemyWins / (stat.enemyWins + stat.enemyLoses) === .5 ? 'SandyBrown' : '' }}>{stat.player ? `${stat.enemyWins}-${stat.enemyLoses}` : "NA"}</td>
                                    )}
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Table striped bordered className="text-white" small="true" style={{ fontWeight: 'bold' }}>
                        <thead>
                            {<tr>
                                <td style={{ backgroundColor: 'DodgerBlue' }}>Games With</td>
                                {allPlayers.map((player, index) => <td>{player.name}</td>)}
                            </tr>}
                        </thead>
                        <tbody>
                            {allPlayers.map((player, index) =>
                                <tr >
                                    <td>{player.name}</td>
                                    {stats[index].map((stat, i) =>
                                        <td style={{ backgroundColor: stat.teamWins / (stat.teamWins + stat.teamLoses) > .5 ? 'SeaGreen' : stat.teamWins / (stat.teamWins + stat.teamLoses) < .5 ? 'indianred' : stat.teamWins / (stat.teamWins + stat.teamLoses) === .5 ? 'SandyBrown' : '' }}>{stat.player ? `${stat.teamWins}-${stat.teamLoses}` : "NA"}</td>
                                    )}
                                </tr>)}
                        </tbody>
                    </Table>
                </div>

            </div></div>

    );

};

export default Stats;
