/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolintent4Inputs */

const en_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Move fast with CRUD`)
};

const es_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avanzar rápido con CRUD`)
};

const zh_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速构建 CRUD`)
};

/**
* | output |
* | --- |
* | "Move fast with CRUD" |
*
* @param {Presettrackinternaltoolintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolintent4 = /** @type {((inputs?: Presettrackinternaltoolintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltoolintent4(inputs)
	if (locale === "es") return es_presettrackinternaltoolintent4(inputs)
	return zh_presettrackinternaltoolintent4(inputs)
});
export { presettrackinternaltoolintent4 as "presetTrackInternalToolIntent" }