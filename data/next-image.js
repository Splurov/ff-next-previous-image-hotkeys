function getElementTopPos(obj) {
    var pos = 0;
    if (obj.offsetParent) {
        do {
			pos += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return pos;
}

self.port.on('init', function() {
    var images = document.getElementsByTagName('img');
    document.addEventListener('keypress', function(e) {
        if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
            var currentPos = window.scrollY;
            var toGo = null;
            if (e.keyCode === 40) {
                for (var i = 0, l = images.length; i < l; i++) {
                    var image = images[i];
                    var imageTopPos = getElementTopPos(image);
                    if (imageTopPos >= currentPos) {
                        if (imageTopPos > (window.innerHeight + currentPos)) {
                            toGo = imageTopPos;
                        } else if (images[i + 1]) {
                            toGo = getElementTopPos(images[i + 1]);
                            var j = 2;
                            while ((toGo <= 0 || toGo <= currentPos) && images[i + j]) {
                                toGo = getElementTopPos(images[i + j]);
                                j++;
                            }
                        }
                        break;
                    }
                }
            } else {
                for (var i = images.length - 1; i >= 0; i--) {
                    var image = images[i];
                    var imageTopPos = getElementTopPos(image);
                    if (imageTopPos < currentPos) {
                        toGo = imageTopPos;
                        break;
                    }
                }
            }
            if (toGo) {
                window.scrollTo(0, toGo);
            }
        }
    }, false);
});