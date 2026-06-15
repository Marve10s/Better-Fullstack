/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewwarnings2Inputs */

const en_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} features will not generate templates`)
};

const es_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} funciones no generarán plantillas`)
};

const zh_builderpreviewwarnings2 = /** @type {(inputs: Builderpreviewwarnings2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 项功能不会生成模板`)
};

/**
* | output |
* | --- |
* | "{count} features will not generate templates" |
*
* @param {Builderpreviewwarnings2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewwarnings2 = /** @type {((inputs: Builderpreviewwarnings2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewwarnings2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewwarnings2(inputs)
	if (locale === "es") return es_builderpreviewwarnings2(inputs)
	return zh_builderpreviewwarnings2(inputs)
});
export { builderpreviewwarnings2 as "builderPreviewWarnings" }