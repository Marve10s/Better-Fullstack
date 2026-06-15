/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderyolotooltip2Inputs */

const en_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disables all validation and adds --yolo flag to the command. Use at your own risk!`)
};

const es_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desactiva toda validación y añade el flag --yolo al comando. Úsalo bajo tu propio riesgo.`)
};

const zh_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭所有验证并向命令添加 --yolo flag。请自行承担风险。`)
};

/**
* | output |
* | --- |
* | "Disables all validation and adds --yolo flag to the command. Use at your own risk!" |
*
* @param {Builderyolotooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderyolotooltip2 = /** @type {((inputs?: Builderyolotooltip2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolotooltip2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderyolotooltip2(inputs)
	if (locale === "es") return es_builderyolotooltip2(inputs)
	return zh_builderyolotooltip2(inputs)
});
export { builderyolotooltip2 as "builderYoloTooltip" }