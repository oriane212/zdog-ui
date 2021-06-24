export default function fixCamelCase(str, caps=true) {
    
    function replaceLetter(letter) {
        let l = (caps) ? letter : letter.toLowerCase();
        return (' ' + l);
    }

    let newStr = str.replace(/[A-Z]/g, replaceLetter);
    if (caps) {
        let uc = newStr.charAt(0).toUpperCase();
        newStr = uc + newStr.slice(1);
    }
    return newStr;
}