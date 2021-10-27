let localTracks = [];
let isJoined = false;

/**
 * Handles all the Local (NOT REMOTE) Tracks
 * @param tracks is a Jitsi Array Object
*/
function onLocalTracks(tracks){
	localTracks = tracks;

	// *accessing all the Tracks (Audio and Video)
	for (let i = 0; i < localTracks.length; i++) {
		// ? adding event listener for all the Track Events
		// *write this > JitsiMeetJS.events.track on browser Console in order to get all the Available events on Track
			// LOCAL_TRACK_STOPPED: (...)
			// NO_AUDIO_INPUT: (...)
			// NO_DATA_FROM_SOURCE: (...)
			// TRACK_AUDIO_LEVEL_CHANGED: (...)
			// TRACK_AUDIO_OUTPUT_CHANGED: (...)
			// TRACK_MUTE_CHANGED: (...)
			// TRACK_VIDEOTYPE_CHANGED: (...)

		   // ? target.addEventListener(type, listener);
		
		// *setting only For Audio
		localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,aL => (console.log(`Audio level Local: ${aL}`)));

		localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,deviceId => (console.log(`Device ID changed to : ${deviceId}`)));

		localTracks[i].addEventListener(JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,()=> (console.log(`Local Track Muted`)));
		
		localTracks[i].addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,()=> (console.log(`Local Track Stopped`)));


		// *Setting for Video
		if(localTracks[i].getType() === 'video'){
            		$('body').append(`<video autoplay='1' id='localVideo${i}'/>`);
			localTracks[i].attach($((`#localVideo${i}`))[0]);
		}
		else{
            		$('body').append(`<audio autoplay='1' muted='true' id='localAudio${i}'/>`);
			localTracks[i].attach($((`#localAudio${i}`))[0]);

		}
		if (isJoined) {
			room.addTrack(localTracks[i]);
		}
	}
}

//* Printing on Device Change
function onDeviceListChanged(devices) {
    console.info('current devices', devices);
}



/**
 * Handles all the Remote Track (Audio, Video) from Participants
 * @param track JitsiTrack Object
*/
function onRemoteTrackAdd(track){
	console.log(track);
}


/**
 * That function is executed when the conference is joined
 */
function onConferenceJoined() {
    console.log('conference joined!');
    isJoined = true;
    for (let i = 0; i < localTracks.length; i++) {
        room.addTrack(localTracks[i]);
    }
}

//* this variable is used in the onConnectionSucess function
const confOptions = {
};

//* If Connection stablish is a success then this function is called
function onConnectionSuccess() {
	console.log("Conecction Successfully CONNECTED");
	//* After receiving the CONNECTION_ESTABLISHED event 
	//* we need to create the JitsiConference object 
	//* And we will attach listeners for conference events
	//* In order to see all the Conference Events 
	//* write > JitsiMeetJS.events.conference in the console.
    
	room = connection.initJitsiConference('conference', confOptions);

	room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrackAdd);
	room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {console.log(`track removed!!!${track}`);});
	
	room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED,onConferenceJoined);
	room.join();
}