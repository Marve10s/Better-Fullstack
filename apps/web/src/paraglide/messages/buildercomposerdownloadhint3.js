/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdownloadhint3Inputs */

const en_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save the project as an archive`)
};

const es_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guarda el proyecto como archivo comprimido`)
};

const zh_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将项目保存为压缩包`)
};

const ja_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクトをアーカイブとして保存`)
};

const ko_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트를 아카이브로 저장`)
};

const zh_hant1_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`將專案儲存為壓縮檔`)
};

const de_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekt als Archiv speichern`)
};

const fr_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrer le projet en archive`)
};

const uk_buildercomposerdownloadhint3 = /** @type {(inputs: Buildercomposerdownloadhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зберегти проєкт як архів`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdownloadhint3(inputs)
	if (locale === "zh") return zh_buildercomposerdownloadhint3(inputs)
	if (locale === "ja") return ja_buildercomposerdownloadhint3(inputs)
	if (locale === "ko") return ko_buildercomposerdownloadhint3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdownloadhint3(inputs)
	if (locale === "de") return de_buildercomposerdownloadhint3(inputs)
	if (locale === "fr") return fr_buildercomposerdownloadhint3(inputs)
	if (locale === "uk") return uk_buildercomposerdownloadhint3(inputs)
	return en_buildercomposerdownloadhint3(inputs)
});
export { buildercomposerdownloadhint3 as "builderComposerDownloadHint" }