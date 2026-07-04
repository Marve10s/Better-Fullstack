/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runagentsdesc2Inputs */

const en_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The provider is inferred from the model id, so one flag picks both the model and the CLI that drives it.`)
};

const es_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El proveedor se deduce del ID del modelo, por lo que un solo indicador selecciona tanto el modelo como la interfaz de línea de comandos (CLI) que lo controla.`)
};

const zh_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`提供程序是从模型 ID 推断出来的，因此一个标志既可以选择模型，也可以选择驱动该模型的 CLI。`)
};

const ja_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーはモデルIDから推測されるため、1つのフラグでモデルと、それを駆動するCLIの両方を選択できます。`)
};

const ko_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공자는 모델 ID에서 추론되므로 하나의 플래그로 모델과 해당 모델을 구동하는 CLI를 모두 선택할 수 있습니다.`)
};

const zh_hant1_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`提供程序是從模型 ID 推斷出來的，因此一個標誌既可以選擇模型，也可以選擇驅動該模型的 CLI。`)
};

const de_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Provider wird aus der Modell-ID abgeleitet, sodass ein Flag sowohl das Modell als auch die zugehörige CLI auswählt.`)
};

const fr_runagentsdesc2 = /** @type {(inputs: Runagentsdesc2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le fournisseur est déduit de l'identifiant du modèle ; un seul indicateur sélectionne donc à la fois le modèle et l'interface de ligne de commande qui le pilote.`)
};

/**
* | output |
* | --- |
* | "The provider is inferred from the model id, so one flag picks both the model and the CLI that drives it." |
*
* @param {Runagentsdesc2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runagentsdesc2 = /** @type {((inputs?: Runagentsdesc2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runagentsdesc2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runagentsdesc2(inputs)
	if (locale === "es") return es_runagentsdesc2(inputs)
	if (locale === "zh") return zh_runagentsdesc2(inputs)
	if (locale === "ja") return ja_runagentsdesc2(inputs)
	if (locale === "ko") return ko_runagentsdesc2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runagentsdesc2(inputs)
	if (locale === "de") return de_runagentsdesc2(inputs)
	return fr_runagentsdesc2(inputs)
});
export { runagentsdesc2 as "runAgentsDesc" }