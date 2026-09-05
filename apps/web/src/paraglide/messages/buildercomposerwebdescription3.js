/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerwebdescription3Inputs */

const en_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A web application with TypeScript, Rust, or .NET. Add a desktop shell when supported.`)
};

const es_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una aplicación web con TypeScript, Rust o .NET. Añade una envoltura de escritorio cuando sea compatible.`)
};

const zh_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 TypeScript、Rust 或 .NET 构建 Web 应用。在支持的情况下，可添加桌面外壳。`)
};

const ja_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript、Rust、または .NET の Web アプリケーション。対応している場合はデスクトップシェルを追加できます。`)
};

const ko_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, Rust 또는 .NET으로 만드는 웹 애플리케이션입니다. 지원되는 경우 데스크톱 셸을 추가할 수 있습니다.`)
};

const zh_hant1_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 TypeScript、Rust 或 .NET 建置網頁應用程式。在支援的情況下，可加入桌面外殼。`)
};

const de_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eine Webanwendung mit TypeScript, Rust oder .NET. Füge bei Bedarf eine unterstützte Desktop-Hülle hinzu.`)
};

const fr_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une application web avec TypeScript, Rust ou .NET. Ajoutez une interface de bureau si elle est prise en charge.`)
};

const uk_buildercomposerwebdescription3 = /** @type {(inputs: Buildercomposerwebdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебзастосунок на TypeScript, Rust або .NET. За наявності підтримки можна додати оболонку для настільного застосунку.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerwebdescription3(inputs)
	if (locale === "zh") return zh_buildercomposerwebdescription3(inputs)
	if (locale === "ja") return ja_buildercomposerwebdescription3(inputs)
	if (locale === "ko") return ko_buildercomposerwebdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerwebdescription3(inputs)
	if (locale === "de") return de_buildercomposerwebdescription3(inputs)
	if (locale === "fr") return fr_buildercomposerwebdescription3(inputs)
	if (locale === "uk") return uk_buildercomposerwebdescription3(inputs)
	return en_buildercomposerwebdescription3(inputs)
});
export { buildercomposerwebdescription3 as "builderComposerWebDescription" }