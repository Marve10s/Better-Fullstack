/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612title2Inputs */

const en_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent benchmark, .NET ecosystem, and a 42% lighter install`)
};

const es_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark de agentes, ecosistema .NET e instalación un 42% más ligera`)
};

const zh_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理 benchmark、.NET 生态，以及轻 42% 的安装体积`)
};

const ja_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントのベンチマーク、.NET エコシステム、および 42% 軽量のインストール`)
};

const ko_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트 벤치마크, .NET 에코시스템 및 42% 더 가벼운 설치`)
};

const zh_hant1_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理 benchmark、.NET 生態，以及輕 42% 的安裝體積`)
};

const de_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent-Benchmark, .NET-Ökosystem und eine um 42 % leichtere Installation`)
};

const fr_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark d'agent, écosystème .NET et installation 42 % plus légère`)
};

/**
* | output |
* | --- |
* | "Agent benchmark, .NET ecosystem, and a 42% lighter install" |
*
* @param {Changelogrelease20260612title2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612title2 = /** @type {((inputs?: Changelogrelease20260612title2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612title2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612title2(inputs)
	if (locale === "es") return es_changelogrelease20260612title2(inputs)
	if (locale === "zh") return zh_changelogrelease20260612title2(inputs)
	if (locale === "ja") return ja_changelogrelease20260612title2(inputs)
	if (locale === "ko") return ko_changelogrelease20260612title2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612title2(inputs)
	if (locale === "de") return de_changelogrelease20260612title2(inputs)
	return fr_changelogrelease20260612title2(inputs)
});
export { changelogrelease20260612title2 as "changelogRelease20260612Title" }