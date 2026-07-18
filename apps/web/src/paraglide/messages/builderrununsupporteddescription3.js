/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrununsupporteddescription3Inputs */

const en_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run currently supports solo TypeScript stacks with a web frontend. Download this project to run it locally.`)
};

const es_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run admite por ahora stacks TypeScript individuales con frontend web. Descarga el proyecto para ejecutarlo localmente.`)
};

const zh_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run 目前支持带 Web 前端的单一 TypeScript 技术栈。请下载项目以在本地运行。`)
};

const ja_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在の Live Run は、Web フロントエンドを含む単独の TypeScript スタックに対応しています。ローカルで実行するにはプロジェクトをダウンロードしてください。`)
};

const ko_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 Live Run은 웹 프런트엔드가 있는 단일 TypeScript 스택을 지원합니다. 로컬 실행을 위해 프로젝트를 다운로드하세요.`)
};

const zh_hant1_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run 目前支援含 Web 前端的單一 TypeScript 技術棧。請下載專案以在本機執行。`)
};

const de_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run unterstützt derzeit einzelne TypeScript-Stacks mit Web-Frontend. Lade das Projekt herunter, um es lokal auszuführen.`)
};

const fr_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run prend actuellement en charge les stacks TypeScript simples avec un frontend web. Téléchargez le projet pour l’exécuter localement.`)
};

const uk_builderrununsupporteddescription3 = /** @type {(inputs: Builderrununsupporteddescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Live Run наразі підтримує окремі TypeScript-стеки з вебфронтендом. Завантажте проєкт, щоб запустити його локально.`)
};

/**
* | output |
* | --- |
* | "Live Run currently supports solo TypeScript stacks with a web frontend. Download this project to run it locally." |
*
* @param {Builderrununsupporteddescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrununsupporteddescription3 = /** @type {((inputs?: Builderrununsupporteddescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrununsupporteddescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrununsupporteddescription3(inputs)
	if (locale === "es") return es_builderrununsupporteddescription3(inputs)
	if (locale === "zh") return zh_builderrununsupporteddescription3(inputs)
	if (locale === "ja") return ja_builderrununsupporteddescription3(inputs)
	if (locale === "ko") return ko_builderrununsupporteddescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrununsupporteddescription3(inputs)
	if (locale === "de") return de_builderrununsupporteddescription3(inputs)
	if (locale === "fr") return fr_builderrununsupporteddescription3(inputs)
	return uk_builderrununsupporteddescription3(inputs)
});
export { builderrununsupporteddescription3 as "builderRunUnsupportedDescription" }