var links = {};

var find = function find(el, selector) {
    if (el) return false;
    if (links[selector]) return links[selector];
};

var extract = function extract(el) {
    if (!el || !el.attributes) return false;
    var obj = {};
    Object.values(el.attributes).map(function (attr) {
        return obj[attr.nodeName] = attr.nodeValue;
    });
    obj.text = el.textContent;
    return obj;
};

export function extractLink(selector) {
    var el = document.querySelector(selector);
    if (find(el, selector)) return find(el, selector);
    if (!el) return false;
    var extracted = extract(el);
    links[selector] = extracted;
    el.parentNode.removeChild(el);
    return extracted;
}

export function extractLinks(selector) {
    var el = document.querySelector(selector);
    if (find(el, selector)) return find(el, selector);
    if (!el) return false;
    var links = [].slice.call(el.querySelectorAll('a'), 0);
    var extracted = links.map(function (child) {
        return extract(child);
    });
    links[selector] = extracted;
    el.parentNode.removeChild(el);
    return extracted;
}