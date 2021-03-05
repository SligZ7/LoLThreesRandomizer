import React from 'react';
import { Switch, Route } from "react-router-dom";
import Stats from '../Components/Stats';
import Home from '../Components/Home'

export const Randomizer = () => {
    return (
        <Switch>
            <Route path="/stats">
                <Stats />
            </Route>
            <Route path="/" exact>
                <Home />
            </Route>
        </Switch>
    )
}
