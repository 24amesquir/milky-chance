var uploadBox;
var client = class client {
  constructor(height, width) {
    this.height = document.body.clientHeight;
    this.width = document.body.clientWidth;
  }
}
var channel;
function onload() {
  uploadBox = document.getElementById('uploadMusic')
  autoScale()
  channel = myDecipher(window.location.toString().substring(window.location.toString().indexOf("?") + 1)).toString();
  console.log(channel)
  if (channel   == "\u0016\u0016\u0016\u0016\u0016\u001c\u0016\u0016\u0016\u0016\u0016\u0016\u0016»\u0016") {
     window.location.href = '/signin';}
  var title = `Channel content - ${channel}`;
  document.title = title;
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href =
    "https://cdn.glitch.com/28317d3e-f139-4c15-ae4b-a13ac84de942%2FmilkyChance.PNG?v=1632077943086";
  document.getElementsByTagName("head")[0].appendChild(link);
  window.onbeforeunload = closingCode;
  var box = document.getElementsByTagName("div")[0];
  var box2 = document.getElementsByTagName("div")[1];
  box.style.top =
    75 +
    "px";
  box.style.left =
    (document.body.clientWidth - box.getBoundingClientRect().width) / 2 +
    "px";

  box2.style.left = 7.5 + 'px';
  box2.style.width = box.getBoundingClientRect().width - 100 + "px";
  box2.style.height = box.getBoundingClientRect().height - 100 + "px";
}
function autoScale() {
  if (document.body.clientWidth > 960) {
    uploadBox
  }
}
function closingCode() {

}



















const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

// To create a cipher
const myCipher = cipher('username')

//Then cipher any text:
console.log(myCipher('Qman'))

//To decipher, you need to create a decipher and use it:
const myDecipher = decipher('username')