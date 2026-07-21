/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunfrontendonlynotice4Inputs */

const en_builderrunfrontendonlynotice4 = /** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend preview only — the API server does not run in this sandbox, so auth and API pages show fetch errors.`)
};

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const es_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const zh_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const ja_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const ko_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const zh_hant1_builderrunfrontendonlynotice4 = zh_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const de_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const fr_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/** @type {(inputs: Builderrunfrontendonlynotice4Inputs) => LocalizedString} */
const uk_builderrunfrontendonlynotice4 = en_builderrunfrontendonlynotice4;

/**
* | output |
* | --- |
* | "Frontend preview only — the API server does not run in this sandbox, so auth and API pages show fetch errors." |
*
* @param {Builderrunfrontendonlynotice4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunfrontendonlynotice4 = /** @type {((inputs?: Builderrunfrontendonlynotice4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunfrontendonlynotice4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunfrontendonlynotice4(inputs)
	if (locale === "es") return es_builderrunfrontendonlynotice4(inputs)
	if (locale === "zh") return zh_builderrunfrontendonlynotice4(inputs)
	if (locale === "ja") return ja_builderrunfrontendonlynotice4(inputs)
	if (locale === "ko") return ko_builderrunfrontendonlynotice4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunfrontendonlynotice4(inputs)
	if (locale === "de") return de_builderrunfrontendonlynotice4(inputs)
	if (locale === "fr") return fr_builderrunfrontendonlynotice4(inputs)
	return uk_builderrunfrontendonlynotice4(inputs)
});
export { builderrunfrontendonlynotice4 as "builderRunFrontendOnlyNotice" }