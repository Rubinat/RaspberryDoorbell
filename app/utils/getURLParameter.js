export default function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=?([^&#]*)?");
    var results = regex.exec(location.search);
    if (results === null) {
        return null;
    } else if (results[1] === undefined) {
        return "";
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}
