/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolintent4Inputs */

const en_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Move fast with CRUD`)
};

const es_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avanzar rápido con CRUD`)
};

const zh_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速构建 CRUD`)
};

const ja_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CRUD で迅速に行動する`)
};

const ko_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CRUD로 빠르게 이동`)
};

const zh_hant1_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速建置 CRUD`)
};

const de_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bewegen Sie sich schnell mit CRUD`)
};

const fr_presettrackinternaltoolintent4 = /** @type {(inputs: Presettrackinternaltoolintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Déplacez-vous rapidement avec CRUD`)
};

/**
* | output |
* | --- |
* | "Move fast with CRUD" |
*
* @param {Presettrackinternaltoolintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolintent4 = /** @type {((inputs?: Presettrackinternaltoolintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackinternaltoolintent4(inputs)
	if (locale === "es") return es_presettrackinternaltoolintent4(inputs)
	if (locale === "zh") return zh_presettrackinternaltoolintent4(inputs)
	if (locale === "ja") return ja_presettrackinternaltoolintent4(inputs)
	if (locale === "ko") return ko_presettrackinternaltoolintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackinternaltoolintent4(inputs)
	if (locale === "de") return de_presettrackinternaltoolintent4(inputs)
	return fr_presettrackinternaltoolintent4(inputs)
});
export { presettrackinternaltoolintent4 as "presetTrackInternalToolIntent" }