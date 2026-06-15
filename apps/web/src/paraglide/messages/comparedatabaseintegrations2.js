/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedatabaseintegrations2Inputs */

const en_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Database integrations`)
};

const es_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones de base de datos`)
};

const zh_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库集成`)
};

/**
* | output |
* | --- |
* | "Database integrations" |
*
* @param {Comparedatabaseintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparedatabaseintegrations2 = /** @type {((inputs?: Comparedatabaseintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabaseintegrations2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedatabaseintegrations2(inputs)
	if (locale === "es") return es_comparedatabaseintegrations2(inputs)
	return zh_comparedatabaseintegrations2(inputs)
});
export { comparedatabaseintegrations2 as "compareDatabaseIntegrations" }