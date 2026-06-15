/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogfullreleasenotes3Inputs */

const en_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full release notes`)
};

const es_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notas completas de la versión`)
};

const zh_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完整发布说明`)
};

/**
* | output |
* | --- |
* | "Full release notes" |
*
* @param {Changelogfullreleasenotes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogfullreleasenotes3 = /** @type {((inputs?: Changelogfullreleasenotes3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogfullreleasenotes3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogfullreleasenotes3(inputs)
	if (locale === "es") return es_changelogfullreleasenotes3(inputs)
	return zh_changelogfullreleasenotes3(inputs)
});
export { changelogfullreleasenotes3 as "changelogFullReleaseNotes" }