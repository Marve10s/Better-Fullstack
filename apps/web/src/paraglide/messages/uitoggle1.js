/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uitoggle1Inputs */

const en_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toggle`)
};

const es_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alternar`)
};

const zh_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换`)
};

const ja_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`トグル`)
};

const ko_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비녀장`)
};

const zh_hant1_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換`)
};

const de_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Umschalten`)
};

const fr_uitoggle1 = /** @type {(inputs: Uitoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basculer`)
};

/**
* | output |
* | --- |
* | "Toggle" |
*
* @param {Uitoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const uitoggle1 = /** @type {((inputs?: Uitoggle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uitoggle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uitoggle1(inputs)
	if (locale === "es") return es_uitoggle1(inputs)
	if (locale === "zh") return zh_uitoggle1(inputs)
	if (locale === "ja") return ja_uitoggle1(inputs)
	if (locale === "ko") return ko_uitoggle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_uitoggle1(inputs)
	if (locale === "de") return de_uitoggle1(inputs)
	return fr_uitoggle1(inputs)
});
export { uitoggle1 as "uiToggle" }