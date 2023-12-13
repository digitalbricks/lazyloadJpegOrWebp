function lazyloadJpegOrWebp(selector){

    // get all images with class lazyjpegwebp
    let lazyImages = document.querySelectorAll(selector);

    // check if IntersectionObserver is supported
    let observerSupported = 'IntersectionObserver' in window;

    check_webp_feature('lossy', function (feature, webpSupported) {
        
        // just for testing the different cases: Override detection results
        // (that's because we use 'let' instead of 'const')
        //webpSupported = false;
        //observerSupported = true;

        // CASE 1: IntersectionObserver is supported
        // intialise the IntersectionObserver
        // (we will check for webp support in the callback function)
        if(observerSupported){
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        //console.log('Image is in the viewport');
                        // get image elment and read the attributes
                        const img = entry.target;
                        const srcplaceholder = img.getAttribute('src');
                        const srcdefault = img.getAttribute('data-src');
                        const srcwebp = img.getAttribute('data-srcwebp');

                        // set the src attribute, depending on webp support
                        if(webpSupported && srcwebp && srcwebp.length > 0){
                            // set the src attribute to the data-srcwebp value
                            img.setAttribute('src', srcwebp);
                        } else {
                            // set the src attribute to the data-src value
                            img.setAttribute('src', srcdefault);
                        }
            
                        // stop observing the image
                        observer.unobserve(entry.target);
                    } else {
                        //console.log('Image is not in the viewport');
                    }
                });
            }, {});
            
            lazyImages.forEach(img => {
                observer.observe(img);
            });
            return;
        }
        

        // CASE 2: webp is supported, IntersectionObserver is NOT supported 
        if (webpSupported && !observerSupported) {            
            console.log('webp is supported, IntersectionObserver is NOT supported');
            // We replace the src attribute with the data-srcwebp attribute (WEBP) immediately
            // So no lazy loading for browsers without IntersectionObserver support
            lazyImages.forEach(img => {
                const srcdefault = img.getAttribute('data-srcwebp');
                img.setAttribute('src', srcdefault);
                console.log(srcdefault);
            });
            return;
        }
        
        // CASE 3 (Fallback): no webp support, no IntersectionObserver support
        else {
            console.log('all other cases');
            // We replace the src attribute with the data-src attribute (JPEG) immediately
            // So no lazy loading for browsers without IntersectionObserver support
            lazyImages.forEach(img => {
                const srcdefault = img.getAttribute('data-src');
                img.setAttribute('src', srcdefault);
                console.log(srcdefault);
            });
            return;
        }
    });

    
    // check_webp_feature (as nested function):
    //    @seource: https://developers.google.com/speed/webp/faq?hl=de#how_can_i_detect_browser_support_for_webp
    //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
    //   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
    function check_webp_feature(feature, callback) {
        var kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        var img = new Image();
        img.onload = function () {
            var result = (img.width > 0) && (img.height > 0);
            callback(feature, result);
        };
        img.onerror = function () {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    }

    
}






lazyloadJpegOrWebp('.lazyjpegwebp');

