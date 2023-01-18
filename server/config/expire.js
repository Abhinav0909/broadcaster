const fs = require("fs");
const File = require("../modal/file");
const connectDb = require('./database');
const process = require('process');
connectDb();
const fetchData = async() => {
    const expiryData= new Date(Date.now()-24*60*60*1000);
    const files = await File.findOne({createdAt:{$lt:pastDate}});
    if(files.length){
        for (const file of files){
            try{
            fs.unlinkSync(file.path);
            await file.remove();
            console.log(`Successfully deleted ${file.filename}`)
            }catch(err){
                console.log(`Error while while deleting the file ${err}`)
            }
        }
    }
    console.log('Job done')
}
fetchData().then(process.exit)