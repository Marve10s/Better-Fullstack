/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruneditingnotice3Inputs */

const en_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edits stay in this browser session and are applied on the next rerun.`)
};

const es_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los cambios permanecen en esta sesión del navegador y se aplican en la próxima ejecución.`)
};

const zh_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑内容会保留在此浏览器会话中，并在下次重新运行时应用。`)
};

const ja_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編集内容はこのブラウザーセッションに保持され、次回の再実行時に適用されます。`)
};

const ko_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`편집 내용은 이 브라우저 세션에 유지되며 다음 실행에 적용됩니다.`)
};

const zh_hant1_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編輯內容會保留在此瀏覽器工作階段，並於下次重新執行時套用。`)
};

const de_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Änderungen bleiben in dieser Browsersitzung und werden beim nächsten Start angewendet.`)
};

const fr_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les modifications restent dans cette session et seront appliquées à la prochaine exécution.`)
};

const uk_builderruneditingnotice3 = /** @type {(inputs: Builderruneditingnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зміни залишаються в цій сесії браузера й застосуються під час наступного запуску.`)
};

/**
* | output |
* | --- |
* | "Edits stay in this browser session and are applied on the next rerun." |
*
* @param {Builderruneditingnotice3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruneditingnotice3 = /** @type {((inputs?: Builderruneditingnotice3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruneditingnotice3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderruneditingnotice3(inputs)
	if (locale === "es") return es_builderruneditingnotice3(inputs)
	if (locale === "zh") return zh_builderruneditingnotice3(inputs)
	if (locale === "ja") return ja_builderruneditingnotice3(inputs)
	if (locale === "ko") return ko_builderruneditingnotice3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderruneditingnotice3(inputs)
	if (locale === "de") return de_builderruneditingnotice3(inputs)
	if (locale === "fr") return fr_builderruneditingnotice3(inputs)
	return uk_builderruneditingnotice3(inputs)
});
export { builderruneditingnotice3 as "builderRunEditingNotice" }