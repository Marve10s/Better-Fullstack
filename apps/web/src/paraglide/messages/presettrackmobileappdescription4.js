/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappdescription4Inputs */

const en_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo with Uniwind for a native-first app shell before backend services are needed.`)
};

const es_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo con Uniwind para una shell de app con enfoque nativo primero antes de necesitar servicios backend.`)
};

const zh_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 搭配 Uniwind，先生成 native-first 应用 shell，后续再接后端服务。`)
};

const ja_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンド サービスが必要になる前のネイティブ ファースト アプリ シェル用の Expo と Uniwind。`)
};

const ko_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드 서비스가 필요하기 전에 기본 우선 앱 셸을 위한 Expo 및 Uniwind.`)
};

const zh_hant1_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo 搭配 Uniwind，先生成 native-first 應用 shell，後續再接後端服務。`)
};

const de_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo mit Uniwind für eine Native-First-App-Shell, bevor Back-End-Dienste benötigt werden.`)
};

const fr_presettrackmobileappdescription4 = /** @type {(inputs: Presettrackmobileappdescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expo avec Uniwind pour un premier shell d'application natif avant que les services backend ne soient nécessaires.`)
};

/**
* | output |
* | --- |
* | "Expo with Uniwind for a native-first app shell before backend services are needed." |
*
* @param {Presettrackmobileappdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappdescription4 = /** @type {((inputs?: Presettrackmobileappdescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappdescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappdescription4(inputs)
	if (locale === "es") return es_presettrackmobileappdescription4(inputs)
	if (locale === "zh") return zh_presettrackmobileappdescription4(inputs)
	if (locale === "ja") return ja_presettrackmobileappdescription4(inputs)
	if (locale === "ko") return ko_presettrackmobileappdescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackmobileappdescription4(inputs)
	if (locale === "de") return de_presettrackmobileappdescription4(inputs)
	return fr_presettrackmobileappdescription4(inputs)
});
export { presettrackmobileappdescription4 as "presetTrackMobileAppDescription" }