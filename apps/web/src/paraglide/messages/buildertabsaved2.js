/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabsaved2Inputs */

const en_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved`)
};

const es_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardados`)
};

const zh_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存`)
};

const ja_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存されました`)
};

const ko_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`저장됨`)
};

const zh_hant1_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已儲存`)
};

const de_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gespeichert`)
};

const fr_buildertabsaved2 = /** @type {(inputs: Buildertabsaved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistré`)
};

/**
* | output |
* | --- |
* | "Saved" |
*
* @param {Buildertabsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildertabsaved2 = /** @type {((inputs?: Buildertabsaved2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabsaved2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabsaved2(inputs)
	if (locale === "es") return es_buildertabsaved2(inputs)
	if (locale === "zh") return zh_buildertabsaved2(inputs)
	if (locale === "ja") return ja_buildertabsaved2(inputs)
	if (locale === "ko") return ko_buildertabsaved2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertabsaved2(inputs)
	if (locale === "de") return de_buildertabsaved2(inputs)
	return fr_buildertabsaved2(inputs)
});
export { buildertabsaved2 as "builderTabSaved" }