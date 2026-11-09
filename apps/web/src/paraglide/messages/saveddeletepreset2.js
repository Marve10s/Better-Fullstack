/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddeletepreset2Inputs */



/**
* | output |
* | --- |
* | "Delete Preset" |
*
* @param {Saveddeletepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const saveddeletepreset2 = /** @type {((inputs?: Saveddeletepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddeletepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Eliminar plantilla")
	if (locale === "zh") return /** @type {LocalizedString} */ ("删除预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットの削除")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프리셋 삭제")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("刪除預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung löschen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Supprimer le préréglage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Видалити пресет")
	return /** @type {LocalizedString} */ ("Delete Preset")
});
export { saveddeletepreset2 as "savedDeletePreset" }