/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runlabelclone2Inputs */

const en_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`clone the harness`)
};

const es_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`clonar el arnés`)
};

const zh_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆线束`)
};

const ja_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ハーネスをクローンする`)
};

const ko_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하네스를 복제하세요`)
};

const zh_hant1_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆線束`)
};

const de_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Klonen Sie den Kabelbaum`)
};

const fr_runlabelclone2 = /** @type {(inputs: Runlabelclone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cloner le harnais`)
};

/**
* | output |
* | --- |
* | "clone the harness" |
*
* @param {Runlabelclone2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runlabelclone2 = /** @type {((inputs?: Runlabelclone2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runlabelclone2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runlabelclone2(inputs)
	if (locale === "es") return es_runlabelclone2(inputs)
	if (locale === "zh") return zh_runlabelclone2(inputs)
	if (locale === "ja") return ja_runlabelclone2(inputs)
	if (locale === "ko") return ko_runlabelclone2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runlabelclone2(inputs)
	if (locale === "de") return de_runlabelclone2(inputs)
	return fr_runlabelclone2(inputs)
});
export { runlabelclone2 as "runLabelClone" }