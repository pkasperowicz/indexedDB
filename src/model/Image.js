// @flow

class Image {
    name: string;
    data: Uint32Array;

    getUrl () {
        let blob = new Blob([this.data]);
        return URL.createObjectURL(blob);
    }
}

export default Image;