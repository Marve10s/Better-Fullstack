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

/**
* | output |
* | --- |
* | "Starter tracks" |
*
* @param {Presetstartertracks2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetstartertracks2 = /** @type {((inputs?: Presetstartertracks2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetstartertracks2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetstartertracks2(inputs)
	if (locale === "es") return es_presetstartertracks2(inputs)
	return zh_presetstartertracks2(inputs)
});
export { presetstartertracks2 as "presetStarterTracks" }