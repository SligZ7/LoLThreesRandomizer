import React from 'react'
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

export default function PlayerCharts({ stats, statsPlayer }) {
    return (
        <div>
            <Paper style={{ marginBottom: '1rem' }}>
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
        </div>

    )
}
