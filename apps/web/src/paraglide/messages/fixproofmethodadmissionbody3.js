/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodadmissionbody3Inputs */

const en_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const es_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const zh_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const ja_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const ko_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const zh_hant1_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const de_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const fr_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const uk_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

/**
* | output |
* | --- |
* | "A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also sta..." |
*
* @param {Fixproofmethodadmissionbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodadmissionbody3 = /** @type {((inputs?: Fixproofmethodadmissionbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodadmissionbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodadmissionbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodadmissionbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodadmissionbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodadmissionbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodadmissionbody3(inputs)
	if (locale === "de") return de_fixproofmethodadmissionbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodadmissionbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodadmissionbody3(inputs)
	return en_fixproofmethodadmissionbody3(inputs)
});
export { fixproofmethodadmissionbody3 as "fixproofMethodAdmissionBody" }