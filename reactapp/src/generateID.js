export default function generateID() {
    const length = 5;
    //const letters_no_o = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
    const numbers = "0123456789";
    //const alphanumeric = letters_no_o.concat(numbers);
    let code = '';
    for (let i = 0; i < length; i++) {
        code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    console.log(code);
    return code;
}