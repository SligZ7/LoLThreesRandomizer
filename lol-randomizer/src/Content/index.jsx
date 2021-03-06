import React from 'react';
import { Switch, Route } from "react-router-dom";
import Stats from '../Components/Stats';
import Home from '../Components/Home'
import MatchHistory from '../Components/MatchHistory';

export const Randomizer = () => {
    return (
        <Switch>
            <Route path="/stats">
                <Stats />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/games" exact>
                <MatchHistory />
            </Route>
        </Switch>
    )
}
