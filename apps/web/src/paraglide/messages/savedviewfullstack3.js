/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedviewfullstack3Inputs */

const en_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View Full Stack`)
};

const es_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver stack completo`)
};

const zh_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看完整 Stack`)
};

const ja_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フルスタックを表示`)
};

const ko_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`전체 스택 보기`)
};

const zh_hant1_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看完整 Stack`)
};

const de_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vollständigen Stack anzeigen`)
};

const fr_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voir la pile complète`)
};

const uk_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути фулстек`)
};

/**
* | output |
* | --- |
* | "View Full Stack" |
*
* @param {Savedviewfullstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedviewfullstack3 = /** @type {((inputs?: Savedviewfullstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedviewfullstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_savedviewfullstack3(inputs)
	if (locale === "zh") return zh_savedviewfullstack3(inputs)
	if (locale === "ja") return ja_savedviewfullstack3(inputs)
	if (locale === "ko") return ko_savedviewfullstack3(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedviewfullstack3(inputs)
	if (locale === "de") return de_savedviewfullstack3(inputs)
	if (locale === "fr") return fr_savedviewfullstack3(inputs)
	if (locale === "uk") return uk_savedviewfullstack3(inputs)
	return en_savedviewfullstack3(inputs)
});
export { savedviewfullstack3 as "savedViewFullStack" }