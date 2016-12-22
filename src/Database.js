// @flow
import Dexie from 'dexie';
import Image from './model/Image';

const Database = new Dexie("images");

Database.version(1).stores({
    images: '++id,name,size'
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

function readFile (file: File) : Promise<Uint8Array>  {
    return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.onload = e => resolve(new Uint8Array(e.target.result));
        reader.readAsArrayBuffer(file);
    });
}

function addFile (file: File) {
    readFile(file)
        .then(data => Database.images.add({ name: file.name, size: file.size, data}));
}

export default { getImages, addFile };