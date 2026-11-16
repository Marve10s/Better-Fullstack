/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrununsupportedtitle3Inputs */



/**
* | output |
* | --- |
* | "This stack cannot run in-browser yet" |
*
* @param {Builderrununsupportedtitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrununsupportedtitle3 = /** @type {((inputs?: Builderrununsupportedtitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrununsupportedtitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Este stack todavía no puede ejecutarse en el navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("此技术栈暂时无法在浏览器中运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックはまだブラウザ内で実行できません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택은 아직 브라우저에서 실행할 수 없습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此技術棧暫時無法在瀏覽器中執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dieser Stack kann noch nicht im Browser ausgeführt werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cette stack ne peut pas encore s’exécuter dans le navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цей стек поки не можна запустити у браузері")
	return /** @type {LocalizedString} */ ("This stack cannot run in-browser yet")
});
export { builderrununsupportedtitle3 as "builderRunUnsupportedTitle" }