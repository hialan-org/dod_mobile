import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);