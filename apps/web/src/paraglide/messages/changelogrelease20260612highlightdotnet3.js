/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightdotnet3Inputs */



/**
* | output |
* | --- |
* | "Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph." |
*
* @param {Changelogrelease20260612highlightdotnet3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightdotnet3 = /** @type {((inputs?: Changelogrelease20260612highlightdotnet3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightdotnet3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Se añadió .NET como ecosistema de primera clase, además de un nivel enterprise, backend-utils y opciones de despliegue Render/Netlify en el grafo de stacks.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("加入一等 .NET 生态，并在 stack graph 中加入 enterprise 层、backend-utils，以及 Render/Netlify 部署选项。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファーストクラスのエコシステムとして .NET を追加し、さらにエンタープライズ層、バックエンド ユーティリティ、およびスタック グラフ上の Render/Netlify デプロイメント オプションを追加しました。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택 그래프에 .NET을 최고 수준의 에코시스템으로 추가하고 엔터프라이즈 계층, backend-utils 및 Render/Netlify 배포 옵션을 추가했습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("加入一等 .NET 生態，並在 stack graph 中加入 enterprise 層、backend-utils，以及 Render/Netlify 部署選項。")
	if (locale === "de") return /** @type {LocalizedString} */ (".NET als erstklassiges Ökosystem sowie eine Unternehmensebene, Backend-Utils und Render/Netlify-Bereitstellungsoptionen im Stapeldiagramm hinzugefügt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ajout de .NET en tant qu'écosystème de première classe, ainsi que d'un niveau entreprise, d'utilitaires backend et d'options de déploiement Render/Netlify sur le graphique de pile.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Додано .NET як першокласну екосистему, а також корпоративний рівень, серверні утиліти та параметри розгортання Render/Netlify на графі стеку.")
	return /** @type {LocalizedString} */ ("Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph.")
});
export { changelogrelease20260612highlightdotnet3 as "changelogRelease20260612HighlightDotnet" }