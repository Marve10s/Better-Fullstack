/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedemptytitle2Inputs */



/**
* | output |
* | --- |
* | "No saved presets yet" |
*
* @param {Savedemptytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedemptytitle2 = /** @type {((inputs?: Savedemptytitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedemptytitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aún no hay plantillas guardadas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("还没有保存的预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("まだプリセットが保存されていません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("아직 저장된 사전 설정이 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("還沒儲存的預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Noch keine gespeicherten Voreinstellungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucun préréglage enregistré pour le moment")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збережених пресетів ще немає")
	return /** @type {LocalizedString} */ ("No saved presets yet")
});
export { savedemptytitle2 as "savedEmptyTitle" }