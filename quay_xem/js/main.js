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
    var secretKey = $("meta[name='secretKey']").attr("content");

    ivivu.init(appId,
        //success
        function (sessionId) {
        var token = md5(appId + secretKey + sessionId);
        ivivu.authenticate(token,
            //success
            function () {
            var viewer = document.getElementById('container-view');
            if (viewer != null) {
                var vplayer = ivivu.createNewVideo('view', liveId);
                vplayer.addParent('container-view');
                vplayer.onConnected = function(){
                    vplayer.mute();
                }
                vplayer.start();
            } else
                ivivu.setDevice('selectaudio', 'selectvideo');
                ivivu.setResolution('resolution');
             },
              //error
            function(){

            });
        },
        //error
        function(){

        });

    ivivu.onVideoConnected = function(vplayer){

    }

    ivivu.onVideoDisconnect = function (vplayer) {
    }
});