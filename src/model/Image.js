// @flow
import itpc from 'node-iptc';
import {Buffer} from 'buffer';

class StringBuffer extends Buffer {

    // This is workaround for using itpc lib in web browser
    // this 5 lines was copied from itpc lib
    getString (offset, length) {
        var string = [];
        for (var i = offset; i < offset + length; i++) {
            string.push(String.fromCharCode(this[i]));
        }
        return string.join('');
    }
}

function maybeString<T> (data: T): ?string {
    return data instanceof String ? data : null;
}

class Image {
    caption: ?string;
    city: ?string;
    country: ?string;
    keywords: string[];
    data: Uint8Array;

    constructor (arrayBuffer : ArrayBuffer) {
        let buffer : StringBuffer = new StringBuffer(arrayBuffer);
        let result : { [id: string] : string|string[] } = itpc(buffer);
        this.caption = maybeString(result['caption']);
        this.city = maybeString(result['city']);
        this.country = maybeString(result['country_or_primary_location_name']);
        this.keywords = result['keywords'] instanceof Array ? result['keywords'] : [];

        this.data = new Uint8Array(arrayBuffer);
    }

    getUrl () {
        let blob = new Blob([this.data]);
        return URL.createObjectURL(blob);
    }
}

export default Image;