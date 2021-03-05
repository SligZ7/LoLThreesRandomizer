import React, { useState } from "react";
import TeamGenerator from "./TeamGenerator";
import DnD from "./Dnd";

const Home = () => {
    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    return (
        <div style={{ padding: '20px 0px 20px 0px' }}>
            <div style={{ display: "flex", justifyContent: "space-around", alignContent: "space-around", alignItems: "start" }}>
                <DnD available={available} selected={selected} setAvailable={setAvailable} setSelected={setSelected} />
                <TeamGenerator setAvailable={setAvailable} selected={selected} setSelected={setSelected} />
            </div>
        </div>
    );
}

export default Home;