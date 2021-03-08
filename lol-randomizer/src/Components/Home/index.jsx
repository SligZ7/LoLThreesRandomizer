import React, { useState } from "react";
import TeamGenerator from "./TeamGenerator";
import DnD from "./Dnd";

const Home = () => {
    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    return (
        <div style={{ padding: '20px 0px 20px 0px' }}>
            <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-around", alignItems: "start", height: '100%' }}>
                <div style={{marginBottom: '40px'}}>
                    <DnD available={available} selected={selected} setAvailable={setAvailable} setSelected={setSelected} />
                </div>
                <div style={{ display: 'flex', height: '750px', alignItems: 'center' }}>
                    <TeamGenerator setAvailable={setAvailable} selected={selected} setSelected={setSelected} />
                </div>

            </div>
        </div>
    );
}

export default Home;