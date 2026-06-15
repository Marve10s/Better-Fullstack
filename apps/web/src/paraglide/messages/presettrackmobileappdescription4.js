/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappdescription4Inputs */

const en_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo with Uniwind for a native-first app shell before backend services are needed.`)
};

const es_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo con Uniwind para una shell de app native-first antes de necesitar servicios backend.`)
};

const zh_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 搭配 Uniwind，先生成 native-first 应用 shell，后续再接后端服务。`)
};

/**
* | output |
* | --- |
* | "Expo with Uniwind for a native-first app shell before backend services are needed." |
*
* @param {Presettrackmobileappdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappdescription4 = /** @type {((inputs?: Presettrackmobileappdescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappdescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappdescription4(inputs)
	if (locale === "es") return es_presettrackmobileappdescription4(inputs)
	return zh_presettrackmobileappdescription4(inputs)
});
export { presettrackmobileappdescription4 as "presetTrackMobileAppDescription" }