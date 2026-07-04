/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runstepauth2Inputs */

const en_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authenticate your agent`)
};

const es_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autentica a tu agente`)
};

const zh_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证您的代理人`)
};

const ja_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントを認証する`)
};

const ko_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트를 인증하세요`)
};

const zh_hant1_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驗證您的代理人`)
};

const de_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizieren Sie Ihren Agenten`)
};

const fr_runstepauth2 = /** @type {(inputs: Runstepauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifiez votre agent`)
};

/**
* | output |
* | --- |
* | "Authenticate your agent" |
*
* @param {Runstepauth2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runstepauth2 = /** @type {((inputs?: Runstepauth2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runstepauth2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runstepauth2(inputs)
	if (locale === "es") return es_runstepauth2(inputs)
	if (locale === "zh") return zh_runstepauth2(inputs)
	if (locale === "ja") return ja_runstepauth2(inputs)
	if (locale === "ko") return ko_runstepauth2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runstepauth2(inputs)
	if (locale === "de") return de_runstepauth2(inputs)
	return fr_runstepauth2(inputs)
});
export { runstepauth2 as "runStepAuth" }