/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerdatabaseorms3Inputs */

const en_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`DATABASE ORMs`)
};

const es_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORMs DE BASE DE DATOS`)
};

const zh_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库 ORM`)
};

/**
* | output |
* | --- |
* | "DATABASE ORMs" |
*
* @param {Homelayerdatabaseorms3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelayerdatabaseorms3 = /** @type {((inputs?: Homelayerdatabaseorms3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerdatabaseorms3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerdatabaseorms3(inputs)
	if (locale === "es") return es_homelayerdatabaseorms3(inputs)
	return zh_homelayerdatabaseorms3(inputs)
});
export { homelayerdatabaseorms3 as "homeLayerDatabaseOrms" }