/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetclicktoapply3Inputs */

const en_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to apply`)
};

const es_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Haz clic para aplicar`)
};

const zh_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击应用`)
};

const ja_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クリックして適用`)
};

const ko_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`신청하려면 클릭하세요`)
};

const zh_hant1_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`點擊應用`)
};

const de_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Klicken Sie hier, um sich zu bewerben`)
};

const fr_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliquez pour postuler`)
};

/**
* | output |
* | --- |
* | "Click to apply" |
*
* @param {Presetclicktoapply3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetclicktoapply3 = /** @type {((inputs?: Presetclicktoapply3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetclicktoapply3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetclicktoapply3(inputs)
	if (locale === "es") return es_presetclicktoapply3(inputs)
	if (locale === "zh") return zh_presetclicktoapply3(inputs)
	if (locale === "ja") return ja_presetclicktoapply3(inputs)
	if (locale === "ko") return ko_presetclicktoapply3(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetclicktoapply3(inputs)
	if (locale === "de") return de_presetclicktoapply3(inputs)
	return fr_presetclicktoapply3(inputs)
});
export { presetclicktoapply3 as "presetClickToApply" }