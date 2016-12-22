// @flow
import Dexie from 'dexie';

const Database = new Dexie("images");

Database.version(1).stores({
    images: '++id,name,file,size,lastModifiedDate'
});

Database.open().catch(function (e) {
    console.error ("Open failed: " + e);
});

function getFiles () : Promise<File[]> {
    return Database.images
        .toCollection()
        .toArray()
        .then( images => images
            .map( image => image.file )
            .map( file => file.preview = URL.createObjectURL(file) )
        );
}

function addFile (file: File) {
    Database.images.add({ name: file.name, size: file.size, lastModifiedDate: file.lastModifiedDate, file});
}

export default { getFiles, addFile };