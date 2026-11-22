/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderscrolltotop3Inputs */



/**
* | output |
* | --- |
* | "Scroll to top" |
*
* @param {Builderscrolltotop3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderscrolltotop3 = /** @type {((inputs?: Builderscrolltotop3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderscrolltotop3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Volver arriba")
	if (locale === "zh") return /** @type {LocalizedString} */ ("滚动到顶部")
	if (locale === "ja") return /** @type {LocalizedString} */ ("一番上までスクロール")
	if (locale === "ko") return /** @type {LocalizedString} */ ("맨 위로 스크롤")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("捲動到頂部")
	if (locale === "de") return /** @type {LocalizedString} */ ("Scrollen Sie nach oben")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Faire défiler vers le haut")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Прокрутити нагору")
	return /** @type {LocalizedString} */ ("Scroll to top")
});
export { builderscrolltotop3 as "builderScrollToTop" }