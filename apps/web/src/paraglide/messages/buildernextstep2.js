/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernextstep2Inputs */

const en_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next step`)
};

const es_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente paso`)
};

const zh_buildernextstep2 = /** @type {(inputs: Buildernextstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

/**
* | output |
* | --- |
* | "Next step" |
*
* @param {Buildernextstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildernextstep2 = /** @type {((inputs?: Buildernextstep2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernextstep2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernextstep2(inputs)
	if (locale === "es") return es_buildernextstep2(inputs)
	return zh_buildernextstep2(inputs)
});
export { buildernextstep2 as "builderNextStep" }