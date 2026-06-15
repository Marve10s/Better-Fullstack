/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstandalonedatabase2Inputs */

const en_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standalone Database`)
};

const es_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de datos independiente`)
};

const zh_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`独立数据库`)
};

/**
* | output |
* | --- |
* | "Standalone Database" |
*
* @param {Builderstandalonedatabase2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderstandalonedatabase2 = /** @type {((inputs?: Builderstandalonedatabase2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstandalonedatabase2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstandalonedatabase2(inputs)
	if (locale === "es") return es_builderstandalonedatabase2(inputs)
	return zh_builderstandalonedatabase2(inputs)
});
export { builderstandalonedatabase2 as "builderStandaloneDatabase" }