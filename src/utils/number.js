export default function(num = 0) {
  let str = num.toString();
  let len = str.length;

  if (len <= 5) {
    return num;
  } else if (5 < len && len <= 7) {
    return str.substr(0, len - 4) + "万+";
  } else if (len == 8) {
    return str.substr(0, len - 7) + "." + str.substr(1, len - 6) + "千万+";
  } else {
    if (len > 12) return "破兆";

    return str.substr(0, len - 8) + "." + str.substr(1, len - 7) + "亿+";
  }
}
