const AdmZip = require('adm-zip');

class Zip {
    constructor () {
        // creating archives
        this.zip = new AdmZip();
    }

    addFiles (filePathes) {
        for (const f of filePathes){
            // add local file
            
            this.zip.addLocalFile(f);
        } 
    }

    save (path) {
        // or write everything to disk
        this.zip.writeZip(path);
    }
}

exports.Zip = Zip;
