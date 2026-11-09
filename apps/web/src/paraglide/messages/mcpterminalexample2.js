/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalexample2Inputs */



/**
* | output |
* | --- |
* | "Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL." |
*
* @param {Mcpterminalexample2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpterminalexample2 = /** @type {((inputs?: Mcpterminalexample2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalexample2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Crea una app fullstack TypeScript con Next.js, Hono, Drizzle y PostgreSQL.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("创建一个使用 Next.js、Hono、Drizzle 和 PostgreSQL 的 fullstack TypeScript 应用。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Next.js、Hono、Drizzle、および PostgreSQL を使用してフルスタック TypeScript アプリを作成します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Next.js, Hono, Drizzle 및 PostgreSQL을 사용하여 풀 스택 TypeScript 앱을 만듭니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建立一個使用 Next.js、Hono、Drizzle 和 PostgreSQL 的 fullstack TypeScript 應用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erstellen Sie eine Fullstack-App TypeScript mit Next.js, Hono, Drizzle und PostgreSQL.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Créez une application fullstack TypeScript avec Next.js, Hono, Drizzle et PostgreSQL.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створіть фулстек-застосунок TypeScript з Next.js, Hono, Drizzle та PostgreSQL.")
	return /** @type {LocalizedString} */ ("Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL.")
});
export { mcpterminalexample2 as "mcpTerminalExample" }