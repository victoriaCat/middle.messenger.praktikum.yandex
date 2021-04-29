export default function escape(r: string): string {
    return r.replace(/[\x26\x0A\<>'"]/g,
        (r) => {
            return "&#" + r.charCodeAt(0) + ";"
        })
}