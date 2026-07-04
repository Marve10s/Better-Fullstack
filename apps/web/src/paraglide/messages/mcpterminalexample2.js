/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalexample2Inputs */

const en_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL.`)
};

const es_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea una app fullstack TypeScript con Next.js, Hono, Drizzle y PostgreSQL.`)
};

const zh_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建一个使用 Next.js、Hono、Drizzle 和 PostgreSQL 的 fullstack TypeScript 应用。`)
};

const ja_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js、Hono、Drizzle、および PostgreSQL を使用してフルスタック TypeScript アプリを作成します。`)
};

const ko_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js, Hono, Drizzle 및 PostgreSQL을 사용하여 풀 스택 TypeScript 앱을 만듭니다.`)
};

const zh_hant1_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建立一個使用 Next.js、Hono、Drizzle 和 PostgreSQL 的 fullstack TypeScript 應用。`)
};

const de_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellen Sie eine Fullstack-App TypeScript mit Next.js, Hono, Drizzle und PostgreSQL.`)
};

const fr_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Créez une application fullstack TypeScript avec Next.js, Hono, Drizzle et PostgreSQL.`)
};

/**
* | output |
* | --- |
* | "Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL." |
*
* @param {Mcpterminalexample2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpterminalexample2 = /** @type {((inputs?: Mcpterminalexample2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalexample2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalexample2(inputs)
	if (locale === "es") return es_mcpterminalexample2(inputs)
	if (locale === "zh") return zh_mcpterminalexample2(inputs)
	if (locale === "ja") return ja_mcpterminalexample2(inputs)
	if (locale === "ko") return ko_mcpterminalexample2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpterminalexample2(inputs)
	if (locale === "de") return de_mcpterminalexample2(inputs)
	return fr_mcpterminalexample2(inputs)
});
export { mcpterminalexample2 as "mcpTerminalExample" }