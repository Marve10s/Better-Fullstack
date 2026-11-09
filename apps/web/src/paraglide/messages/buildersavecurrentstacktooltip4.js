/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentstacktooltip4Inputs */



/**
* | output |
* | --- |
* | "Save the current stack as a named preset" |
*
* @param {Buildersavecurrentstacktooltip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentstacktooltip4 = /** @type {((inputs?: Buildersavecurrentstacktooltip4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentstacktooltip4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guarda el stack actual como una plantilla con nombre")
	if (locale === "zh") return /** @type {LocalizedString} */ ("将当前 stack 保存为具名预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のスタックを名前付きプリセットとして保存します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 스택을 명명된 사전 설정으로 저장")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("將目前 stack 儲存為具名預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Speichern Sie den aktuellen Stack als benannte Voreinstellung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistrez la pile actuelle en tant que préréglage nommé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збережіть поточний стек як іменований пресет")
	return /** @type {LocalizedString} */ ("Save the current stack as a named preset")
});
export { buildersavecurrentstacktooltip4 as "builderSaveCurrentStackTooltip" }