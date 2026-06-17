/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestopwiring2Inputs */

const en_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop wiring.`)
};

const es_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deja de conectar cables.`)
};

const zh_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`别再手动串联。`)
};

const ja_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`配線をやめてください。`)
};

const ko_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`배선을 중지하십시오.`)
};

const zh_hant1_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`別再手動串聯。`)
};

const de_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schluss mit der Verkabelung.`)
};

const fr_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arrêtez le câblage.`)
};

/**
* | output |
* | --- |
* | "Stop wiring." |
*
* @param {Homestopwiring2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homestopwiring2 = /** @type {((inputs?: Homestopwiring2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestopwiring2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homestopwiring2(inputs)
	if (locale === "es") return es_homestopwiring2(inputs)
	if (locale === "zh") return zh_homestopwiring2(inputs)
	if (locale === "ja") return ja_homestopwiring2(inputs)
	if (locale === "ko") return ko_homestopwiring2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestopwiring2(inputs)
	if (locale === "de") return de_homestopwiring2(inputs)
	return fr_homestopwiring2(inputs)
});
export { homestopwiring2 as "homeStopWiring" }