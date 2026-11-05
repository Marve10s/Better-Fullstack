/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpwebframework6Inputs */

const en_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP framework.`)
};

const es_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP de PHP.`)
};

const zh_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 框架。`)
};

const ja_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP の HTTP フレームワーク。`)
};

const ko_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 프레임워크.`)
};

const zh_hant1_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 框架。`)
};

const de_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-HTTP-Framework.`)
};

const fr_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP PHP.`)
};

const uk_docsclisummaryphpphpwebframework6 = /** @type {(inputs: Docsclisummaryphpphpwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-фреймворк PHP.`)
};

/**
* | output |
* | --- |
* | "PHP HTTP framework." |
*
* @param {Docsclisummaryphpphpwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpwebframework6 = /** @type {((inputs?: Docsclisummaryphpphpwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "de") return de_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpwebframework6(inputs)
	return en_docsclisummaryphpphpwebframework6(inputs)
});
export { docsclisummaryphpphpwebframework6 as "docsCliSummaryPhpPhpWebFramework" }