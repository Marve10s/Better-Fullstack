/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecatalogtitle2Inputs */



/**
* | output |
* | --- |
* | "Pick every layer of the stack" |
*
* @param {Homecatalogtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecatalogtitle2 = /** @type {((inputs?: Homecatalogtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecatalogtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Elige cada capa del stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("选择技术栈的每一层")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックのすべての層を選ぶ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택의 모든 계층을 선택하세요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選擇技術堆疊的每一層")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wähle jede Schicht des Stacks")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Choisissez chaque couche de la stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оберіть кожен шар стека")
	return /** @type {LocalizedString} */ ("Pick every layer of the stack")
});
export { homecatalogtitle2 as "homeCatalogTitle" }