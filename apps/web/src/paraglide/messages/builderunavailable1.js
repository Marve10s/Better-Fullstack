/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderunavailable1Inputs */

const en_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable:`)
};

const es_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No disponible:`)
};

const zh_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用：`)
};

/**
* | output |
* | --- |
* | "Unavailable:" |
*
* @param {Builderunavailable1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderunavailable1 = /** @type {((inputs?: Builderunavailable1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderunavailable1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderunavailable1(inputs)
	if (locale === "es") return es_builderunavailable1(inputs)
	return zh_builderunavailable1(inputs)
});
export { builderunavailable1 as "builderUnavailable" }