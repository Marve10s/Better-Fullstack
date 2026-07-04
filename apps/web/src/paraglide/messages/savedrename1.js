/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedrename1Inputs */

const en_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rename`)
};

const es_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Renombrar`)
};

const zh_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重命名`)
};

const ja_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`名前の変更`)
};

const ko_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이름 바꾸기`)
};

const zh_hant1_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新命名`)
};

const de_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Umbenennen`)
};

const fr_savedrename1 = /** @type {(inputs: Savedrename1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rebaptiser`)
};

/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Savedrename1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedrename1 = /** @type {((inputs?: Savedrename1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedrename1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedrename1(inputs)
	if (locale === "es") return es_savedrename1(inputs)
	if (locale === "zh") return zh_savedrename1(inputs)
	if (locale === "ja") return ja_savedrename1(inputs)
	if (locale === "ko") return ko_savedrename1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedrename1(inputs)
	if (locale === "de") return de_savedrename1(inputs)
	return fr_savedrename1(inputs)
});
export { savedrename1 as "savedRename" }