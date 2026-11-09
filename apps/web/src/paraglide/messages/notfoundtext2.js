/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Notfoundtext2Inputs */



/**
* | output |
* | --- |
* | "The page you're looking for doesn't exist." |
*
* @param {Notfoundtext2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const notfoundtext2 = /** @type {((inputs?: Notfoundtext2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notfoundtext2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La página que buscas no existe.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你要找的页面不存在。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("お探しのページは存在しません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("찾으시는 페이지가 존재하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你要找的頁面不存在。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Die gesuchte Seite existiert nicht.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La page que vous recherchez n'existe pas.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Такої сторінки немає.")
	return /** @type {LocalizedString} */ ("The page you're looking for doesn't exist.")
});
export { notfoundtext2 as "notFoundText" }