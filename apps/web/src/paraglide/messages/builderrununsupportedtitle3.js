/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrununsupportedtitle3Inputs */

const en_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This stack cannot run in-browser yet`)
};

const es_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Este stack todavía no puede ejecutarse en el navegador`)
};

const zh_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此技术栈暂时无法在浏览器中运行`)
};

const ja_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックはまだブラウザ内で実行できません`)
};

const ko_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택은 아직 브라우저에서 실행할 수 없습니다`)
};

const zh_hant1_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此技術棧暫時無法在瀏覽器中執行`)
};

const de_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dieser Stack kann noch nicht im Browser ausgeführt werden`)
};

const fr_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cette stack ne peut pas encore s’exécuter dans le navigateur`)
};

const uk_builderrununsupportedtitle3 = /** @type {(inputs: Builderrununsupportedtitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цей стек поки не можна запустити у браузері`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrununsupportedtitle3(inputs)
	if (locale === "zh") return zh_builderrununsupportedtitle3(inputs)
	if (locale === "ja") return ja_builderrununsupportedtitle3(inputs)
	if (locale === "ko") return ko_builderrununsupportedtitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrununsupportedtitle3(inputs)
	if (locale === "de") return de_builderrununsupportedtitle3(inputs)
	if (locale === "fr") return fr_builderrununsupportedtitle3(inputs)
	if (locale === "uk") return uk_builderrununsupportedtitle3(inputs)
	return en_builderrununsupportedtitle3(inputs)
});
export { builderrununsupportedtitle3 as "builderRunUnsupportedTitle" }