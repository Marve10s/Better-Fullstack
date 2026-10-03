/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlighteffect3Inputs */

const en_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run Effect in the app or on its own server`)
};

const es_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta Effect en la app o en su propio servidor`)
};

const zh_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在应用内或独立服务器上运行 Effect`)
};

const ja_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect をアプリ内または専用サーバーで実行`)
};

const ko_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect를 앱 안이나 별도 서버에서 실행`)
};

const zh_hant1_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在應用程式內或獨立伺服器上執行 Effect`)
};

const de_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effect in der App oder auf eigenem Server ausführen`)
};

const fr_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez Effect dans l'application ou sur son propre serveur`)
};

const uk_changelogrelease20261001highlighteffect3 = /** @type {(inputs: Changelogrelease20261001highlighteffect3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запускайте Effect у застосунку або на окремому сервері`)
};

/**
* | output |
* | --- |
* | "Run Effect in the app or on its own server" |
*
* @param {Changelogrelease20261001highlighteffect3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlighteffect3 = /** @type {((inputs?: Changelogrelease20261001highlighteffect3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlighteffect3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "de") return de_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001highlighteffect3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001highlighteffect3(inputs)
	return en_changelogrelease20261001highlighteffect3(inputs)
});
export { changelogrelease20261001highlighteffect3 as "changelogRelease20261001HighlightEffect" }