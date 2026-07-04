/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderscrolltotop3Inputs */

const en_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scroll to top`)
};

const es_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Volver arriba`)
};

const zh_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`滚动到顶部`)
};

const ja_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一番上までスクロール`)
};

const ko_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`맨 위로 스크롤`)
};

const zh_hant1_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`捲動到頂部`)
};

const de_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scrollen Sie nach oben`)
};

const fr_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Faire défiler vers le haut`)
};

/**
* | output |
* | --- |
* | "Scroll to top" |
*
* @param {Builderscrolltotop3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderscrolltotop3 = /** @type {((inputs?: Builderscrolltotop3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderscrolltotop3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderscrolltotop3(inputs)
	if (locale === "es") return es_builderscrolltotop3(inputs)
	if (locale === "zh") return zh_builderscrolltotop3(inputs)
	if (locale === "ja") return ja_builderscrolltotop3(inputs)
	if (locale === "ko") return ko_builderscrolltotop3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderscrolltotop3(inputs)
	if (locale === "de") return de_builderscrolltotop3(inputs)
	return fr_builderscrolltotop3(inputs)
});
export { builderscrolltotop3 as "builderScrollToTop" }