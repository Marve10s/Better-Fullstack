/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, ecosystem: NonNullable<unknown> }} Buildernewfiltertitle3Inputs */



/**
* | output |
* | --- |
* | "Show {count} new options available in {ecosystem}" |
*
* @param {Buildernewfiltertitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfiltertitle3 = /** @type {((inputs: Buildernewfiltertitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfiltertitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Mostrar ${i?.count} opciones nuevas disponibles en ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`显示 ${i?.ecosystem} 中 ${i?.count} 个可用的新选项`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} で利用できる ${i?.count} 件の新オプションを表示`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem}에서 사용할 수 있는 새 옵션 ${i?.count}개 보기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`顯示 ${i?.ecosystem} 中 ${i?.count} 個可用的新選項`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} neue Optionen in ${i?.ecosystem} anzeigen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Afficher ${i?.count} nouvelles options disponibles dans ${i?.ecosystem}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Показати ${i?.count} нових опцій, доступних в ${i?.ecosystem}`)
	return /** @type {LocalizedString} */ (`Show ${i?.count} new options available in ${i?.ecosystem}`)
});
export { buildernewfiltertitle3 as "builderNewFilterTitle" }