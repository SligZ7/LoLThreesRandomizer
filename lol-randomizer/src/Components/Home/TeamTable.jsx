import React from 'react'
import PlayerCard from './Card';
import vayne from '../../Assets/vayne.png';
import shyvana from '../../Assets/shyv.png';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const champs = ['Champion', 'Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 'Aurelion Sol', 'Azir',
    'Bard', 'Blitzcrank', 'Brand', 'Braum',
    'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'Gath', 'Corki',
    'Darius', 'Diana', 'Dr. Mundo', 'Draven',
    'Ekko', 'Elise', 'Evelynn', 'Ezreal',
    'Fiddlesticks', 'Fiora', 'Fizz',
    'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves',
    'Hecarim', 'Heimerdinger',
    'Illaoi', 'Irelia', 'Ivern',
    'Janna', 'Jarvan', 'Jax', 'Jayce', 'Jhin', 'Jinx',
    'Kai\'Sa', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw',
    'LeBlanc', 'Lee Sin', 'Leona', 'Lillia', 'Lissandra', 'Lucian', 'Lulu', 'Lux',
    'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune', 'Mordekaiser', 'Morgana',
    'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nocturne', 'Nunu',
    'Olaf', 'Orianna', 'Ornn',
    'Pantheon', 'Poppy', 'Pyke',
    'Qiyana', 'Quinn',
    'Rakan', 'Rammus', 'Rek \'Sai', 'Rell', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze',
    'Samira', 'Sejuani', 'Senna', 'Seraphine', 'Sett', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Sylas', 'Syndra',
    'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch',
    'Udyr', 'Urgot',
    'Varus', 'Vayne', 'Veigar', 'Vel\' Koz', 'Vi', 'Viego', 'Viktor', 'Vladimir', 'Volibear',
    'Warwick', 'Wukong',
    'Xayah', 'Xerath', 'Xin Zhao',
    'Yasuo', 'Yone', 'Yorick', 'Yuumi',
    'Zac', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'];


const cardContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };

export default function TeamsTable({ team, setTeam, color, isAram }) {
    console.log('champs', champs.length);

    return (
        <div style={cardContainer}>
            {team.map((player, index) =>
                <div key={`${player.name}-${index}`} style={{ border: 'solid', marginBottom: '10px' }}>
                    <div style={{ height: '100px', backgroundImage: color === 'blue' ? `url(${vayne})` : `url(${shyvana})`, backgroundPosition: color === 'blue' ? `25px -${((index + 1) * 100) - 100}px` : `-200px -${((index + 1) * 100) - 100}px`, backgroundRepeat: 'no-repeat', backgroundSize: '900px', boxShadow: '2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', }}>
                        <PlayerCard key={index} color={color} player={player} isAram={isAram} />
                    </div>
                    <div style={{ borderTop: 'solid', backgroundColor: 'white' }}>
                        <Autocomplete
                            value={player.champion || champs[0]}
                            onChange={(event, newInputValue) => {
                                setTeam([...team.slice(0, index), { ...team[index], champion: newInputValue }, ...team.slice(index + 1)]);
                            }}
                            options={champs}
                            style={{ width: 300 }}

                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                </div>
            )
            }
        </div>);
};

