/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetmenu1Inputs */

const en_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Presets`)
};

const es_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设`)
};

const ja_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセット`)
};

const ko_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정`)
};

const zh_hant1_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設`)
};

const de_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellungen`)
};

const fr_presetmenu1 = /** @type {(inputs: Presetmenu1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglages`)
};

/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Presetmenu1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetmenu1 = /** @type {((inputs?: Presetmenu1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetmenu1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetmenu1(inputs)
	if (locale === "es") return es_presetmenu1(inputs)
	if (locale === "zh") return zh_presetmenu1(inputs)
	if (locale === "ja") return ja_presetmenu1(inputs)
	if (locale === "ko") return ko_presetmenu1(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetmenu1(inputs)
	if (locale === "de") return de_presetmenu1(inputs)
	return fr_presetmenu1(inputs)
});
export { presetmenu1 as "presetMenu" }