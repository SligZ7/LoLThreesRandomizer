export const winrateColor = (winrate, wins, loses) => {
    return winrate > 50 ? 'SeaGreen' : (wins > 0 || loses > 0) && winrate <= 49 ? 'indianred' : '';
};