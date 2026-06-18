/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabpresets2Inputs */

const en_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

const ja_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセット`)
};

const ko_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정`)
};

const zh_hant1_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設`)
};

const de_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellungen`)
};

const fr_buildertabpresets2 = /** @type {(inputs: Buildertabpresets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglages`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Buildertabpresets2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildertabpresets2 = /** @type {((inputs?: Buildertabpresets2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabpresets2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabpresets2(inputs)
	if (locale === "es") return es_buildertabpresets2(inputs)
	if (locale === "zh") return zh_buildertabpresets2(inputs)
	if (locale === "ja") return ja_buildertabpresets2(inputs)
	if (locale === "ko") return ko_buildertabpresets2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertabpresets2(inputs)
	if (locale === "de") return de_buildertabpresets2(inputs)
	return fr_buildertabpresets2(inputs)
});
export { buildertabpresets2 as "builderTabPresets" }