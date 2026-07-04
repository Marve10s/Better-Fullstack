/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetstartertracks2Inputs */

const en_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starter tracks`)
};

const es_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rutas iniciales`)
};

const zh_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入门路线`)
};

const ja_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタータートラック`)
};

const ko_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스타터 트랙`)
};

const zh_hant1_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入門路線`)
};

const de_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starter-Tracks`)
};

const fr_presetstartertracks2 = /** @type {(inputs: Presetstartertracks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pistes de démarrage`)
};

/**
* | output |
* | --- |
* | "Starter tracks" |
*
* @param {Presetstartertracks2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetstartertracks2 = /** @type {((inputs?: Presetstartertracks2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetstartertracks2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetstartertracks2(inputs)
	if (locale === "es") return es_presetstartertracks2(inputs)
	if (locale === "zh") return zh_presetstartertracks2(inputs)
	if (locale === "ja") return ja_presetstartertracks2(inputs)
	if (locale === "ko") return ko_presetstartertracks2(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetstartertracks2(inputs)
	if (locale === "de") return de_presetstartertracks2(inputs)
	return fr_presetstartertracks2(inputs)
});
export { presetstartertracks2 as "presetStarterTracks" }