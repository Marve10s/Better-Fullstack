/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderprojectname2Inputs */

const en_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project name`)
};

const es_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nombre del proyecto`)
};

const zh_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目名称`)
};

/**
* | output |
* | --- |
* | "Project name" |
*
* @param {Builderprojectname2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderprojectname2 = /** @type {((inputs?: Builderprojectname2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderprojectname2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderprojectname2(inputs)
	if (locale === "es") return es_builderprojectname2(inputs)
	return zh_builderprojectname2(inputs)
});
export { builderprojectname2 as "builderProjectName" }