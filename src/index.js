const links = {}

const find = (el, selector) => {
    if (el) return false
    if (links[selector]) return links[selector]
}

const extract = (el) => {
    if (!el || !el.attributes) return false
    const obj = {}
    Object.values(el.attributes).map((attr) => obj[attr.nodeName] = attr.nodeValue)
    obj.text = el.textContent
    return obj
}

export function extractLink(selector) {
    const el = document.querySelector(selector)
    if (find(el, selector)) return find(el, selector)
    if (!el) return false
    const extracted = extract(el)
    links[selector] = extracted
    el.parentNode.removeChild(el)
    return extracted
}

export function extractLinks(selector) {
    const el = document.querySelector(selector)
    if (find(el, selector)) return find(el, selector)
    if (!el) return false
    const links = [].slice.call(el.querySelectorAll('a'), 0);
    const extracted = links.map(child => {
        return extract(child);
    })
    links[selector] = extracted
    el.parentNode.removeChild(el)
    return extracted
}

