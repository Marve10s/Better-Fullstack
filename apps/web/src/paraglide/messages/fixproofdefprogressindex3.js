/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefprogressindex3Inputs */

const en_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const es_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const zh_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const ja_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const ko_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const zh_hant1_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const de_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const fr_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const uk_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

/**
* | output |
* | --- |
* | "Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each..." |
*
* @param {Fixproofdefprogressindex3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefprogressindex3 = /** @type {((inputs?: Fixproofdefprogressindex3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefprogressindex3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefprogressindex3(inputs)
	if (locale === "zh") return zh_fixproofdefprogressindex3(inputs)
	if (locale === "ja") return ja_fixproofdefprogressindex3(inputs)
	if (locale === "ko") return ko_fixproofdefprogressindex3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefprogressindex3(inputs)
	if (locale === "de") return de_fixproofdefprogressindex3(inputs)
	if (locale === "fr") return fr_fixproofdefprogressindex3(inputs)
	if (locale === "uk") return uk_fixproofdefprogressindex3(inputs)
	return en_fixproofdefprogressindex3(inputs)
});
export { fixproofdefprogressindex3 as "fixproofDefProgressIndex" }