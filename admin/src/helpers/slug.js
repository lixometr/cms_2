import * as slugify from "slugify"

export function makeSlug(str) {
  
    return slugify(str, {
        replacement: '-', 
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      
        strict: true,     // strip special characters except replacement, defaults to `false`
    })
}
