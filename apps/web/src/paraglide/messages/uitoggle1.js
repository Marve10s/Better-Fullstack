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

/**
* | output |
* | --- |
* | "Toggle" |
*
* @param {Uitoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const uitoggle1 = /** @type {((inputs?: Uitoggle1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uitoggle1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_uitoggle1(inputs)
	if (locale === "es") return es_uitoggle1(inputs)
	return zh_uitoggle1(inputs)
});
export { uitoggle1 as "uiToggle" }