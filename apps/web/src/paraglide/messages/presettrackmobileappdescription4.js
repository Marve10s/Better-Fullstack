/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappdescription4Inputs */



/**
* | output |
* | --- |
* | "Expo with Uniwind for a native-first app shell before backend services are needed." |
*
* @param {Presettrackmobileappdescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappdescription4 = /** @type {((inputs?: Presettrackmobileappdescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappdescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Expo con Uniwind para una shell de app con enfoque nativo primero antes de necesitar servicios backend.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Expo 搭配 Uniwind，先生成 native-first 应用 shell，后续再接后端服务。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックエンド サービスが必要になる前のネイティブ ファースト アプリ シェル用の Expo と Uniwind。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드 서비스가 필요하기 전에 기본 우선 앱 셸을 위한 Expo 및 Uniwind.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Expo 搭配 Uniwind，先生成 native-first 應用 shell，後續再接後端服務。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Expo mit Uniwind für eine Native-First-App-Shell, bevor Back-End-Dienste benötigt werden.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Expo avec Uniwind pour un premier shell d'application natif avant que les services backend ne soient nécessaires.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Expo з Uniwind для створення нативної оболонки застосунків, перш ніж знадобляться серверні служби.")
	return /** @type {LocalizedString} */ ("Expo with Uniwind for a native-first app shell before backend services are needed.")
});
export { presettrackmobileappdescription4 as "presetTrackMobileAppDescription" }