/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelikeddescription2Inputs */

const en_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builders who hearted the launch.`)
};

const es_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desarrolladores que marcaron el lanzamiento como favorito.`)
};

const zh_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为发布点赞的开发者。`)
};

/**
* | output |
* | --- |
* | "Builders who hearted the launch." |
*
* @param {Homelikeddescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelikeddescription2 = /** @type {((inputs?: Homelikeddescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelikeddescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelikeddescription2(inputs)
	if (locale === "es") return es_homelikeddescription2(inputs)
	return zh_homelikeddescription2(inputs)
});
export { homelikeddescription2 as "homeLikedDescription" }