const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (dirPath.includes('node_modules') || dirPath.includes('.next')) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('f:\\sukientoanquoc\\src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let cnt = fs.readFileSync(filePath, 'utf8');
        // Xóa khoảng trắng trong URls tel: và zalo.me/
        let newCnt = cnt.replace(/href=(['"`])tel:0854 517 868\1/g, 'href=$1tel:0854517868$1');
        newCnt = newCnt.replace(/href=(['"`])https:\/\/zalo\.me\/0854 517 868\1/g, 'href=$1https://zalo.me/0854517868$1');
        
        // Hoặc cho các trường hợp như `tel:0854 517 868` (template literal)
        newCnt = newCnt.replace(/`tel:0854 517 868`/g, '`tel:0854517868`');

        if (cnt !== newCnt) {
            fs.writeFileSync(filePath, newCnt, 'utf8');
            console.log('Fixed link spacing in:', filePath);
        }
    }
});
