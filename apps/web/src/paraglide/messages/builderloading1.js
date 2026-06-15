/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloading1Inputs */

const en_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading...`)
};

const es_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando...`)
};

const zh_builderloading1 = /** @type {(inputs: Builderloading1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载中...`)
};

/**
* | output |
* | --- |
* | "Loading..." |
*
* @param {Builderloading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderloading1 = /** @type {((inputs?: Builderloading1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloading1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderloading1(inputs)
	if (locale === "es") return es_builderloading1(inputs)
	return zh_builderloading1(inputs)
});
export { builderloading1 as "builderLoading" }