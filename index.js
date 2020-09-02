const {createServer} = require('http');
const {stat, createReadStream, createWriteStream} = require('fs');
const fileName = './Android Development for Beginners - Full Course.mp4';
const {promisify} = require('util');
const multiparty = require('multiparty');

const fileInfo = promisify(stat);

const respondwithVideo = async (req, res) => {
    const { size } = await fileInfo(fileName);
    const range = req.headers.range;
    // console.log('range',range);
    if (range) {
        let [start, end] = range.replace(/bytes =/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
        res.writeHead(206, {
            'Content-Range': `bytes ${start} - ${end}/ ${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': 'video/mp4'
        })
        createReadStream(fileName, { start, end }).pipe(res);
    }
    else {
        res.writeHead(200,
            { 'contnet-length': size },
            { 'content-type': 'video/mp4' });
        createReadStream(fileName).pipe(res);

    }
}
createServer((req,res) =>{
if(req.method ==="POST"){
   let form = new multiparty.Form();
form.on('part',(part) =>{
    part.pipe(createWriteStream(`./${part.filename}`))
    .on('close', () =>{
res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end( `<h1>The uploaded file: ${part.filename} successful</h1>`)
    })
})
   form.parse(req);
}
   else if(req.url ==='/video'){
        respondwithVideo(req,res);
    }
    else{
        res.writeHead(200, {'content-Type' : 'text/html'});
res.end( `
 <form enctype ="multipart/form-data" method= "POST" action="/">
<input type="file" name="upload-video" />
<button>Upload file</button>
</form>
`)

    }
}).listen(9000, () => {
    console.log(`server is up running on port 9000`);
})