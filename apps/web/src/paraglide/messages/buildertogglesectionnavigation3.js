/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertogglesectionnavigation3Inputs */

const en_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toggle section navigation`)
};

const es_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alternar navegación de secciones`)
};

const zh_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换分区导航`)
};

/**
* | output |
* | --- |
* | "Toggle section navigation" |
*
* @param {Buildertogglesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildertogglesectionnavigation3 = /** @type {((inputs?: Buildertogglesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertogglesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertogglesectionnavigation3(inputs)
	if (locale === "es") return es_buildertogglesectionnavigation3(inputs)
	return zh_buildertogglesectionnavigation3(inputs)
});
export { buildertogglesectionnavigation3 as "builderToggleSectionNavigation" }