/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runseodescription2Inputs */

const en_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduce the ScaffBench benchmark locally: clone the harness, point it at any agent CLI or an API key, and score whether the generated projects build.`)
};

const es_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduce localmente la prueba de rendimiento ScaffBench: clona el entorno de pruebas, apúntalo a cualquier interfaz de línea de comandos de agente o a una clave API y evalúa si los proyectos generados se compilan correctamente.`)
};

const zh_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在本地重现 ScaffBench 基准测试：克隆测试框架，将其指向任何代理 CLI 或 API 密钥，并评估生成的项目是否能够构建。`)
};

const ja_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBenchベンチマークをローカルで再現するには、ハーネスをクローンし、任意のエージェントCLIまたはAPIキーを指定して、生成されたプロジェクトがビルドされるかどうかをスコアリングします。`)
};

const ko_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench 벤치마크를 로컬에서 재현하려면 하네스를 복제하고, 에이전트 CLI 또는 API 키를 지정한 다음, 생성된 프로젝트가 빌드되는지 여부를 평가하십시오.`)
};

const zh_hant1_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在本地重現 ScaffBench 基準測試：克隆測試框架，將其指向任何代理 CLI 或 API 金鑰，並評估產生的專案是否能夠建置。`)
};

const de_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduzieren Sie den ScaffBench-Benchmark lokal: Klonen Sie das Harness, verweisen Sie es auf eine beliebige Agenten-CLI oder einen API-Schlüssel und bewerten Sie, ob die generierten Projekte kompiliert werden können.`)
};

const fr_runseodescription2 = /** @type {(inputs: Runseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproduisez localement le benchmark ScaffBench : clonez le framework, pointez-le vers n’importe quelle interface de ligne de commande d’agent ou une clé API, et vérifiez si les projets générés sont compilés.`)
};

/**
* | output |
* | --- |
* | "Reproduce the ScaffBench benchmark locally: clone the harness, point it at any agent CLI or an API key, and score whether the generated projects build." |
*
* @param {Runseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runseodescription2 = /** @type {((inputs?: Runseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runseodescription2(inputs)
	if (locale === "es") return es_runseodescription2(inputs)
	if (locale === "zh") return zh_runseodescription2(inputs)
	if (locale === "ja") return ja_runseodescription2(inputs)
	if (locale === "ko") return ko_runseodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runseodescription2(inputs)
	if (locale === "de") return de_runseodescription2(inputs)
	return fr_runseodescription2(inputs)
});
export { runseodescription2 as "runSeoDescription" }