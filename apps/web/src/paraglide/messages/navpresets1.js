/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navpresets1Inputs */

const en_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

const ja_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセット`)
};

const ko_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정`)
};

const zh_hant1_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設`)
};

const de_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellungen`)
};

const fr_navpresets1 = /** @type {(inputs: Navpresets1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglages`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Navpresets1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navpresets1 = /** @type {((inputs?: Navpresets1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navpresets1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navpresets1(inputs)
	if (locale === "es") return es_navpresets1(inputs)
	if (locale === "zh") return zh_navpresets1(inputs)
	if (locale === "ja") return ja_navpresets1(inputs)
	if (locale === "ko") return ko_navpresets1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navpresets1(inputs)
	if (locale === "de") return de_navpresets1(inputs)
	return fr_navpresets1(inputs)
});
export { navpresets1 as "navPresets" }