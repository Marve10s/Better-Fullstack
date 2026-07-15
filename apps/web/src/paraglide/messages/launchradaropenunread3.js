/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Launchradaropenunread3Inputs */

const en_launchradaropenunread3 = /** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Explore ${i?.count} new stack choices`)
};

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const es_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const zh_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const ja_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const ko_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const zh_hant1_launchradaropenunread3 = zh_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const de_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const fr_launchradaropenunread3 = en_launchradaropenunread3;

/** @type {(inputs: Launchradaropenunread3Inputs) => LocalizedString} */
const uk_launchradaropenunread3 = en_launchradaropenunread3;

/**
* | output |
* | --- |
* | "Explore {count} new stack choices" |
*
* @param {Launchradaropenunread3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradaropenunread3 = /** @type {((inputs: Launchradaropenunread3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradaropenunread3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_launchradaropenunread3(inputs)
	if (locale === "es") return es_launchradaropenunread3(inputs)
	if (locale === "zh") return zh_launchradaropenunread3(inputs)
	if (locale === "ja") return ja_launchradaropenunread3(inputs)
	if (locale === "ko") return ko_launchradaropenunread3(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradaropenunread3(inputs)
	if (locale === "de") return de_launchradaropenunread3(inputs)
	if (locale === "fr") return fr_launchradaropenunread3(inputs)
	return uk_launchradaropenunread3(inputs)
});
export { launchradaropenunread3 as "launchRadarOpenUnread" }