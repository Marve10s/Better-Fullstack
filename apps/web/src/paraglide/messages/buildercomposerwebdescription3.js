/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerwebdescription3Inputs */



/**
* | output |
* | --- |
* | "A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported." |
*
* @param {Buildercomposerwebdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerwebdescription3 = /** @type {((inputs?: Buildercomposerwebdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerwebdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Una aplicación web con TypeScript, Rust o .NET. Añade una envoltura de escritorio cuando sea compatible.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用 TypeScript、Rust 或 .NET 构建 Web 应用。在支持的情况下，可添加桌面外壳。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("TypeScript、Rust、または .NET の Web アプリケーション。対応している場合はデスクトップシェルを追加できます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("TypeScript, Rust 또는 .NET으로 만드는 웹 애플리케이션입니다. 지원되는 경우 데스크톱 셸을 추가할 수 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用 TypeScript、Rust 或 .NET 建置網頁應用程式。在支援的情況下，可加入桌面外殼。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Eine Webanwendung mit TypeScript, Rust oder .NET. Füge bei Bedarf eine unterstützte Desktop-Hülle hinzu.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Une application web avec TypeScript, Rust ou .NET. Ajoutez une interface de bureau si elle est prise en charge.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебзастосунок на TypeScript, Rust або .NET. За наявності підтримки можна додати оболонку для настільного застосунку.")
	return /** @type {LocalizedString} */ ("A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.")
});
export { buildercomposerwebdescription3 as "builderComposerWebDescription" }