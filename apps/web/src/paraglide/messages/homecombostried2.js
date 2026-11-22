/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombostried2Inputs */



/**
* | output |
* | --- |
* | "tried since you got here" |
*
* @param {Homecombostried2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombostried2 = /** @type {((inputs?: Homecombostried2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombostried2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("probados desde que llegaste")
	if (locale === "zh") return /** @type {LocalizedString} */ ("自你到来后已尝试")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ここに来てから試した数")
	if (locale === "ko") return /** @type {LocalizedString} */ ("방문한 뒤 시도한 수")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("自你到來後已嘗試")
	if (locale === "de") return /** @type {LocalizedString} */ ("getestet, seit du hier bist")
	if (locale === "fr") return /** @type {LocalizedString} */ ("essayés depuis votre arrivée")
	if (locale === "uk") return /** @type {LocalizedString} */ ("перевірено, відколи ви тут")
	return /** @type {LocalizedString} */ ("tried since you got here")
});
export { homecombostried2 as "homeCombosTried" }