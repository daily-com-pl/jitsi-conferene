let options;
let roomName;
let connection = null;

function buildOptions(){
    return{
        connection: {
            hosts: {
                domain: '8x8.vc',
                muc: `conference.8x8.vc`,
                focus: 'focus.8x8.vc'
            },
            serviceUrl: `wss://8x8.vc/xmpp-websocket?room=${roomName}`,
            clientNode: 'http://jitsi.org/jitsimeet'
        }
    };
}

$(document).ready(()=>{

    //* Different Types of Log Level 
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

    //* Go button Click Action
    $("#goButton").click(()=>{

        options = buildOptions();
        roomName = $("#roomInput").val();

        //* Creating new Connection with the Options
        connection = new JitsiMeetJS.JitsiConnection(null,null,options.connection);


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

        //* Creating LOCAL Trackes 
        JitsiMeetJS.createLocalTracks({ devices: [ 'audio', 'video' ] })
        .then(onLocalTracks)
        .catch(error => {
            throw error;
        });
        
    });

});
