const { locale, locales } = window.config
import jsCookie from "js-cookie";

function getLocale (locales, fallback) {
  const locale = jsCookie.get('locale')
  if (locales.includes(locale)) {
    return locale
  } else if (locale) {
    jsCookie.remove('locale')
  }

  return fallback
}

export default () => {
  return {
    item: getLocale(locales, locale),
    items: locales,
    error: null,
    errors: {}
  }
}
