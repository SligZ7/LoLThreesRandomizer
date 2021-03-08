export const winrateColor = (winrate, wins, loses) => {
    return winrate > 50 ? 'SeaGreen' : (winrate < 50 &&  (wins > 0 || loses > 0)) ? 'indianred' : winrate === 50 ? 'SandyBrown' : ''
};