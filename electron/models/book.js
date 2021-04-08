const { Asset } = require('./asset.js');
// import { Image } from './image.js';

class Book extends Asset {

    constructor (directory, name) {
        super(directory, name);

        this._assets = [];
        this._size = 0;
    }

    get size () {
        return this._size;
    }

    get assets () {
        return this._assets;
    }

    addAsset () {

    }

    addAssets (assets) {
        assets.forEach(file => {
            const asset = new Asset(this.path, file.name);
            // asset.isDirectory = file.isDirectory();
            this._assets.push(asset);
            this._size += asset.size;
            // console.log(asset.width);
        });
    }   
}

exports.Book = Book;
