/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconnections2Inputs */

const en_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend connections`)
};

const es_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Conexiones con el backend`)
};

const zh_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端连接`)
};

const ja_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンド接続`)
};

const ko_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드 연결`)
};

const zh_hant1_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`後端連線`)
};

const de_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend-Verbindungen`)
};

const fr_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connexions au backend`)
};

const uk_buildercomposerconnections2 = /** @type {(inputs: Buildercomposerconnections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підключення до бекенду`)
};

/**
* | output |
* | --- |
* | "Backend connections" |
*
* @param {Buildercomposerconnections2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconnections2 = /** @type {((inputs?: Buildercomposerconnections2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconnections2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconnections2(inputs)
	if (locale === "zh") return zh_buildercomposerconnections2(inputs)
	if (locale === "ja") return ja_buildercomposerconnections2(inputs)
	if (locale === "ko") return ko_buildercomposerconnections2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconnections2(inputs)
	if (locale === "de") return de_buildercomposerconnections2(inputs)
	if (locale === "fr") return fr_buildercomposerconnections2(inputs)
	if (locale === "uk") return uk_buildercomposerconnections2(inputs)
	return en_buildercomposerconnections2(inputs)
});
export { buildercomposerconnections2 as "builderComposerConnections" }