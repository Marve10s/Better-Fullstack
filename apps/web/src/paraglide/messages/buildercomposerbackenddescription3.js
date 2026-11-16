/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerbackenddescription3Inputs */



/**
* | output |
* | --- |
* | "An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET." |
*
* @param {Buildercomposerbackenddescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerbackenddescription3 = /** @type {((inputs?: Buildercomposerbackenddescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerbackenddescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Una API o servicio con TypeScript, Go, Rust, Python, Java, Kotlin, Elixir o .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用 TypeScript、Go、Rust、Python、Java、Kotlin、Elixir 或 .NET 构建 API 或服务。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("TypeScript、Go、Rust、Python、Java、Kotlin、Elixir、または .NET の API やサービス。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("TypeScript, Go, Rust, Python, Java, Kotlin, Elixir 또는 .NET으로 만드는 API나 서비스입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用 TypeScript、Go、Rust、Python、Java、Kotlin、Elixir 或 .NET 建置 API 或服務。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Eine API oder ein Dienst mit TypeScript, Go, Rust, Python, Java, Kotlin, Elixir oder .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Une API ou un service avec TypeScript, Go, Rust, Python, Java, Kotlin, Elixir ou .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("API або сервіс на TypeScript, Go, Rust, Python, Java, Kotlin, Elixir або .NET.")
	return /** @type {LocalizedString} */ ("An API or service with TypeScript, Go, Rust, Python, Java, Kotlin, Elixir, or .NET.")
});
export { buildercomposerbackenddescription3 as "builderComposerBackendDescription" }