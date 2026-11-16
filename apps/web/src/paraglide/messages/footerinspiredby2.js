/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerinspiredby2Inputs */



/**
* | output |
* | --- |
* | "Originally forked from" |
*
* @param {Footerinspiredby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerinspiredby2 = /** @type {((inputs?: Footerinspiredby2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerinspiredby2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bifurcado originalmente de")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最初分叉自")
	if (locale === "ja") return /** @type {LocalizedString} */ ("元々フォークしたプロジェクト:")
	if (locale === "ko") return /** @type {LocalizedString} */ ("원래 다음 프로젝트에서 포크됨:")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最初分叉自")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ursprünglich geforkt von")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Initialement forké depuis")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спочатку розгалужено з")
	return /** @type {LocalizedString} */ ("Originally forked from")
});
export { footerinspiredby2 as "footerInspiredBy" }