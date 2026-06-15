/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildershadcnconfiguration2Inputs */

const en_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui Configuration`)
};

const es_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración de shadcn/ui`)
};

const zh_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui 配置`)
};

/**
* | output |
* | --- |
* | "shadcn/ui Configuration" |
*
* @param {Buildershadcnconfiguration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildershadcnconfiguration2 = /** @type {((inputs?: Buildershadcnconfiguration2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershadcnconfiguration2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildershadcnconfiguration2(inputs)
	if (locale === "es") return es_buildershadcnconfiguration2(inputs)
	return zh_buildershadcnconfiguration2(inputs)
});
export { buildershadcnconfiguration2 as "builderShadcnConfiguration" }