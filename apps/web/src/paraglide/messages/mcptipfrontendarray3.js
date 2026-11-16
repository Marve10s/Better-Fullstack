/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipfrontendarray3Inputs */



/**
* | output |
* | --- |
* | "frontend is an array: multiple frontends in one monorepo" |
*
* @param {Mcptipfrontendarray3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptipfrontendarray3 = /** @type {((inputs?: Mcptipfrontendarray3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipfrontendarray3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("frontend es un array: múltiples frontends en un monorepo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("frontend 是数组：一个 monorepo 中可以有多个 frontend")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フロントエンドは配列です: 1 つのモノリポジトリ内の複数のフロントエンド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프런트엔드는 배열입니다. 하나의 모노레포에 여러 프런트엔드가 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("frontend 是陣列：一個 monorepo 可以有多個 frontend")
	if (locale === "de") return /** @type {LocalizedString} */ ("Frontend ist ein Array: mehrere Frontends in einem Monorepo")
	if (locale === "fr") return /** @type {LocalizedString} */ ("frontend est un tableau : plusieurs frontends dans un monorepo")
	if (locale === "uk") return /** @type {LocalizedString} */ ("фронтенд - це масив: кілька фронтендів в одному монорепо")
	return /** @type {LocalizedString} */ ("frontend is an array: multiple frontends in one monorepo")
});
export { mcptipfrontendarray3 as "mcpTipFrontendArray" }