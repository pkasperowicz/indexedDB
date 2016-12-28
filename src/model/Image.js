import itpc from 'node-iptc';
import { Buffer } from 'buffer';

class Image {
    caption: ?string;
    city: ?string;
    country: ?string;
    keywords: string[];
    data: Uint32Array;

    constructor (arrayBuffer : ArrayBuffer) {
        let result : { [id: string] : string|string[] } = itpc(new Buffer(arrayBuffer));
        this.caption = result['caption'];
        this.city = result['city'];
        this.country = result['country_or_primary_location_name'];
        this.keywords = result['keywords'] || [];

        this.data = new Uint8Array(arrayBuffer);
    }

    getUrl () {
        let blob = new Blob([this.data]);
        return URL.createObjectURL(blob);
    }
}


// This is workaround for using itpc lib in web browser
// this 5 lines was copied from itpc lib
Buffer.prototype.getString = function (offset, length) {
    var string = [];
    for (var i = offset; i < offset + length; i++)
        string.push(String.fromCharCode(this[i]));
    return string.join('');
};

export default Image;