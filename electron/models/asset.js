const path = require('path');
const fs = require('fs-extra');

class Asset {

    constructor (directory, name) {
        this.directory = directory;
        this.name = name;
    }

    get path () {
        const fullPath = path.resolve(this.directory, this.name);
        return fullPath;
    }

    get size () {
        const stats = fs.statSync(this.path);
        const fileSizeInBytes = stats.size;
        return fileSizeInBytes;
    }

    toString () {
        let str = "Asset: {";
        str += "\n\tname: " + this.name;
        str += "\n\tdirectory: " + this.directory;
        str += "\n\tpath: " + this.path;
        str += "\n\tisDirectory: " + this.isDirectory;
        str += "\n\tsize: " + this.size;
        str += "\n}\n";
        return str;
    }
}

module.exports = {
  Asset,
  default: Asset,
}
