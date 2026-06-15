/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderclosesectionnavigation3Inputs */

const en_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close section navigation`)
};

const es_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar navegación de secciones`)
};

const zh_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭分区导航`)
};

/**
* | output |
* | --- |
* | "Close section navigation" |
*
* @param {Builderclosesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderclosesectionnavigation3 = /** @type {((inputs?: Builderclosesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderclosesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderclosesectionnavigation3(inputs)
	if (locale === "es") return es_builderclosesectionnavigation3(inputs)
	return zh_builderclosesectionnavigation3(inputs)
});
export { builderclosesectionnavigation3 as "builderCloseSectionNavigation" }