/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdocs1Inputs */

const en_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_builderdocs1 = /** @type {(inputs: Builderdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Builderdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderdocs1 = /** @type {((inputs?: Builderdocs1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdocs1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdocs1(inputs)
	if (locale === "es") return es_builderdocs1(inputs)
	return zh_builderdocs1(inputs)
});
export { builderdocs1 as "builderDocs" }