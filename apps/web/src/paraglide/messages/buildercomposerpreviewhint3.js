/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerpreviewhint3Inputs */



/**
* | output |
* | --- |
* | "Browse the generated files" |
*
* @param {Buildercomposerpreviewhint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerpreviewhint3 = /** @type {((inputs?: Buildercomposerpreviewhint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerpreviewhint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Explora los archivos generados")
	if (locale === "zh") return /** @type {LocalizedString} */ ("浏览生成的文件")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成されたファイルを閲覧")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 파일 둘러보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("瀏覽產生的檔案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generierte Dateien durchsuchen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Parcourir les fichiers générés")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути згенеровані файли")
	return /** @type {LocalizedString} */ ("Browse the generated files")
});
export { buildercomposerpreviewhint3 as "builderComposerPreviewHint" }