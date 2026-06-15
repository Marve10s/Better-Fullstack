/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasname3Inputs */

const en_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS App`)
};

const es_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App SaaS`)
};

const zh_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS 应用`)
};

/**
* | output |
* | --- |
* | "SaaS App" |
*
* @param {Presettracksaasname3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettracksaasname3 = /** @type {((inputs?: Presettracksaasname3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasname3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasname3(inputs)
	if (locale === "es") return es_presettracksaasname3(inputs)
	return zh_presettracksaasname3(inputs)
});
export { presettracksaasname3 as "presetTrackSaasName" }