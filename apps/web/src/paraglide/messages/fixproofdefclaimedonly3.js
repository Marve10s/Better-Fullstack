/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefclaimedonly3Inputs */

const en_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const es_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const zh_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const ja_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const ko_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const zh_hant1_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const de_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const fr_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const uk_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

/**
* | output |
* | --- |
* | "Runs where the agent's summary claimed edits that never reached disk." |
*
* @param {Fixproofdefclaimedonly3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefclaimedonly3 = /** @type {((inputs?: Fixproofdefclaimedonly3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefclaimedonly3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefclaimedonly3(inputs)
	if (locale === "zh") return zh_fixproofdefclaimedonly3(inputs)
	if (locale === "ja") return ja_fixproofdefclaimedonly3(inputs)
	if (locale === "ko") return ko_fixproofdefclaimedonly3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefclaimedonly3(inputs)
	if (locale === "de") return de_fixproofdefclaimedonly3(inputs)
	if (locale === "fr") return fr_fixproofdefclaimedonly3(inputs)
	if (locale === "uk") return uk_fixproofdefclaimedonly3(inputs)
	return en_fixproofdefclaimedonly3(inputs)
});
export { fixproofdefclaimedonly3 as "fixproofDefClaimedOnly" }