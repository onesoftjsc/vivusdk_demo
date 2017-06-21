/**
 * Created by phamquan on 6/9/17.
 */

var vdevices = vdevices || {};

vdevices.audio = {};
vdevices.video = {};

var liveId = 'sharescreenid12';


vdevices.onclick = function () {
    var eResolution = document.getElementById('resolution');
    var eAudio = document.getElementById('selectaudio');
    var eVideo = document.getElementById('selectvideo');
    var strResolution = eResolution.options[eResolution.selectedIndex].value;
    var audioSource = eAudio.options[eAudio.selectedIndex].value;
    var videoSource = eVideo.options[eVideo.selectedIndex].value;
    var constraints = {
        audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
        video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    };
    var resolution
    var vplayer = ivivu.mapLiveIdToLiveIPlayer[liveId];
    if (typeof vplayer != 'undefined'){
        vplayer.setup({audioId: audioSource, videoId: videoSource, resolution: Number(strResolution)});
        vplayer.restart();
    }else{
        vplayer = ivivu.createNewVideo('live', liveId);
        vplayer.setup({audioId: audioSource, videoId: videoSource, resolution: Number(strResolution)});
        vplayer.addParent('container');
        vplayer.start();
    }

}
$(document).ready(function () {
    var appId = $("meta[name='appId']").attr("content");
    ivivu.init(appId, function () {
        ivivu.authenticate(appId, function () {
            var viewer = document.getElementById('container-view');
            if (viewer != null) {
                var vplayer = ivivu.createNewVideo('view', liveId);
                vplayer.addParent('container-view');
                vplayer.start();
            } else
                //navigator.mediaDevices.enumerateDevices().then(vdevices.gotDevices).catch(handleError);
                ivivu.setDevice('selectaudio', 'selectvideo');
                ivivu.setResolution('resolution');
        });
    });

    ivivu.onVideoConnected = function(vplayer){

    }

    ivivu.onVideoDisconnect = function (vplayer) {
    }
});