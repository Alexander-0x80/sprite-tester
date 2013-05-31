$(function(){
    'use strict';

    var dom = {
        dragger: $("#dragger"),
        animateButton: $("#animate"),
        frameCounter: $("#frame"),
        spriteContainers: $(".sprite-container"),
        spriteSize: $("#sprite-size"),
        smallSprite: $("#small-sprite"),
        smallSwitch: $("#small-sprite-opt"),
        bigSprite: $("#big-sprite"),
        bigSwitch: $("#big-sprite-opt"),
        frames: $("#frames-count"),
        backgroundSwitch: $("#sprite-bg"),
        sprite: $(".sprite")
    },
    options = {
        speed: 150,
        size: 12,
        bsize: dom.bigSprite.width(),
        frames: 0
    },
    glob = {
        interval: null
    };

    dom.dragger.on({
        dragenter: function(e){ 
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass("hover"); },
        dragleave: function(e){ 
            e.preventDefault();
            e.stopPropagation();
            $(this).removeClass("hover"); },
        dragover: function(e){
            e.preventDefault();
            e.stopPropagation();
        },
        drop: onFileDrop
    });

    dom.animateButton.on("click", onAnimate);
    dom.spriteSize.on("change", onSpriteSize);
    dom.backgroundSwitch.on("change",onBgChange);
    dom.smallSwitch.on("click", function(){
        if ($(this).prop("checked")) {
            dom.smallSprite.show();
        } else {
            dom.smallSprite.hide();
        }
    });

    dom.bigSwitch.on("click", function(){
        if ($(this).prop("checked")) {
            dom.bigSprite.show();
        } else {
            dom.bigSprite.hide();
        }
    });

    function onAnimate(e){
        var pos = 0,bpos = options.bsize;
        options.frames = (dom.frames.val()) ? dom.frames.val() : 0;
        if (!options.frames || !$.isNumeric(options.frames)) { 
            alert("Enter frames count!");
            return;
        }
        $(this).text("Stop");
        if (glob.interval === null) {
            glob.interval = setInterval(function(){
                pos = (pos >= options.frames * options.size) ? 0 : pos + options.size;
                dom.smallSprite.css({"backgroundPosition": pos + "px"});
                dom.bigSprite.css({"backgroundPosition": (pos/options.size) * options.bsize + "px"});
                dom.frameCounter.text(pos/options.size);
            }, options.speed);
        } else { 
            clearInterval(glob.interval);
            glob.interval = null;
            $(this).text("Animate");
        }
    };

    function onSpriteSize(e){
        var size = $(this).val();
        dom.smallSprite
            .width(size)
            .height(size); 
    };

    function onFileDrop(e) {
        if(e.originalEvent.dataTransfer){
            e.preventDefault();
            $(this).removeClass("hover");
            try {
                var file = e.originalEvent.dataTransfer.files[0];
                if (!file.type.match("image.*")) { 
                    alert("Not an image file");
                    return;
                }
                dom.sprite.css("background","url(./sprites/" + file.name + ")");
            } catch(ex)
                { console.log(ex.message); }   
        }
    }

    function onBgChange(e) {
        dom.spriteContainers.css("background",$(this).val());
    }
});