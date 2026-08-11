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
	return /** @type {LocalizedString} */ (`サービスを公開する`)
};

const ko_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`서비스 공개`)
};

const zh_hant1_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開放介面`)
};

const de_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einen Dienst bereitstellen`)
};

const fr_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exposer un service`)
};

const uk_presettrackrestapiintent4 = /** @type {(inputs: Presettrackrestapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити сервіс назовні`)
};

/**
* | output |
* | --- |
* | "Expose a service" |
*
* @param {Presettrackrestapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiintent4 = /** @type {((inputs?: Presettrackrestapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presettrackrestapiintent4(inputs)
	if (locale === "zh") return zh_presettrackrestapiintent4(inputs)
	if (locale === "ja") return ja_presettrackrestapiintent4(inputs)
	if (locale === "ko") return ko_presettrackrestapiintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrestapiintent4(inputs)
	if (locale === "de") return de_presettrackrestapiintent4(inputs)
	if (locale === "fr") return fr_presettrackrestapiintent4(inputs)
	if (locale === "uk") return uk_presettrackrestapiintent4(inputs)
	return en_presettrackrestapiintent4(inputs)
});
export { presettrackrestapiintent4 as "presetTrackRestApiIntent" }