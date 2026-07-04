/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagmodel2Inputs */

const en_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`the model to run (see the table above); the provider is inferred from the id`)
};

const es_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`el modelo a ejecutar (ver la tabla anterior); el proveedor se infiere del id`)
};

const zh_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要运行的模型（参见上表）；提供者由 ID 推断得出。`)
};

const ja_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実行するモデル（上記の表を参照）。プロバイダーはIDから推測されます。`)
};

const ko_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실행할 모델(위 표 참조); 공급자는 ID에서 추론됩니다.`)
};

const zh_hant1_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`要運行的模型（參見上表）；提供者由 ID 推斷得出。`)
};

const de_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Das auszuführende Modell (siehe Tabelle oben); der Provider wird aus der ID abgeleitet.`)
};

const fr_runflagmodel2 = /** @type {(inputs: Runflagmodel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`le modèle à exécuter (voir le tableau ci-dessus) ; le fournisseur est déduit de l’identifiant`)
};

/**
* | output |
* | --- |
* | "the model to run (see the table above); the provider is inferred from the id" |
*
* @param {Runflagmodel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagmodel2 = /** @type {((inputs?: Runflagmodel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagmodel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagmodel2(inputs)
	if (locale === "es") return es_runflagmodel2(inputs)
	if (locale === "zh") return zh_runflagmodel2(inputs)
	if (locale === "ja") return ja_runflagmodel2(inputs)
	if (locale === "ko") return ko_runflagmodel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagmodel2(inputs)
	if (locale === "de") return de_runflagmodel2(inputs)
	return fr_runflagmodel2(inputs)
});
export { runflagmodel2 as "runFlagModel" }