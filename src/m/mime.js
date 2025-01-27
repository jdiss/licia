/* Common mime types.
 *
 * |Name  |Type  |Desc     |
 * |------|------|---------|
 * |name  |string|Extension|
 * |return|string|Mime type|
 *
 * |Name  |Type  |Desc     |
 * |------|------|---------|
 * |name  |string|Mime type|
 * |return|string|Extension|
 *
 * It contains only the most common file types.
 */

/* example
 * mime('jpg'); // -> 'image/jpeg'
 * mime('bmp'); // -> 'image/bmp'
 * mime('video/mp4'); // -> 'mp4'
 */

/* module
 * env: all
 * test: all
 */

/* typescript
 * export declare function mime(name: string): string;
 */

_('each');

const exts = {
    // image
    'image/jpeg': ['jpeg', 'jpg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
    'image/tiff': ['tif', 'tiff'],
    'image/bmp': ['bmp'],
    'image/vnd.adobe.photoshop': ['psd'],
    'image/svg+xml': ['svg'],
    // audio
    'audio/mp4': ['m4a', 'mp4a'],
    'audio/midi': ['midi'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['ogg'],
    'audio/wav': ['wav'],
    // video
    'video/mp4': ['mp4', 'mp4v', 'mpg4'],
    'video/x-matroska': ['mkv'],
    'video/webm': ['webm'],
    'video/x-msvideo': ['avi'],
    'video/quicktime': ['qt', 'mov'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/3gpp': ['3gp', '3gpp'],
    // text
    'text/css': ['css'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/yaml': ['yaml', 'yml'],
    'text/csv': ['csv'],
    'text/markdown': ['markdown', 'md'],
    'text/plain': ['txt', 'text', 'conf', 'log', 'ini'],
    // font
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    // application
    'application/zip': ['zip'],
    'application/x-tar': ['tar'],
    'application/x-rar-compressed': ['rar'],
    'application/gzip': ['gz'],
    'application/x-7z-compressed': ['7z'],
    'application/octet-stream': [
        'bin',
        'so',
        'exe',
        'dll',
        'dmg',
        'iso',
        'msi'
    ],
    'application/epub+zip': ['epub'],
    'application/javascript': ['js'],
    'application/json': ['json'],
    'application/msword': ['doc', 'docx', 'dot', 'dotx'],
    'application/vnd.ms-excel': ['xls', 'xlsx', 'xla', 'xlt'],
    'application/vnd.ms-powerpoint': ['ppt', 'pptx', 'pps', 'pot'],
    'application/pdf': ['pdf'],
    'application/wasm': ['wasm'],
    'application/xml': ['xml'],
    'application/xml-dtd': ['dtd']
};

const mimeTypes = {};

each(exts, (ext, mimeType) => {
    each(ext, e => {
        mimeTypes[e] = mimeType;
    });
});

exports = function(name) {
    return isMimeType(name) ? getExt(name) : getType(name);
};

function getType(name) {
    return mimeTypes[name];
}

function getExt(name) {
    if (exts[name]) {
        return exts[name][0];
    }
}

function isMimeType(name) {
    return name.indexOf('/') > -1;
}
