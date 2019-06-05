/// <reference path="../../../typings/altv-client.d.ts" />
import * as alt from 'alt';
import * as game from 'natives';

// Triggered from server-side and emits a message back up to server-side.
alt.onServer('onFirstConnect', () => {
    alt.log('You connected! Wow!');
    alt.emitServer('spawnPlayer');
});