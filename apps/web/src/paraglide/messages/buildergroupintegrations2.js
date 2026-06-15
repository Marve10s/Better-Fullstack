/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupintegrations2Inputs */

const en_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrations`)
};

const es_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones`)
};

const zh_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`集成`)
};

/**
* | output |
* | --- |
* | "Integrations" |
*
* @param {Buildergroupintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupintegrations2 = /** @type {((inputs?: Buildergroupintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupintegrations2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupintegrations2(inputs)
	if (locale === "es") return es_buildergroupintegrations2(inputs)
	return zh_buildergroupintegrations2(inputs)
});
export { buildergroupintegrations2 as "builderGroupIntegrations" }