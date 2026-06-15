/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareormsupport2Inputs */

const en_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM support (Drizzle, Prisma, etc.)`)
};

const es_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Soporte ORM (Drizzle, Prisma, etc.)`)
};

const zh_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 支持（Drizzle、Prisma 等）`)
};

/**
* | output |
* | --- |
* | "ORM support (Drizzle, Prisma, etc.)" |
*
* @param {Compareormsupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareormsupport2 = /** @type {((inputs?: Compareormsupport2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareormsupport2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareormsupport2(inputs)
	if (locale === "es") return es_compareormsupport2(inputs)
	return zh_compareormsupport2(inputs)
});
export { compareormsupport2 as "compareOrmSupport" }