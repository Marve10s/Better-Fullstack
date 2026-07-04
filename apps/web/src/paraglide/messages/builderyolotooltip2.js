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

const ja_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべての検証を無効にし、コマンドに --yolo フラグを追加します。ご自身の責任でご使用ください。`)
};

const ko_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 검증을 비활성화하고 --yolo 플래그를 명령에 추가합니다. Use at your own risk!`)
};

const zh_hant1_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉所有驗證並向命令添加 --yolo flag。請自行承擔風險。`)
};

const de_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deaktiviert alle Validierungen und fügt dem Befehl das Flag --yolo hinzu. Nutzung auf eigene Gefahr!`)
};

const fr_builderyolotooltip2 = /** @type {(inputs: Builderyolotooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Désactive toute validation et ajoute l'indicateur --yolo à la commande. Utilisez à vos propres risques !`)
};

/**
* | output |
* | --- |
* | "Disables all validation and adds --yolo flag to the command. Use at your own risk!" |
*
* @param {Builderyolotooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderyolotooltip2 = /** @type {((inputs?: Builderyolotooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolotooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderyolotooltip2(inputs)
	if (locale === "es") return es_builderyolotooltip2(inputs)
	if (locale === "zh") return zh_builderyolotooltip2(inputs)
	if (locale === "ja") return ja_builderyolotooltip2(inputs)
	if (locale === "ko") return ko_builderyolotooltip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderyolotooltip2(inputs)
	if (locale === "de") return de_builderyolotooltip2(inputs)
	return fr_builderyolotooltip2(inputs)
});
export { builderyolotooltip2 as "builderYoloTooltip" }