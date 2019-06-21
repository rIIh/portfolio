export function randomInteger(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
export function getRGBComponents(color: string) {
  var r = color.substring(1, 3);
  var g = color.substring(3, 5);
  var b = color.substring(5, 7);

  return {
    R: parseInt(r, 16),
    G: parseInt(g, 16),
    B: parseInt(b, 16)
  };
}
export function idealTextColor(bgColor: string) {
  var nThreshold = 105;
  var components = getRGBComponents(bgColor);
  var bgDelta =
    components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? "#000" : "#fff";
}

export function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}