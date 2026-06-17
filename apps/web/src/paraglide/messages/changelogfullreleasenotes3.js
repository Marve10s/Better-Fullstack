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

const ja_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完全なリリースノート`)
};

const ko_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`전체 릴리스 노트`)
};

const zh_hant1_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完整發布說明`)
};

const de_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vollständige Versionshinweise`)
};

const fr_changelogfullreleasenotes3 = /** @type {(inputs: Changelogfullreleasenotes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notes de version complètes`)
};

/**
* | output |
* | --- |
* | "Full release notes" |
*
* @param {Changelogfullreleasenotes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogfullreleasenotes3 = /** @type {((inputs?: Changelogfullreleasenotes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogfullreleasenotes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogfullreleasenotes3(inputs)
	if (locale === "es") return es_changelogfullreleasenotes3(inputs)
	if (locale === "zh") return zh_changelogfullreleasenotes3(inputs)
	if (locale === "ja") return ja_changelogfullreleasenotes3(inputs)
	if (locale === "ko") return ko_changelogfullreleasenotes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogfullreleasenotes3(inputs)
	if (locale === "de") return de_changelogfullreleasenotes3(inputs)
	return fr_changelogfullreleasenotes3(inputs)
});
export { changelogfullreleasenotes3 as "changelogFullReleaseNotes" }