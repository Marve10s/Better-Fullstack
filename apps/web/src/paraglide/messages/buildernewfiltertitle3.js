/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, ecosystem: NonNullable<unknown> }} Buildernewfiltertitle3Inputs */

const en_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Show ${i?.count} new options available in ${i?.ecosystem}`)
};

const es_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Mostrar ${i?.count} opciones nuevas disponibles en ${i?.ecosystem}`)
};

const zh_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`显示 ${i?.ecosystem} 中 ${i?.count} 个可用的新选项`)
};

const ja_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} で利用できる ${i?.count} 件の新オプションを表示`)
};

const ko_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem}에서 사용할 수 있는 새 옵션 ${i?.count}개 보기`)
};

const zh_hant1_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`顯示 ${i?.ecosystem} 中 ${i?.count} 個可用的新選項`)
};

const de_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} neue Optionen in ${i?.ecosystem} anzeigen`)
};

const fr_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Afficher ${i?.count} nouvelles options disponibles dans ${i?.ecosystem}`)
};

const uk_buildernewfiltertitle3 = /** @type {(inputs: Buildernewfiltertitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Показати ${i?.count} нових опцій, доступних в ${i?.ecosystem}`)
};

/**
* | output |
* | --- |
* | "Show {count} new options available in {ecosystem}" |
*
* @param {Buildernewfiltertitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfiltertitle3 = /** @type {((inputs: Buildernewfiltertitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfiltertitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernewfiltertitle3(inputs)
	if (locale === "es") return es_buildernewfiltertitle3(inputs)
	if (locale === "zh") return zh_buildernewfiltertitle3(inputs)
	if (locale === "ja") return ja_buildernewfiltertitle3(inputs)
	if (locale === "ko") return ko_buildernewfiltertitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewfiltertitle3(inputs)
	if (locale === "de") return de_buildernewfiltertitle3(inputs)
	if (locale === "fr") return fr_buildernewfiltertitle3(inputs)
	return uk_buildernewfiltertitle3(inputs)
});
export { buildernewfiltertitle3 as "builderNewFilterTitle" }