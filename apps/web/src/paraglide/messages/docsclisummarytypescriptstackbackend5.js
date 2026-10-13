/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackbackend5Inputs */

const en_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend framework. \`self\` pairs with fullstack frontends.`)
};

const es_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework de backend. \`self\` se combina con frontends fullstack.`)
};

const zh_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端框架。\`self\` 用于搭配全栈前端。`)
};

const ja_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンドのフレームワーク。\`self\` はフルスタックのフロントエンドと組み合わせます。`)
};

const ko_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드 프레임워크. \`self\`는 풀스택 프런트엔드와 함께 사용합니다.`)
};

const zh_hant1_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`後端框架。\`self\` 用於搭配全端前端。`)
};

const de_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend-Framework. \`self\` wird mit Fullstack-Frontends kombiniert.`)
};

const fr_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework de backend. \`self\` s’associe aux frontends fullstack.`)
};

const uk_docsclisummarytypescriptstackbackend5 = /** @type {(inputs: Docsclisummarytypescriptstackbackend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фреймворк бекенду. \`self\` поєднується з fullstack-фронтендами.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackbackend5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackbackend5(inputs)
	return en_docsclisummarytypescriptstackbackend5(inputs)
});
export { docsclisummarytypescriptstackbackend5 as "docsCliSummaryTypescriptStackBackend" }