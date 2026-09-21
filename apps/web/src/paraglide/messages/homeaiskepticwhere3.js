/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiskepticwhere3Inputs */

const en_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`on stream`)
};

const es_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`en directo`)
};

const zh_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`直播中`)
};

const ja_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`配信にて`)
};

const ko_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`방송에서`)
};

const zh_hant1_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`直播中`)
};

const de_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`im Stream`)
};

const fr_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`en stream`)
};

const uk_homeaiskepticwhere3 = /** @type {(inputs: Homeaiskepticwhere3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`на стримі`)
};

/**
* | output |
* | --- |
* | "on stream" |
*
* @param {Homeaiskepticwhere3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaiskepticwhere3 = /** @type {((inputs?: Homeaiskepticwhere3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaiskepticwhere3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaiskepticwhere3(inputs)
	if (locale === "zh") return zh_homeaiskepticwhere3(inputs)
	if (locale === "ja") return ja_homeaiskepticwhere3(inputs)
	if (locale === "ko") return ko_homeaiskepticwhere3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaiskepticwhere3(inputs)
	if (locale === "de") return de_homeaiskepticwhere3(inputs)
	if (locale === "fr") return fr_homeaiskepticwhere3(inputs)
	if (locale === "uk") return uk_homeaiskepticwhere3(inputs)
	return en_homeaiskepticwhere3(inputs)
});
export { homeaiskepticwhere3 as "homeAiSkepticWhere" }