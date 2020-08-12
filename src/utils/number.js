export default function(num = 0) {
  let str = num.toString();
  let len = str.length;

  if (len <= 4) {
    return num;
  } else if (5 <= len && len <= 8) {
    return str.substr(0, len - 4) + "万+";
  } else if (len == 9) {
    return str.substr(0, len - 8) + "." + str.substr(1, len - 7) + "亿+";
  } else if (9 < len && len <= 12) {
    return str.substr(0, len - 8) + "亿+";
  } else {
    return "破兆";
  }
}
