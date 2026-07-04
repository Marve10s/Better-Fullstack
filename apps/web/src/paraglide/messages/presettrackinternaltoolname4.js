/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolname4Inputs */

const en_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internal Tool`)
};

const es_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramienta interna`)
};

const zh_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内部工具`)
};

const ja_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内部ツール`)
};

const ko_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`내부 도구`)
};

const zh_hant1_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`內部工具`)
};

const de_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internes Tool`)
};

const fr_presettrackinternaltoolname4 = /** @type {(inputs: Presettrackinternaltoolname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outil interne`)
};

/**
* | output |
* | --- |
* | "Internal Tool" |
*
* @param {Presettrackinternaltoolname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolname4 = /** @type {((inputs?: Presettrackinternaltoolname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltoolname4(inputs)
	if (locale === "es") return es_presettrackinternaltoolname4(inputs)
	if (locale === "zh") return zh_presettrackinternaltoolname4(inputs)
	if (locale === "ja") return ja_presettrackinternaltoolname4(inputs)
	if (locale === "ko") return ko_presettrackinternaltoolname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackinternaltoolname4(inputs)
	if (locale === "de") return de_presettrackinternaltoolname4(inputs)
	return fr_presettrackinternaltoolname4(inputs)
});
export { presettrackinternaltoolname4 as "presetTrackInternalToolName" }