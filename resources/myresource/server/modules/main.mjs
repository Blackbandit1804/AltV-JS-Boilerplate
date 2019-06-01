import alt, { Player, Vehicle } from 'alt';
import chat from 'chat';

console.log('==> MyResource Started Successfully');

// Called on Serverside
alt.on('playerConnect', (player) => {
    alt.emitClient(player, 'onFirstConnect');
    alt.log(`==> ${player.name} has connected.`);
    chat.broadcast(`==> ${player.name} has joined.`);
});

// Called from clientside.
alt.onClient('spawnPlayer', (player) => {
    player.model = 'mp_m_freemode_01';
    player.pos = { x: 813, y: -279, z: 66 };
    chat.send(player, 'You have been spawned.');
});
