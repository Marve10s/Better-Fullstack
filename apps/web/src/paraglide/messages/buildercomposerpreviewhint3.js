/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerpreviewhint3Inputs */

const en_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse the generated files`)
};

const es_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explora los archivos generados`)
};

const zh_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`浏览生成的文件`)
};

const ja_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたファイルを閲覧`)
};

const ko_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 파일 둘러보기`)
};

const zh_hant1_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`瀏覽產生的檔案`)
};

const de_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generierte Dateien durchsuchen`)
};

const fr_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Parcourir les fichiers générés`)
};

const uk_buildercomposerpreviewhint3 = /** @type {(inputs: Buildercomposerpreviewhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути згенеровані файли`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerpreviewhint3(inputs)
	if (locale === "zh") return zh_buildercomposerpreviewhint3(inputs)
	if (locale === "ja") return ja_buildercomposerpreviewhint3(inputs)
	if (locale === "ko") return ko_buildercomposerpreviewhint3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerpreviewhint3(inputs)
	if (locale === "de") return de_buildercomposerpreviewhint3(inputs)
	if (locale === "fr") return fr_buildercomposerpreviewhint3(inputs)
	if (locale === "uk") return uk_buildercomposerpreviewhint3(inputs)
	return en_buildercomposerpreviewhint3(inputs)
});
export { buildercomposerpreviewhint3 as "builderComposerPreviewHint" }