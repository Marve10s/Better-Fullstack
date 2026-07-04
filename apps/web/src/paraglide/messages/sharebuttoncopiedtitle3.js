/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharebuttoncopiedtitle3Inputs */

const en_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied!`)
};

const es_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¡Copiado!`)
};

const zh_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制！`)
};

const ja_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーしました！`)
};

const ko_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사되었습니다!`)
};

const zh_hant1_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已複製！`)
};

const de_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopiert!`)
};

const fr_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copié!`)
};

const uk_sharebuttoncopiedtitle3 = /** @type {(inputs: Sharebuttoncopiedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скопійовано!`)
};

/**
* | output |
* | --- |
* | "Copied!" |
*
* @param {Sharebuttoncopiedtitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sharebuttoncopiedtitle3 = /** @type {((inputs?: Sharebuttoncopiedtitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharebuttoncopiedtitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharebuttoncopiedtitle3(inputs)
	if (locale === "es") return es_sharebuttoncopiedtitle3(inputs)
	if (locale === "zh") return zh_sharebuttoncopiedtitle3(inputs)
	if (locale === "ja") return ja_sharebuttoncopiedtitle3(inputs)
	if (locale === "ko") return ko_sharebuttoncopiedtitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharebuttoncopiedtitle3(inputs)
	if (locale === "de") return de_sharebuttoncopiedtitle3(inputs)
	if (locale === "fr") return fr_sharebuttoncopiedtitle3(inputs)
	return uk_sharebuttoncopiedtitle3(inputs)
});
export { sharebuttoncopiedtitle3 as "shareButtonCopiedTitle" }