export function getLocaleItem(locales, localeId) {
    if (!localeId) return {};
    const inValueIdx = locales.findIndex(
        (locale) => locale.localeId === localeId
    );
    if (inValueIdx < 0) return {};
    return locales[inValueIdx]
}

export function getLocaleValue(locales, prop, localeId) {
    const localeItem = getLocaleItem(locales, localeId)
    if (!localeItem) return
    return localeItem[prop]
}