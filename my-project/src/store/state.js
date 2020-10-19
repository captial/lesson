let defaultCite = '上海'
try {
    if (localStorage.city) {
        defaultCite = localStorage.city
    }
}
catch (e) { }
export default {
    city: defaultCite
}