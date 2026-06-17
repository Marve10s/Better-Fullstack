/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightdotnet3Inputs */

const en_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph.`)
};

const es_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se añadió .NET como ecosistema de primera clase, además de un nivel enterprise, backend-utils y opciones de despliegue Render/Netlify en el grafo de stacks.`)
};

const zh_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入一等 .NET 生态，并在 stack graph 中加入 enterprise 层、backend-utils，以及 Render/Netlify 部署选项。`)
};

const ja_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファーストクラスのエコシステムとして .NET を追加し、さらにエンタープライズ層、バックエンド ユーティリティ、およびスタック グラフ上の Render/Netlify デプロイメント オプションを追加しました。`)
};

const ko_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 그래프에 .NET을 최고 수준의 에코시스템으로 추가하고 엔터프라이즈 계층, backend-utils 및 Render/Netlify 배포 옵션을 추가했습니다.`)
};

const zh_hant1_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入一等 .NET 生態，並在 stack graph 中加入 enterprise 層、backend-utils，以及 Render/Netlify 部署選項。`)
};

const de_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET als erstklassiges Ökosystem sowie eine Unternehmensebene, Backend-Utils und Render/Netlify-Bereitstellungsoptionen im Stapeldiagramm hinzugefügt.`)
};

const fr_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajout de .NET en tant qu'écosystème de première classe, ainsi que d'un niveau entreprise, d'utilitaires backend et d'options de déploiement Render/Netlify sur le graphique de pile.`)
};

/**
* | output |
* | --- |
* | "Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph." |
*
* @param {Changelogrelease20260612highlightdotnet3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightdotnet3 = /** @type {((inputs?: Changelogrelease20260612highlightdotnet3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightdotnet3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightdotnet3(inputs)
	return fr_changelogrelease20260612highlightdotnet3(inputs)
});
export { changelogrelease20260612highlightdotnet3 as "changelogRelease20260612HighlightDotnet" }