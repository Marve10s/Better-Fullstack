/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupother2Inputs */

const en_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Other`)
};

const es_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Otros`)
};

const zh_buildergroupother2 = /** @type {(inputs: Buildergroupother2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他`)
};

/**
* | output |
* | --- |
* | "Other" |
*
* @param {Buildergroupother2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupother2 = /** @type {((inputs?: Buildergroupother2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupother2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupother2(inputs)
	if (locale === "es") return es_buildergroupother2(inputs)
	return zh_buildergroupother2(inputs)
});
export { buildergroupother2 as "builderGroupOther" }