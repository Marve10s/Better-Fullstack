/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaipauseclip3Inputs */

const en_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pause the clip`)
};

const es_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pausar el clip`)
};

const zh_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂停片段`)
};

const ja_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クリップを一時停止`)
};

const ko_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`클립 일시정지`)
};

const zh_hant1_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暫停片段`)
};

const de_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clip pausieren`)
};

const fr_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mettre le clip en pause`)
};

const uk_homeaipauseclip3 = /** @type {(inputs: Homeaipauseclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Призупинити кліп`)
};

/**
* | output |
* | --- |
* | "Pause the clip" |
*
* @param {Homeaipauseclip3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaipauseclip3 = /** @type {((inputs?: Homeaipauseclip3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaipauseclip3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaipauseclip3(inputs)
	if (locale === "zh") return zh_homeaipauseclip3(inputs)
	if (locale === "ja") return ja_homeaipauseclip3(inputs)
	if (locale === "ko") return ko_homeaipauseclip3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaipauseclip3(inputs)
	if (locale === "de") return de_homeaipauseclip3(inputs)
	if (locale === "fr") return fr_homeaipauseclip3(inputs)
	if (locale === "uk") return uk_homeaipauseclip3(inputs)
	return en_homeaipauseclip3(inputs)
});
export { homeaipauseclip3 as "homeAiPauseClip" }