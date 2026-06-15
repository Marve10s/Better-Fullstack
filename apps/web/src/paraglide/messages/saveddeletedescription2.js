/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Saveddeletedescription2Inputs */

const en_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Are you sure you want to delete "${i?.name}"? This action cannot be undone.`)
};

const es_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`¿Seguro que quieres eliminar "${i?.name}"? Esta acción no se puede deshacer.`)
};

const zh_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`确定要删除 "${i?.name}" 吗？此操作无法撤销。`)
};

/**
* | output |
* | --- |
* | "Are you sure you want to delete \"{name}\"? This action cannot be undone." |
*
* @param {Saveddeletedescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const saveddeletedescription2 = /** @type {((inputs: Saveddeletedescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddeletedescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddeletedescription2(inputs)
	if (locale === "es") return es_saveddeletedescription2(inputs)
	return zh_saveddeletedescription2(inputs)
});
export { saveddeletedescription2 as "savedDeleteDescription" }