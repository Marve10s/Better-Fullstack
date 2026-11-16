/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonpart4Inputs */



/**
* | output |
* | --- |
* | "Add a multi-ecosystem stack part. Repeat once per part." |
*
* @param {Docsclisummarycommonpart4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonpart4 = /** @type {((inputs?: Docsclisummarycommonpart4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonpart4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Añadir una parte a un stack con varios ecosistemas. Repetir una vez por cada parte.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("添加一个多生态 Stack Part。每个 part 重复指定一次。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("マルチエコシステムのスタックパーツを追加します。パーツごとに1回ずつ指定します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다중 생태계 스택 파트를 추가합니다. 파트마다 한 번씩 반복해 지정하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("新增一個跨生態系的 Stack Part。每個 part 重複指定一次。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einen Bestandteil zu einem Stack mit mehreren Ökosystemen hinzufügen. Für jeden Bestandteil einmal wiederholen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ajouter une partie à un stack multi-écosystème. Répéter une fois par partie.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Додати частину до стеку з кількома екосистемами. Повторити один раз для кожної частини.")
	return /** @type {LocalizedString} */ ("Add a multi-ecosystem stack part. Repeat once per part.")
});
export { docsclisummarycommonpart4 as "docsCliSummaryCommonPart" }