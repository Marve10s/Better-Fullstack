/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersectionnavigation2Inputs */

const en_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Section navigation`)
};

const es_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegación de secciones`)
};

const zh_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分区导航`)
};

/**
* | output |
* | --- |
* | "Section navigation" |
*
* @param {Buildersectionnavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersectionnavigation2 = /** @type {((inputs?: Buildersectionnavigation2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersectionnavigation2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersectionnavigation2(inputs)
	if (locale === "es") return es_buildersectionnavigation2(inputs)
	return zh_buildersectionnavigation2(inputs)
});
export { buildersectionnavigation2 as "builderSectionNavigation" }