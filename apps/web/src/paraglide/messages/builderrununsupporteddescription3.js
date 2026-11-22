/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrununsupporteddescription3Inputs */



/**
* | output |
* | --- |
* | "Live Run currently supports compatible solo TypeScript stacks with a web frontend. Download this project to run it locally." |
*
* @param {Builderrununsupporteddescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrununsupporteddescription3 = /** @type {((inputs?: Builderrununsupporteddescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrununsupporteddescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Live Run admite por ahora stacks TypeScript individuales compatibles con frontend web. Descarga el proyecto para ejecutarlo localmente.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Live Run 目前支持带 Web 前端的兼容单一 TypeScript 技术栈。请下载项目以在本地运行。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在の Live Run は、Web フロントエンドを含む互換性のある単独の TypeScript スタックに対応しています。ローカルで実行するにはプロジェクトをダウンロードしてください。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 Live Run은 웹 프런트엔드가 있는 호환 가능한 단일 TypeScript 스택을 지원합니다. 로컬 실행을 위해 프로젝트를 다운로드하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Live Run 目前支援含 Web 前端的相容單一 TypeScript 技術棧。請下載專案以在本機執行。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Live Run unterstützt derzeit kompatible einzelne TypeScript-Stacks mit Web-Frontend. Lade das Projekt herunter, um es lokal auszuführen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Live Run prend actuellement en charge les stacks TypeScript simples compatibles avec un frontend web. Téléchargez le projet pour l’exécuter localement.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Live Run наразі підтримує сумісні окремі TypeScript-стеки з вебфронтендом. Завантажте проєкт, щоб запустити його локально.")
	return /** @type {LocalizedString} */ ("Live Run currently supports compatible solo TypeScript stacks with a web frontend. Download this project to run it locally.")
});
export { builderrununsupporteddescription3 as "builderRunUnsupportedDescription" }