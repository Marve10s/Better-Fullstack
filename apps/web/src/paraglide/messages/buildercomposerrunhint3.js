/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerrunhint3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecútalo y edítalo en tu navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在浏览器中运行和编辑")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザで実行して編集")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저에서 실행하고 편집")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在瀏覽器中執行並編輯")
	if (locale === "de") return /** @type {LocalizedString} */ ("Im Browser ausführen und bearbeiten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter et modifier dans votre navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити та редагувати в браузері")
	return /** @type {LocalizedString} */ ("Run and edit it in your browser")
});
export { buildercomposerrunhint3 as "builderComposerRunHint" }