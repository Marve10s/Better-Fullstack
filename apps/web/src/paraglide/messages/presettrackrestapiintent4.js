/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiintent4Inputs */

const en_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expose a service`)
};

const es_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exponer un servicio`)
};

const zh_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开放接口`)
};

const ja_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expoサービスを選択してください`)
};

const ko_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo서비스`)
};

const zh_hant1_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開放介面`)
};

const de_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expose einen Dienst`)
};

const fr_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expovoir un service`)
};

/**
* | output |
* | --- |
* | "Expose a service" |
*
* @param {Presettrackrestapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiintent4 = /** @type {((inputs?: Presettrackrestapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapiintent4(inputs)
	if (locale === "es") return es_presettrackrestapiintent4(inputs)
	if (locale === "zh") return zh_presettrackrestapiintent4(inputs)
	if (locale === "ja") return ja_presettrackrestapiintent4(inputs)
	if (locale === "ko") return ko_presettrackrestapiintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrestapiintent4(inputs)
	if (locale === "de") return de_presettrackrestapiintent4(inputs)
	return fr_presettrackrestapiintent4(inputs)
});
export { presettrackrestapiintent4 as "presetTrackRestApiIntent" }