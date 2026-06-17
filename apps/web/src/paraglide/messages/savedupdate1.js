/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdate1Inputs */

const en_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update`)
};

const es_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar`)
};

const zh_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新`)
};

const ja_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アップデート`)
};

const ko_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`업데이트`)
};

const zh_hant1_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新`)
};

const de_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aktualisieren`)
};

const fr_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise à jour`)
};

/**
* | output |
* | --- |
* | "Update" |
*
* @param {Savedupdate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedupdate1 = /** @type {((inputs?: Savedupdate1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdate1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedupdate1(inputs)
	if (locale === "es") return es_savedupdate1(inputs)
	if (locale === "zh") return zh_savedupdate1(inputs)
	if (locale === "ja") return ja_savedupdate1(inputs)
	if (locale === "ko") return ko_savedupdate1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedupdate1(inputs)
	if (locale === "de") return de_savedupdate1(inputs)
	return fr_savedupdate1(inputs)
});
export { savedupdate1 as "savedUpdate" }