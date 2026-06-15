/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepresetdescription3Inputs */

const en_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating this preset will override the saved preset with your current stack configuration.`)
};

const es_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar esta plantilla reemplazará la plantilla guardada con la configuración actual.`)
};

const zh_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新此预设会用当前 stack 配置覆盖已保存的预设。`)
};

/**
* | output |
* | --- |
* | "Updating this preset will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescription3 = /** @type {((inputs?: Builderupdatepresetdescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepresetdescription3(inputs)
	if (locale === "es") return es_builderupdatepresetdescription3(inputs)
	return zh_builderupdatepresetdescription3(inputs)
});
export { builderupdatepresetdescription3 as "builderUpdatePresetDescription" }