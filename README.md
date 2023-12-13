# lazyloadJpegOrWebp()

Yeh, a super creative name. But basically it does what the name suggests: It loads a JPEG or – if the browser supports – a WEBP file when the `ìmg` element enters the viewport.

See demo in `index.html`.

## Usage
1. Load the script in your project (or copy the file contents to your own script file):
```html
<script src="webplazyload.js"></script>
```

2. Create the markup for the `ìmg` element, providing a "normal" image file (JPEG in the most cases) **and** the corresponding WEBP file.

```html
<img src="images/placeholder.jpg" class="lazyjpegwebp" data-src="images/image.jpg" data-srcwebp="images/image.webp" alt="Testing image">
```

(The `src` attribute may be left empty if you want so)

## Notes
This script will not generate the WEBP file for you – this is the task of your CMS / you / your code. This script only provides a way to lazy load a WEBP file if the browser supports while falling back to the "normale" image if not the case.

In a real-life scenario you should also compare the filesize of the WEBP against the "normal" file and only populate the `data-srcwebp` attribute if WEBP is smaller than the other file. WEBP isn't the holy grail, so in some cases a JPEG is even smaller than a WEBP.

You should also consider to provide a fallback for no-js browser, e.g. by using an additional image elment within `<noscript>` element.
