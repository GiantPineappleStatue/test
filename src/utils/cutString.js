export function cutString(s, n) {
    var cut = s.indexOf(' ', n);
    if (cut == -1) return s;
    return s.substring(0, cut);
}
