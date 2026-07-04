/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Gohome1Inputs */

const en_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go Home`)
};

const es_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ir al inicio`)
};

const zh_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回首页`)
};

const ja_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`家に帰れ`)
};

const ko_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`집으로 이동`)
};

const zh_hant1_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回首頁`)
};

const de_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nach Hause gehen`)
};

const fr_gohome1 = /** @type {(inputs: Gohome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rentrer à la maison`)
};

/**
* | output |
* | --- |
* | "Go Home" |
*
* @param {Gohome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const gohome1 = /** @type {((inputs?: Gohome1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Gohome1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_gohome1(inputs)
	if (locale === "es") return es_gohome1(inputs)
	if (locale === "zh") return zh_gohome1(inputs)
	if (locale === "ja") return ja_gohome1(inputs)
	if (locale === "ko") return ko_gohome1(inputs)
	if (locale === "zh-Hant") return zh_hant1_gohome1(inputs)
	if (locale === "de") return de_gohome1(inputs)
	return fr_gohome1(inputs)
});
export { gohome1 as "goHome" }