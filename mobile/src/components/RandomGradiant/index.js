export default function RandomGradient(color, customColor) {
  var selectedColor = blue;

  if (customColor) {
    selectedColor = customColor;
  } else if (color === "blue") {
    selectedColor = blue;
  } else if (color === "red") {
    selectedColor = red;
  } else if (color === "navi") {
    selectedColor = navi;
  } else if (color === "pastel") {
    selectedColor = pastel;
  } else if (color === "rainbow") {
    selectedColor = rainbow;
  }

  var arraySize = selectedColor.length - 1;

  function populate(a) {
    var x = Math.round(Math.random() * arraySize);
    var y = selectedColor[x];
    a += y;
    return a;
  }

  var newColor1 = populate("#");
  var newColor2 = populate("#");

  const colors = [newColor1, newColor2];

  return colors;
}

const blue = [
  "001F68",
  "01276F",
  "032E76",
  "04367D",
  "053E84",
  "07458B",
  "084D92",
  "095499",
  "0B5CA0",
  "0C64A7",
  "0D6BAD",
  "0E73B4",
  "107BBB",
  "1182C2",
  "128AC9",
  "1491D0",
  "1599D7",
  "16A1DE",
  "18A8E5",
  "18A8E5",
  "19B0EC",
];

const red = [
  "03071e",
  "370617",
  "6a040f",
  "9d0208",
  "d00000",
  "dc2f02",
  "e85d04",
  "f48c06",
  "faa307",
  "ffba08",
];

const navi = ["e63946", "a8dadc", "457b9d", "1d3557"];

const pastel = ["264653","2a9d8f","e9c46a","f4a261","e76f51"];

const rainbow = ["ef476f","ffd166","06d6a0","118ab2","073b4c"];
