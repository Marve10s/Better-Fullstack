/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerrunhint3Inputs */

const en_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run and edit it in your browser`)
};

const es_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecútalo y edítalo en tu navegador`)
};

const zh_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在浏览器中运行和编辑`)
};

const ja_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザで実行して編集`)
};

const ko_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저에서 실행하고 편집`)
};

const zh_hant1_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在瀏覽器中執行並編輯`)
};

const de_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Im Browser ausführen und bearbeiten`)
};

const fr_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter et modifier dans votre navigateur`)
};

const uk_buildercomposerrunhint3 = /** @type {(inputs: Buildercomposerrunhint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити та редагувати в браузері`)
};

/**
* | output |
* | --- |
* | "Run and edit it in your browser" |
*
* @param {Buildercomposerrunhint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerrunhint3 = /** @type {((inputs?: Buildercomposerrunhint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerrunhint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerrunhint3(inputs)
	if (locale === "zh") return zh_buildercomposerrunhint3(inputs)
	if (locale === "ja") return ja_buildercomposerrunhint3(inputs)
	if (locale === "ko") return ko_buildercomposerrunhint3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerrunhint3(inputs)
	if (locale === "de") return de_buildercomposerrunhint3(inputs)
	if (locale === "fr") return fr_buildercomposerrunhint3(inputs)
	if (locale === "uk") return uk_buildercomposerrunhint3(inputs)
	return en_buildercomposerrunhint3(inputs)
});
export { buildercomposerrunhint3 as "builderComposerRunHint" }