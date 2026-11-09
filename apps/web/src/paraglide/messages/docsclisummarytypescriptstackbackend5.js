/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackbackend5Inputs */



/**
* | output |
* | --- |
* | "Backend framework. `self` pairs with fullstack frontends." |
*
* @param {Docsclisummarytypescriptstackbackend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackbackend5 = /** @type {((inputs?: Docsclisummarytypescriptstackbackend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackbackend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework de backend. `self` se combina con frontends fullstack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("后端框架。`self` 用于搭配全栈前端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックエンドのフレームワーク。`self` はフルスタックのフロントエンドと組み合わせます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드 프레임워크. `self`는 풀스택 프런트엔드와 함께 사용합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("後端框架。`self` 用於搭配全端前端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Backend-Framework. `self` wird mit Fullstack-Frontends kombiniert.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework de backend. `self` s’associe aux frontends fullstack.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фреймворк бекенду. `self` поєднується з fullstack-фронтендами.")
	return /** @type {LocalizedString} */ ("Backend framework. `self` pairs with fullstack frontends.")
});
export { docsclisummarytypescriptstackbackend5 as "docsCliSummaryTypescriptStackBackend" }