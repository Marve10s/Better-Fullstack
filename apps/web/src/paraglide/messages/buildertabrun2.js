/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabrun2Inputs */



/**
* | output |
* | --- |
* | "Edit & Run" |
*
* @param {Buildertabrun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertabrun2 = /** @type {((inputs?: Buildertabrun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabrun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Editar y ejecutar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("编辑并运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("編集して実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("편집 및 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("編輯並執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bearbeiten & ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Modifier et exécuter")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Редагувати й запустити")
	return /** @type {LocalizedString} */ ("Edit & Run")
});
export { buildertabrun2 as "builderTabRun" }