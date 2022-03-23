export default function corssSiteScript(url) {
  console.log(url);
  var good = true;
  if (url.includes("<")) {
    console.log("found" + url.charAt("<"));
    good = false;
  }
  if (url.includes(">")) {
    console.log("found" + url.charAt("<"));

    good = false;
  }

  return good;
}
