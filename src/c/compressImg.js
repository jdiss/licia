/* Compress image using canvas.
 *
 * |Name  |Type     |Desc      |
 * |------|---------|----------|
 * |file  |File Blob|Image file|
 * |[opts]|object   |Options   |
 * |[cb]  |function |Callback  |
 *
 * Available options:
 *
 * |Name       |Type  |Desc                            |
 * |-----------|------|--------------------------------|
 * |maxWidth   |number|Max width                       |
 * |maxHeight  |number|Max height                      |
 * |width      |number|Output image width              |
 * |height     |number|Output image height             |
 * |mimeType   |string|Mime type                       |
 * |quality=0.8|number|Image quality, range from 0 to 1|
 *
 * In order to keep image ratio, height will be ignored when width is set.
 *
 * And maxWith, maxHeight will be ignored if width or height is set.
 */

/* example
 * const file = new Blob([]);
 * compressImg(file, {
 *     maxWidth: 200
 * }, function (err, file) {
 *     // ...
 * });
 */

/* module
 * env: browser
 * test: browser
 */

/* typescript
 * export declare namespace compressImg {
 *     interface IOptions {
 *         maxWidth?: number;
 *         maxHeight?: number;
 *         width?: number;
 *         height?: number;
 *         mimeType?: string;
 *         quality?: number;
 *     }
 * }
 * export declare function compressImg(file: File | Blob, cb: Function): void;
 * export declare function compressImg(
 *     file: File | Blob,
 *     opts?: compressImg.IOptions,
 *     cb?: Function
 * ): void;
 */

_('isFn loadImg noop defaults createUrl');

exports = function(file, opts, cb) {
    if (isFn(opts)) {
        cb = opts;
        opts = {};
    }

    cb = cb || noop;
    opts = opts || {};
    defaults(opts, defOpts);
    opts.mimeType = opts.mimeType || file.type;

    loadImg(createUrl(file), function(err, img) {
        if (err) return cb(err);

        compress(img, opts, cb);
    });
};

function compress(img, opts, cb) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    var width = img.width,
        height = img.height,
        ratio = width / height;

    var maxWidth = opts.maxWidth,
        maxHeight = opts.maxHeight;

    if (opts.width || opts.height) {
        if (opts.width) {
            width = opts.width;
            height = width / ratio;
        } else if (opts.height) {
            height = opts.height;
            width = height * ratio;
        }
    } else {
        if (width > maxWidth) {
            width = maxWidth;
            height = width / ratio;
        }

        if (height > maxHeight) {
            height = maxHeight;
            width = height * ratio;
        }
    }

    width = floor(width);
    height = floor(height);

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);
    if (URL) URL.revokeObjectURL(img.src);
    if (canvas.toBlob) {
        canvas.toBlob(
            function(file) {
                cb(null, file);
            },
            opts.mimeType,
            opts.quality
        );
    } else {
        cb(new Error('Canvas toBlob is not supported'));
    }
}

var defOpts = {
    maxWidth: Infinity,
    maxHeight: Infinity,
    quality: 0.8
};

var floor = Math.floor;
