/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipsetecosystemfirst4Inputs */



/**
* | output |
* | --- |
* | "Set ecosystem first: it decides which fields matter" |
*
* @param {Mcptipsetecosystemfirst4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptipsetecosystemfirst4 = /** @type {((inputs?: Mcptipsetecosystemfirst4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipsetecosystemfirst4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Define primero el ecosistema: decide qué campos importan")
	if (locale === "zh") return /** @type {LocalizedString} */ ("先设置生态：它会决定哪些字段有效")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最初にエコシステムを設定します。どの分野が重要かを決定します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생태계를 먼저 설정하세요. 어떤 필드가 중요한지 결정합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("先設定生態：它會決定哪些欄位有效")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stellen Sie das Ökosystem an die erste Stelle: Es entscheidet, welche Bereiche wichtig sind")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Définir l'écosystème en premier : il décide quels domaines sont importants")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спочатку задайте ecosystem: від нього залежать релевантні поля")
	return /** @type {LocalizedString} */ ("Set ecosystem first: it decides which fields matter")
});
export { mcptipsetecosystemfirst4 as "mcpTipSetEcosystemFirst" }