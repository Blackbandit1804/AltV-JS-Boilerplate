### AltV.mp - JS - Boiler Plate
---
A super basic boiler plate that will let you write an ALT:V resource from scratch. Doesn't have any types included in it. You'll have to decipher a lot of the functions that exist or potentially refer to other game modes and documentation.

This boiler plate is entirely meant to take the setup out of ALT:V node-js and just get you going outright.

**Note:** This does **NOT** provider type support. You are going in blind.

---
### Basic Installation:
* Clone this repository or download it directly and extract it.
* Download a copy of the ALT:V MP Server for NodeJS
	* Make sure you add the NodeJS module to your download.
	* Make sure you add the Data module to your download.
* Extract the .zip received from ALT:V into the cloned folder.
* Replace anything **EXCEPT** `config.cfg`
* Open a command prompt and run `npm install`
* It may not install anything but its best to run it anyways; it gets you familiar with npm anyway.

**Note:** Alt:V uses ES6 for importing packages from npm.
`import x from 'y'`

---

### Additional Information

---
### I'm Coming From Rage
Well, you're in for a treat. The sync is great. The rest of it has a long way to go. You'll need to build A LOT of features from the ground up. If you were struggling to develop on RAGE this is probably not for you at the time of the creation of this README file.

You will need to implement a lot of features outright; there isn't even a chatbox built in. This boilerplate provides the chatbox from the AltV.mp server downloads. You'll see a reference to it inside of the resource.cfg for **myresource**.

If you change the folder name of **myresource** you will need to change the **server.cfg** as well.

---

### Hotkeys:
There is no way to re-open the browser.
F8 - Open Console
P/ESC - Open GTA:V Menu

---

### Console Commands
You will need to **reconnect** each time you restart your server.
```
quit
disconnect
reconnect
```
---

### Example Resource
[LS-Gangware Resource](https://github.com/altmp/ls-gangwar)

---

### Events

Events are pretty straight forward. You just need to do for server-side.
```
alt.on('eventName', (x, y, z, zz) => {
    console.log(x);
    console.log(y);
    console.log(z);
    console.log(zz);
});
```

**Server Events:**
```
playerConnect
playerDisconnect
playerDamage
playerDeath
entityEnterCheckpoint
entityLeaveCheckpoint
playerEnteredVehicle
playerLeftVehicle
playerChangedVehicleSeat
removeEntity
consoleCommand
```

**Client Events:**
```
keyup
keydown
connectionComplete
consoleCommand
gameEntityCreate
gameEntityDestroy
syncedMetaChange
update
```

---
### Basic Communication

**Server to Client**
We must specify the player to call this client event for.
```
alt.emitClient(player, 'uniqueEvent', args);
```

**Client from Server**
When you recieve an event from the server for a specific player.
```
alt.onServer('uniqueEvent', (args) => {
    alt.log('I got something from the server.');
});
```

**Client to Server**
We don't have to specify the player because this is running locally for the player who its currently calling from.
```
alt.emitServer('uniqueServerEvent`, args);
```

**Server from Client**
When you recieve an event from the client for a specific player.
```
alt.onClient('uniqueServerEvent', (player, args) => {
    console.log('I got an event from the client.');
});

**Client to CEF**
We must create an HTML view with a Javascript file linked to the HTML to intercept events from clientside.
```
const url = "http://resources/myresource/client/html/index.html";
let view = new alt.WebView(url);
view.emit('helloWorld', args);
```

**CEF from Client**
As stated above you need to add a script to your HTML file. Usually at the bottom of the body.
*Inside your .html file*
```
<body>
	<script src="./app.js"></script>
</body>
```
*Inside app.js*
```
if('alt' in window) {
	alt.on('helloWorld', emitFunction);
}

function emitFunction(args) {
	// This will be really hard to read btw.
	document.write('Hello World!');
}
```

**CEF to Client**
Sending from the *app.js* requires a simple emit.
```
alt.emit('fromCEF', args);
```

**Client from CEF**
Receiving an emit event from the CEF just requires adding an **on** to the view.
```
view.on('fromCEF', (args) => {
	alt.log('This is from the CEF~~');
});
```

---