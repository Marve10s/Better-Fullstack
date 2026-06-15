/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolname4Inputs */

const en_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internal Tool`)
};

const es_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramienta interna`)
};

const zh_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内部工具`)
};

/**
* | output |
* | --- |
* | "Internal Tool" |
*
* @param {Presettrackinternaltoolname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolname4 = /** @type {((inputs?: Presettrackinternaltoolname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltoolname4(inputs)
	if (locale === "es") return es_presettrackinternaltoolname4(inputs)
	return zh_presettrackinternaltoolname4(inputs)
});
export { presettrackinternaltoolname4 as "presetTrackInternalToolName" }