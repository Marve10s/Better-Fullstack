/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodsealedbody3Inputs */

const en_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Publishing the tasks would put them in training data and invite tuning to the tests. The statements, repositories and file paths stay private, and the board shows only what can be checked without them.`)
};

const es_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Publicar las tareas las metería en los datos de entrenamiento e invitaría a ajustar los modelos a las pruebas. Las descripciones, los repositorios y las rutas de archivo siguen siendo privados, y la tabla solo muestra lo que se puede comprobar sin ellos.`)
};

const zh_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开这些任务会让它们进入训练数据，也会招来针对测试的调优。描述、仓库和文件路径都保持私有，榜单只展示不依赖它们也能核实的内容。`)
};

const ja_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクを公開すれば学習データに入り、テストに合わせた調整を招きます。説明、リポジトリ、ファイルパスは非公開のままにし、ボードにはそれらなしで確認できることだけを表示します。`)
};

const ko_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크를 공개하면 학습 데이터에 들어가고 테스트에 맞춘 튜닝을 부릅니다. 설명과 저장소, 파일 경로는 비공개로 두고, 보드에는 그것들 없이도 확인할 수 있는 것만 보여 줍니다.`)
};

const zh_hant1_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公開這些任務會讓它們進入訓練資料，也會招來針對測試的調校。描述、倉庫和檔案路徑都保持私有，榜單只展示不依賴它們也能核實的內容。`)
};

const de_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Würden die Aufgaben veröffentlicht, landeten sie in Trainingsdaten und lüden dazu ein, auf die Tests hin zu optimieren. Die Beschreibungen, Repositories und Dateipfade bleiben privat, und die Rangliste zeigt nur, was sich ohne sie prüfen lässt.`)
};

const fr_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Publier les tâches les ferait entrer dans les données d'entraînement et inviterait à optimiser pour les tests. Les énoncés, les dépôts et les chemins de fichiers restent privés, et le tableau ne montre que ce qui peut être vérifié sans eux.`)
};

const uk_fixproofmethodsealedbody3 = /** @type {(inputs: Fixproofmethodsealedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Публікація задач відправила б їх у тренувальні дані й заохотила б підлаштовуватися під тести. Описи, репозиторії та шляхи до файлів лишаються приватними, а таблиця показує лише те, що можна перевірити без них.`)
};

/**
* | output |
* | --- |
* | "Publishing the tasks would put them in training data and invite tuning to the tests. The statements, repositories and file paths stay private, and the board ..." |
*
* @param {Fixproofmethodsealedbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodsealedbody3 = /** @type {((inputs?: Fixproofmethodsealedbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodsealedbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodsealedbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodsealedbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodsealedbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodsealedbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodsealedbody3(inputs)
	if (locale === "de") return de_fixproofmethodsealedbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodsealedbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodsealedbody3(inputs)
	return en_fixproofmethodsealedbody3(inputs)
});
export { fixproofmethodsealedbody3 as "fixproofMethodSealedBody" }