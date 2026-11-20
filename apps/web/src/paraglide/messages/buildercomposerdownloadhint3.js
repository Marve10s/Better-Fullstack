/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdownloadhint3Inputs */



/**
* | output |
* | --- |
* | "Save the project as an archive" |
*
* @param {Buildercomposerdownloadhint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdownloadhint3 = /** @type {((inputs?: Buildercomposerdownloadhint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdownloadhint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guarda el proyecto como archivo comprimido")
	if (locale === "zh") return /** @type {LocalizedString} */ ("将项目保存为压缩包")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトをアーカイブとして保存")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트를 아카이브로 저장")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("將專案儲存為壓縮檔")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projekt als Archiv speichern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistrer le projet en archive")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зберегти проєкт як архів")
	return /** @type {LocalizedString} */ ("Save the project as an archive")
});
export { buildercomposerdownloadhint3 as "builderComposerDownloadHint" }