console.log("working");

const options = {
    hosts: {
        domain: '8x8.vc',
        muc: `conference.8x8.vc`,
        focus: 'focus.8x8.vc'
    },
    //serviceUrl: 'wss://meet.jit.si/xmpp-websocket' 
    serviceUrl: `wss://8x8.vc/xmpp-websocket`,
};

// Different Types of Log Level 
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.DEBUG);
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.INFO);
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.LOG);
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.TRACE);
JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.WARN);

//* Setting Options in order to Initialize/Creating a new JistiMeet Object
const initOptions = {
    disableAudioLevels: true
};

//* Initializing the JitsiMeetJS object
JitsiMeetJS.init(initOptions);

//* Creating LOCAL Trackes 
JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
    .then(onLocalTracks)
    .catch(error => {
        throw error;
});

//* Creating new Connection with the Options
let connection = null;
connection = new JitsiMeetJS.JitsiConnection(null,null,options);

//* Adding eventListener for Different Connection Events
//? There are different kinds of events situated in JitsiMeetJS
    //? write > jistiMeetJS.events in the Console.
        //? conference 
        //? connection
            //? CONNECTION_DISCONNECTED
            //? CONNECTION_ESTABLISHED
            //? CONNECTION_FAILED
            //? DISPLAY_NAME_REQUIRED 
            //? WRONG_STATE 
        //? connectionQuality
        //? detection
        //? e2eping 
        //? mediaDevices
        //? track

connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,onConnectionSuccess);
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED,() => console.log("connection FAILED"));
connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,() => console.log("connection Disconnected"));

JitsiMeetJS.mediaDevices.addEventListener(JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,onDeviceListChanged);

connection.connect();