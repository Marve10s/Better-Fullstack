/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runlabelsignin2Inputs */

const en_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sign in to your agent`)
};

const es_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`iniciar sesión en tu agente`)
};

const zh_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录你的代理`)
};

const ja_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントにサインイン`)
};

const ko_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트에 로그인하세요`)
};

const zh_hant1_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登入您的代理`)
};

const de_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Melden Sie sich bei Ihrem Agenten an.`)
};

const fr_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connectez-vous à votre agent`)
};

const uk_runlabelsignin2 = /** @type {(inputs: Runlabelsignin2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`увійдіть у свого агента`)
};

/**
* | output |
* | --- |
* | "sign in to your agent" |
*
* @param {Runlabelsignin2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runlabelsignin2 = /** @type {((inputs?: Runlabelsignin2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runlabelsignin2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runlabelsignin2(inputs)
	if (locale === "zh") return zh_runlabelsignin2(inputs)
	if (locale === "ja") return ja_runlabelsignin2(inputs)
	if (locale === "ko") return ko_runlabelsignin2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runlabelsignin2(inputs)
	if (locale === "de") return de_runlabelsignin2(inputs)
	if (locale === "fr") return fr_runlabelsignin2(inputs)
	if (locale === "uk") return uk_runlabelsignin2(inputs)
	return en_runlabelsignin2(inputs)
});
export { runlabelsignin2 as "runLabelSignin" }