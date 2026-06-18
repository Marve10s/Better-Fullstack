/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Notfoundtext2Inputs */

const en_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The page you're looking for doesn't exist.`)
};

const es_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La página que buscas no existe.`)
};

const zh_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你要找的页面不存在。`)
};

const ja_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`お探しのページは存在しません。`)
};

const ko_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`찾으시는 페이지가 존재하지 않습니다.`)
};

const zh_hant1_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你要找的頁面不存在。`)
};

const de_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die gesuchte Seite existiert nicht.`)
};

const fr_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La page que vous recherchez n'existe pas.`)
};

/**
* | output |
* | --- |
* | "The page you're looking for doesn't exist." |
*
* @param {Notfoundtext2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const notfoundtext2 = /** @type {((inputs?: Notfoundtext2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notfoundtext2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_notfoundtext2(inputs)
	if (locale === "es") return es_notfoundtext2(inputs)
	if (locale === "zh") return zh_notfoundtext2(inputs)
	if (locale === "ja") return ja_notfoundtext2(inputs)
	if (locale === "ko") return ko_notfoundtext2(inputs)
	if (locale === "zh-Hant") return zh_hant1_notfoundtext2(inputs)
	if (locale === "de") return de_notfoundtext2(inputs)
	return fr_notfoundtext2(inputs)
});
export { notfoundtext2 as "notFoundText" }