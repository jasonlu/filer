const Asset = require('./asset.js');
const Size = require('./size.js');
const sharp = require( 'sharp');
const path = require( 'path');

export class Image extends Asset {

    constructor(directory, name) {
        super(directory, name);
        this.type = path.extname(this.path);
        this._dimension = null;    
    }

    get width() {
        return this.dimension().width;
    }

    get height() {
        return this.dimension().height;
    }

    async dimension () {
        if (this._dimension) {
            return this._dimension;
        }

        else {
            const image = sharp(this.path);
            return image.metadata()
                .then(metadata => {
                    this._dimension = new Size(metadata.width, metadata.height);    
                });
        }
    }
}
