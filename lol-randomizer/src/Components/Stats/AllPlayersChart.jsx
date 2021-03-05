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

export default function AllPlayersChart({ allPlayers }) {
    return (
        <Paper style={{ width: '50rem', height: '34rem' }} >
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
    )
}
