// @flow
import Dexie from 'dexie';
import Image from './model/Image';

const Database = new Dexie("images");

Database.version(1).stores({
    images: '++id,name,size'
});

Database.version(2).stores({
    images: '++id,caption,city,country,*keywords'
}).upgrade(function () {
    return Database.images.modify(image => {
        image.city = null;
        image.country = null;
        image.caption = image.name;
        image.keywords = [];
        delete image.name;
        delete image.size;
    });
});

Database.open().catch(function (e) {
    console.error ("Open failed: " + e);
});

Database.images.mapToClass (Image);

function getImages () : Promise<Image[]> {
    return Database.images
        .toCollection()
        .toArray();
}

function readFile (file: File) : Promise<ArrayBuffer>  {
    return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsArrayBuffer(file);
    });
}

function addFile (file: File) : Promise<number> {
    return readFile(file)
        .then(arrayBuffer => Database.images.add(new Image(arrayBuffer)));
}

function searchImages (query: string) : Promise<Image[]> {
    return Database.images
        .where('keywords').startsWithIgnoreCase(query)
        .or('city').startsWithIgnoreCase(query)
        .or('country').startsWithIgnoreCase(query)
        .or('caption').startsWithIgnoreCase(query)
        .toArray();
}

export default { getImages, addFile, searchImages };