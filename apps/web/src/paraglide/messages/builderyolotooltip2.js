/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderyolotooltip2Inputs */



/**
* | output |
* | --- |
* | "Disables all validation and adds --yolo flag to the command. Use at your own risk!" |
*
* @param {Builderyolotooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderyolotooltip2 = /** @type {((inputs?: Builderyolotooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderyolotooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Desactiva toda validación y añade el flag --yolo al comando. Úsalo bajo tu propio riesgo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭所有验证并向命令添加 --yolo flag。请自行承担风险。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべての検証を無効にし、コマンドに --yolo フラグを追加します。ご自身の責任でご使用ください。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 검증을 비활성화하고 --yolo 플래그를 명령에 추가합니다. 사용에 따른 책임은 본인에게 있습니다!")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("關閉所有驗證並向命令添加 --yolo flag。請自行承擔風險。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Deaktiviert alle Validierungen und fügt dem Befehl das Flag --yolo hinzu. Nutzung auf eigene Gefahr!")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Désactive toute validation et ajoute l'indicateur --yolo à la commande. Utilisez à vos propres risques !")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вимикає всі перевірки й додає до команди прапорець --yolo. Використовуйте обережно.")
	return /** @type {LocalizedString} */ ("Disables all validation and adds --yolo flag to the command. Use at your own risk!")
});
export { builderyolotooltip2 as "builderYoloTooltip" }