/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdated1Inputs */

const en_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updated`)
};

const es_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizado`)
};

const zh_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已更新`)
};

const ja_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新されました`)
};

const ko_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`업데이트됨`)
};

const zh_hant1_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已更新`)
};

const de_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aktualisiert`)
};

const fr_savedupdated1 = /** @type {(inputs: Savedupdated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mis à jour`)
};

/**
* | output |
* | --- |
* | "Updated" |
*
* @param {Savedupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedupdated1 = /** @type {((inputs?: Savedupdated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedupdated1(inputs)
	if (locale === "es") return es_savedupdated1(inputs)
	if (locale === "zh") return zh_savedupdated1(inputs)
	if (locale === "ja") return ja_savedupdated1(inputs)
	if (locale === "ko") return ko_savedupdated1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedupdated1(inputs)
	if (locale === "de") return de_savedupdated1(inputs)
	return fr_savedupdated1(inputs)
});
export { savedupdated1 as "savedUpdated" }