import alt, { Player } from 'alt';
import chat from 'chat';

export function Startup() {
    console.log('Commands Loaded!');
}

// Uses the chat resource to register a command.
chat.registerCmd('pos', (player, args) => {
    return chat.send(player, `X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
});