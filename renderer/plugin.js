Plugin.extend({
    _type: 'com.github.steotia.peerplay.scorer.summary',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
        console.log('com.github.steotia.peerplay.scorer.summary');
        console.log('data', data);
        var instance = this;
        instance._self = new createjs.Container();
        var dims = instance.relativeDims();
        instance._self.x = dims.x;
        instance._self.y = dims.y;
        instance._self.w = dims.w;
        instance._self.h = dims.h;

        var core = instance._theme.getParam('com.github.steotia.peerplay.core');
        if (_.isUndefined(core)) {
            console.log('com.github.steotia.peerplay.scorer.summary CORE: undefined');
        } else {
            console.log('com.github.steotia.peerplay.scorer.summary CORE: OK');
            instance._theme.setParam('com.github.steotia.peerplay.core',undefined);
            // EkstepRendererAPI.dispatchEvent('com.github.steotia.peerplay.core.cleanup');
        }

        var p1Score, p2Score;

        var scores = instance._theme.getParam('com.github.steotia.peerplay.scorer.scores')||{};
        var myuuid = instance._theme.getParam('com.github.steotia.peerplay.scorer.uuid');
        console.log('com.github.steotia.peerplay.scorer.summary uuid: '+JSON.stringify(myuuid)+' scores '+JSON.stringify(scores));

        var uuid;
        for(uuid in scores){
            if(uuid!=myuuid){
                p2Score = scores[myuuid]||0;
            } else {
                p1Score = scores[myuuid]||0;
            }
        }

        var banner = EkstepRendererAPI.getPluginInstance("result");
        var bannerText;
        if(p1Score==p2Score){
            bannerText="It is a draw!";
        } else if(p1Score<p2Score){
            bannerText="Your friend won!";
        } else {
            bannerText="You won!";
        }
        banner._self.text=bannerText;

        EkstepRendererAPI.getPluginInstance('finalP1Score')._self.text=p1Score;
        EkstepRendererAPI.getPluginInstance('finalP2Score')._self.text=p2Score;

        Renderer.update = true;


    }
});
//# sourceURL=com.github.steotia.peerplay.scorer.summary.js
