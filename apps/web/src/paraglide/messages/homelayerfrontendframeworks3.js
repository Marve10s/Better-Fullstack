/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerfrontendframeworks3Inputs */

const en_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRONTEND FRAMEWORKS`)
};

const es_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRAMEWORKS FRONTEND`)
};

const zh_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端框架`)
};

const ja_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フロントエンドフレームワーク`)
};

const ko_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프런트엔드 프레임워크`)
};

const zh_hant1_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前端框架`)
};

const de_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRONTEND-RAHMEN`)
};

const fr_homelayerfrontendframeworks3 = /** @type {(inputs: Homelayerfrontendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CADRES FRONTEND`)
};

/**
* | output |
* | --- |
* | "FRONTEND FRAMEWORKS" |
*
* @param {Homelayerfrontendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelayerfrontendframeworks3 = /** @type {((inputs?: Homelayerfrontendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerfrontendframeworks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerfrontendframeworks3(inputs)
	if (locale === "es") return es_homelayerfrontendframeworks3(inputs)
	if (locale === "zh") return zh_homelayerfrontendframeworks3(inputs)
	if (locale === "ja") return ja_homelayerfrontendframeworks3(inputs)
	if (locale === "ko") return ko_homelayerfrontendframeworks3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayerfrontendframeworks3(inputs)
	if (locale === "de") return de_homelayerfrontendframeworks3(inputs)
	return fr_homelayerfrontendframeworks3(inputs)
});
export { homelayerfrontendframeworks3 as "homeLayerFrontendFrameworks" }