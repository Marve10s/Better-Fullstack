/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderupdatepresetdescriptionnamed4Inputs */

const en_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updating "${i?.name}" will override the saved preset with your current stack configuration.`)
};

const es_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Actualizar "${i?.name}" reemplazará la plantilla guardada con la configuración actual.`)
};

const zh_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新 "${i?.name}" 会用当前 stack 配置覆盖已保存的预设。`)
};

/**
* | output |
* | --- |
* | "Updating \"{name}\" will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescriptionnamed4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescriptionnamed4 = /** @type {((inputs: Builderupdatepresetdescriptionnamed4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescriptionnamed4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "es") return es_builderupdatepresetdescriptionnamed4(inputs)
	return zh_builderupdatepresetdescriptionnamed4(inputs)
});
export { builderupdatepresetdescriptionnamed4 as "builderUpdatePresetDescriptionNamed" }