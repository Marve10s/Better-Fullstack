/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runagentsdesc2Inputs */

const en_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The provider is inferred from the model id, so one flag picks both the model and the CLI that drives it.`)
};

const es_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El proveedor se infiere del id del modelo, así que un solo flag selecciona tanto el modelo como la CLI que lo controla.`)
};

const zh_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`提供商由模型 ID 推断得出，因此一个 flag 会同时选定模型和驱动它的 CLI。`)
};

const ja_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーはモデルIDから推測されるため、1つのフラグでモデルと、それを駆動するCLIの両方を選択できます。`)
};

const ko_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공자는 모델 ID에서 추론되므로 하나의 플래그로 모델과 해당 모델을 구동하는 CLI를 모두 선택할 수 있습니다.`)
};

const zh_hant1_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`提供者由模型 ID 推斷得出，因此一個旗標就能同時選定模型與驅動它的 CLI。`)
};

const de_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Provider wird aus der Modell-ID abgeleitet, sodass ein Flag sowohl das Modell als auch die zugehörige CLI auswählt.`)
};

const fr_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le fournisseur est déduit de l'identifiant du modèle ; un seul indicateur sélectionne donc à la fois le modèle et l'interface de ligne de commande qui le pilote.`)
};

const uk_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Постачальник визначається за ідентифікатором моделі, тому один прапор вибирає як модель, так і CLI, який нею керує.`)
};

/**
* | output |
* | --- |
* | "The provider is inferred from the model id, so one flag picks both the model and the CLI that drives it." |
*
* @param {Runagentsdesc2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runagentsdesc2 = /** @type {((inputs?: Runagentsdesc2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runagentsdesc2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runagentsdesc2(inputs)
	if (locale === "zh") return zh_runagentsdesc2(inputs)
	if (locale === "ja") return ja_runagentsdesc2(inputs)
	if (locale === "ko") return ko_runagentsdesc2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runagentsdesc2(inputs)
	if (locale === "de") return de_runagentsdesc2(inputs)
	if (locale === "fr") return fr_runagentsdesc2(inputs)
	if (locale === "uk") return uk_runagentsdesc2(inputs)
	return en_runagentsdesc2(inputs)
});
export { runagentsdesc2 as "runAgentsDesc" }