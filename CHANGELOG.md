# Changelog

## [14.13.0](https://github.com/mljs/spectra-processing/compare/v14.12.0...v14.13.0) (2025-07-09)


### Features

* implement reimZeroFilling function ([#306](https://github.com/mljs/spectra-processing/issues/306)) ([9f02d91](https://github.com/mljs/spectra-processing/commit/9f02d9130e243e4948c718931e26771df7d1105e))


### Bug Fixes

* remove non-existent "zone" export ([#308](https://github.com/mljs/spectra-processing/issues/308)) ([d1d5777](https://github.com/mljs/spectra-processing/commit/d1d57776170777bcb5c79f924efff523f16720a7))

## [14.12.0](https://github.com/mljs/spectra-processing/compare/v14.11.0...v14.12.0) (2025-04-27)


### Features

* add xRemoveOutliersIQR ([b9c1166](https://github.com/mljs/spectra-processing/commit/b9c1166521d74b7a22a030512c63ded8d1172fbf))
* add xRobustDistributionStats ([2173ee8](https://github.com/mljs/spectra-processing/commit/2173ee867997fcf5d775024a747f4df0134634c7))
* xDistributionStats deals with outliers ([0c5ff63](https://github.com/mljs/spectra-processing/commit/0c5ff63ff5456289e70fed1ae7072de2850aa3c7))


### Bug Fixes

* xBoxPlotWithOutliers calculate more parameters and fix min / max values ([d6eebd7](https://github.com/mljs/spectra-processing/commit/d6eebd76b3860833b4ffc75db8449756529ee99a))

## [14.11.0](https://github.com/mljs/spectra-processing/compare/v14.10.0...v14.11.0) (2025-04-12)


### Features

* add xDistributionStats ([3a51a97](https://github.com/mljs/spectra-processing/commit/3a51a971f6cee7bb2bedf45161c6edd867fd265e))


### Bug Fixes

* xBoxPlot implement consistently inclusive interpolate algorithm ([2ef1edb](https://github.com/mljs/spectra-processing/commit/2ef1edb3f9dd6ae4475fff8abb399635129469a2))

## [14.10.0](https://github.com/mljs/spectra-processing/compare/v14.9.2...v14.10.0) (2025-02-27)


### Features

* add matrixGetSubMatrix function ([#236](https://github.com/mljs/spectra-processing/issues/236)) ([ab8f02a](https://github.com/mljs/spectra-processing/commit/ab8f02a7049109fc6d2076ddd97ebc016ad385e2))
* add option to get exact xMedian ([d98821b](https://github.com/mljs/spectra-processing/commit/d98821b602262b3d6980f4d621fba9e1081c658f))
* add sparse cholesky solver and cuthill-mckee ([8c9e233](https://github.com/mljs/spectra-processing/commit/8c9e233e51038690decbb432a816f48f4c6110b6))
* add utilities to build a weighted least squared fit/smooth of 1D data ([8c9e233](https://github.com/mljs/spectra-processing/commit/8c9e233e51038690decbb432a816f48f4c6110b6))
* add xWhitakerSmoother ([8c9e233](https://github.com/mljs/spectra-processing/commit/8c9e233e51038690decbb432a816f48f4c6110b6))
* implement Whitaker smoother and all the utilities to be used outside ([#292](https://github.com/mljs/spectra-processing/issues/292)) ([8c9e233](https://github.com/mljs/spectra-processing/commit/8c9e233e51038690decbb432a816f48f4c6110b6))


### Bug Fixes

* improve speed in hilbert transform by FFT ([#284](https://github.com/mljs/spectra-processing/issues/284)) ([fc7dfd6](https://github.com/mljs/spectra-processing/commit/fc7dfd6b856e3f9e9c2006e4367cc9f928413417))
* **xNoiseSanplot:** use analytical expression for Raylegh inverse CDF ([#289](https://github.com/mljs/spectra-processing/issues/289)) ([bd9dc3e](https://github.com/mljs/spectra-processing/commit/bd9dc3e716f0722a0bb4e222840e418cd905df55))

## [14.9.2](https://github.com/mljs/spectra-processing/compare/v14.9.1...v14.9.2) (2025-02-04)


### Bug Fixes

* remove circular dependency ([8698ea8](https://github.com/mljs/spectra-processing/commit/8698ea8aa5a6f6a0007d25ad2c537673a6d3caf6))

## [14.9.1](https://github.com/mljs/spectra-processing/compare/v14.9.0...v14.9.1) (2024-12-19)


### Bug Fixes

* use thenable in recursiveResolve ([#282](https://github.com/mljs/spectra-processing/issues/282)) ([a675766](https://github.com/mljs/spectra-processing/commit/a67576664236b9feb3b1bf6c0798c2f99df7a68f))

## [14.9.0](https://github.com/mljs/spectra-processing/compare/v14.8.0...v14.9.0) (2024-12-16)


### Features

* add xyObjectMinMaxValues function ([#279](https://github.com/mljs/spectra-processing/issues/279)) ([dd09ee3](https://github.com/mljs/spectra-processing/commit/dd09ee3cab362b68cdaafeb2e9edbb9ec0d08c54))

## [14.8.0](https://github.com/mljs/spectra-processing/compare/v14.7.0...v14.8.0) (2024-12-05)


### Features

* add recursiveResolve ([#274](https://github.com/mljs/spectra-processing/issues/274)) ([9005fc2](https://github.com/mljs/spectra-processing/commit/9005fc2f5222c3c96ee3b67ca8134690185d33ae))

## [14.7.0](https://github.com/mljs/spectra-processing/compare/v14.6.2...v14.7.0) (2024-11-22)


### Features

* add xyReduceNonContinuous ([22a6640](https://github.com/mljs/spectra-processing/commit/22a6640a11dc518c8e02d7b973ec71da9247f688))

## [14.6.2](https://github.com/mljs/spectra-processing/compare/v14.6.1...v14.6.2) (2024-11-12)


### Bug Fixes

* xyGrowingX bug ([#268](https://github.com/mljs/spectra-processing/issues/268)) ([bb00293](https://github.com/mljs/spectra-processing/commit/bb0029302a15371c1d676e9c164247f7fdc89683))

## [14.6.1](https://github.com/mljs/spectra-processing/compare/v14.6.0...v14.6.1) (2024-11-03)


### Bug Fixes

* add CITATION.cff ([#265](https://github.com/mljs/spectra-processing/issues/265)) ([fc43a05](https://github.com/mljs/spectra-processing/commit/fc43a0541f6ef9e4f8c47e11dc091f4f2de03308))
* check first and last point for xyGrowingX ([#264](https://github.com/mljs/spectra-processing/issues/264)) ([e5a832f](https://github.com/mljs/spectra-processing/commit/e5a832f3a0f554bfde13c9780fc942920eb85425))

## [14.6.0](https://github.com/mljs/spectra-processing/compare/v14.5.3...v14.6.0) (2024-10-09)


### Features

* add xBoxPlotWithOutliers mehtod to deal with possible outliers ([#260](https://github.com/mljs/spectra-processing/issues/260)) ([985caee](https://github.com/mljs/spectra-processing/commit/985caeef2e4ea0a4b5fbfa5e04be503a3c42e403))
* xBoxPlot has an option to calculate outliers ([#256](https://github.com/mljs/spectra-processing/issues/256)) ([69cb82c](https://github.com/mljs/spectra-processing/commit/69cb82cf039fc56f04f2c17fe91d372c17c5c205))


### Bug Fixes

* **auto phase:** avoid NaN phase correction value ([#262](https://github.com/mljs/spectra-processing/issues/262)) ([eef13cd](https://github.com/mljs/spectra-processing/commit/eef13cd8798237de40cb654a3c1c2414099ab2f2))

## [14.5.3](https://github.com/mljs/spectra-processing/compare/v14.5.2...v14.5.3) (2024-07-30)


### Bug Fixes

* remove unused variable assignment ([#253](https://github.com/mljs/spectra-processing/issues/253)) ([b155cd5](https://github.com/mljs/spectra-processing/commit/b155cd5d45c59a68d260087c60c5510c83ff2232))

## [14.5.2](https://github.com/mljs/spectra-processing/compare/v14.5.1...v14.5.2) (2024-07-30)


### Bug Fixes

* remove zone if no points in xyEquallySpaced ([443887f](https://github.com/mljs/spectra-processing/commit/443887ffbe9f9bd2b923bc2ff810405c19bf2b33))

## [14.5.1](https://github.com/mljs/spectra-processing/compare/v14.5.0...v14.5.1) (2024-06-20)


### Bug Fixes

* **xySortX:** avoid NaN results when X is a typedArray ([#249](https://github.com/mljs/spectra-processing/issues/249)) ([af7ca47](https://github.com/mljs/spectra-processing/commit/af7ca47921ef34c936cc970db625079a25abf6a7))

## [14.5.0](https://github.com/mljs/spectra-processing/compare/v14.4.0...v14.5.0) (2024-05-02)


### Features

* add xAbsoluteSum method ([#245](https://github.com/mljs/spectra-processing/issues/245)) ([bd46796](https://github.com/mljs/spectra-processing/commit/bd4679631b33be189255ee64b5cf18fff38efb2b))

## [14.4.0](https://github.com/mljs/spectra-processing/compare/v14.3.0...v14.4.0) (2024-05-01)


### Features

* allow from / to in xyMaximaY and xyMinimaY ([#243](https://github.com/mljs/spectra-processing/issues/243)) ([d19683d](https://github.com/mljs/spectra-processing/commit/d19683da68736d2fe7e6565688139542056d58bb))

## [14.3.0](https://github.com/mljs/spectra-processing/compare/v14.2.2...v14.3.0) (2024-04-10)


### Features

* add xyMassCenter ([#239](https://github.com/mljs/spectra-processing/issues/239)) ([86b48ef](https://github.com/mljs/spectra-processing/commit/86b48efcb8feeadf2fc9bf98e85e38459056b162))


### Bug Fixes

* xyIntegralOptions extends xyIntegrationOptions ([#234](https://github.com/mljs/spectra-processing/issues/234)) ([3b85a72](https://github.com/mljs/spectra-processing/commit/3b85a72ac198a49638383ad65321b1305f3b74a9))

## [14.2.2](https://github.com/mljs/spectra-processing/compare/v14.2.1...v14.2.2) (2024-03-12)


### Bug Fixes

* improve types regarding arrays ([#231](https://github.com/mljs/spectra-processing/issues/231)) ([5cd995e](https://github.com/mljs/spectra-processing/commit/5cd995e9226968d0a117761921a9d50262ac70c0))

## [14.2.1](https://github.com/mljs/spectra-processing/compare/v14.2.0...v14.2.1) (2024-03-07)


### Bug Fixes

* options type of xyIntegration ([c798c18](https://github.com/mljs/spectra-processing/commit/c798c189c78f760c8c08d3289b0f8b4dd21ad59f))

## [14.2.0](https://github.com/mljs/spectra-processing/compare/v14.1.1...v14.2.0) (2024-03-07)


### Features

* matrixZPivotRescale and matrixZPivotRescale can use any NumberArrayConstructors ([28ab4a4](https://github.com/mljs/spectra-processing/commit/28ab4a42a5300b67b8d6c71ae1d910125a5f02b8))

## [14.1.1](https://github.com/mljs/spectra-processing/compare/v14.1.0...v14.1.1) (2024-03-06)


### Bug Fixes

* expose xyEnsureFloat64 ([#226](https://github.com/mljs/spectra-processing/issues/226)) ([2260f3c](https://github.com/mljs/spectra-processing/commit/2260f3cdc6143e7306e9e2fff04271ef5824eef2))

## [14.1.0](https://github.com/mljs/spectra-processing/compare/v14.0.0...v14.1.0) (2024-03-06)


### Features

* add xyEnsureFloat64 function ([#224](https://github.com/mljs/spectra-processing/issues/224)) ([467a03a](https://github.com/mljs/spectra-processing/commit/467a03a2aa55fe0c0b941613db519fedc95186f2))

## [14.0.0](https://github.com/mljs/spectra-processing/compare/v13.0.1...v14.0.0) (2024-03-04)


### ⚠ BREAKING CHANGES

* remove xSequentialFill and add 2 methods xSequentialFillFromStep and xSequentialFillFromTo

### Features

* add utility stringify that converts typed array to nomal array ([5cac645](https://github.com/mljs/spectra-processing/commit/5cac64531ea77ee0b204c60eaca315a98e3c2c74))
* remove xSequentialFill and add 2 methods xSequentialFillFromStep and xSequentialFillFromTo ([42d1c39](https://github.com/mljs/spectra-processing/commit/42d1c39cb889ec29c5e15c814786b0dc2cd28139))
* use an object for parameters in xSequentialFillFromStep and xSequentialFillFromTo ([#223](https://github.com/mljs/spectra-processing/issues/223)) ([69e6897](https://github.com/mljs/spectra-processing/commit/69e689763219e94cdc929f03fe6e5f2b55f42667))


### Documentation

* specify default value of ArrayConstructor ([11ee134](https://github.com/mljs/spectra-processing/commit/11ee134cc8f94a1dcdeff926ff69e096b70196f4))

## [13.0.1](https://github.com/mljs/spectra-processing/compare/v13.0.0...v13.0.1) (2024-02-27)


### Bug Fixes

* return type definition of xSequentialFill ([220f6ce](https://github.com/mljs/spectra-processing/commit/220f6ce69fb0caaba131d26f1899de7b14ce5ce6))
* xMassCenterVectorSimilarity was changing in place the arrays ([3918530](https://github.com/mljs/spectra-processing/commit/39185307f740bad3f0b30a3b7a318029623092c2))

## [13.0.0](https://github.com/mljs/spectra-processing/compare/v12.11.0...v13.0.0) (2024-02-26)


### ⚠ BREAKING CHANGES

* improve types in zones functions
* remove deprecated zoneToX function
* improve types in xyObject functions
* improve types in xyArray functions
* improve types in xy functions
* improve types in x functions
* improve types in utils functions
* improve types in xreim functions
* improve types in reim functions
* improve types in matrix functions

### Bug Fixes

* improve types in matrix functions ([1918fc8](https://github.com/mljs/spectra-processing/commit/1918fc850e4472a01c38d13b64d6b84103dfae57))
* improve types in reim functions ([24a6285](https://github.com/mljs/spectra-processing/commit/24a6285f9a7378aa7e14bc3a9b01d457d5ad905d))
* improve types in utils functions ([7476f47](https://github.com/mljs/spectra-processing/commit/7476f476fe7596f1008cf4528209765fc7048bee))
* improve types in x functions ([bf5886e](https://github.com/mljs/spectra-processing/commit/bf5886ecde7b5995d40096c20cb5d8bba268b4b9))
* improve types in xreim functions ([b6257b5](https://github.com/mljs/spectra-processing/commit/b6257b571990bcfee275bcf3b28884982fc72a16))
* improve types in xy functions ([5c4a68f](https://github.com/mljs/spectra-processing/commit/5c4a68ff92193e19ab34ccbd171bd3514e965579))
* improve types in xyArray functions ([018b825](https://github.com/mljs/spectra-processing/commit/018b82506b729339e15d622c434103e33dafca05))
* improve types in xyObject functions ([5f0f88b](https://github.com/mljs/spectra-processing/commit/5f0f88b0a3003be0398767f2f1bc879f708cae94))
* improve types in zones functions ([3c72b05](https://github.com/mljs/spectra-processing/commit/3c72b05feb6eb005b7e24f93c772e5aef3db748c))


### Code Refactoring

* remove deprecated zoneToX function ([034d68a](https://github.com/mljs/spectra-processing/commit/034d68ae467f06d28772173b078803f28eec5389))

## [12.11.0](https://github.com/mljs/spectra-processing/compare/v12.10.2...v12.11.0) (2024-02-20)


### Features

* add xyMassCenterVector ([18b314b](https://github.com/mljs/spectra-processing/commit/18b314bdf80a89f6e61c48d0cd671424bb0d37ce))
* new function to calculate similarity between massCenter vectors ([05402c7](https://github.com/mljs/spectra-processing/commit/05402c78feefac9a14dfceb3851a45c3aa95cc02))

## [12.10.2](https://github.com/mljs/spectra-processing/compare/v12.10.1...v12.10.2) (2024-02-06)


### Bug Fixes

* zonesNormalize could not deal with larges arrays ([905ce05](https://github.com/mljs/spectra-processing/commit/905ce05d1ee2cea15aa2f86d566215fd89e0ceb4))

## [12.10.1](https://github.com/mljs/spectra-processing/compare/v12.10.0...v12.10.1) (2024-01-26)


### Bug Fixes

* expose matrixSetSubMatrix ([#213](https://github.com/mljs/spectra-processing/issues/213)) ([132206f](https://github.com/mljs/spectra-processing/commit/132206fbaa77ff16a35d4515a1e74ce253ed493a))

## [12.10.0](https://github.com/mljs/spectra-processing/compare/v12.9.0...v12.10.0) (2024-01-26)


### Features

* add matrixSetSubMatrix ([#211](https://github.com/mljs/spectra-processing/issues/211)) ([922e2cc](https://github.com/mljs/spectra-processing/commit/922e2ccffb9c92fd39331eee574eaf236cec9572))

## [12.9.0](https://github.com/mljs/spectra-processing/compare/v12.8.0...v12.9.0) (2024-01-23)


### Features

* add option that allows to calculate xBoxPlot on small arrays ([960da81](https://github.com/mljs/spectra-processing/commit/960da81ffa4404b532303ae5488a82e0982fb5ff))
* Allow xHilbertTransform to use FFT for array lengths non power of 2 through and option ([#203](https://github.com/mljs/spectra-processing/issues/203)) ([14c0dde](https://github.com/mljs/spectra-processing/commit/14c0ddeecb8af069f98db44a54465c9f05edf5a2))
* Allow xHilbertTransform to use FFT for array lengths non power of 2 through and option ([#203](https://github.com/mljs/spectra-processing/issues/203)) ([14c0dde](https://github.com/mljs/spectra-processing/commit/14c0ddeecb8af069f98db44a54465c9f05edf5a2)), closes [#202](https://github.com/mljs/spectra-processing/issues/202)

## [12.8.0](https://github.com/mljs/spectra-processing/compare/v12.7.0...v12.8.0) (2023-12-04)


### Features

* avoid data cloning in xSampling ([6c2a8bb](https://github.com/mljs/spectra-processing/commit/6c2a8bbb48c20054836e1f6da121602b53038b22))
* implement resampling within xSampling to handle array lengths larger than the original size ([#200](https://github.com/mljs/spectra-processing/issues/200)) ([fdeca70](https://github.com/mljs/spectra-processing/commit/fdeca70ef5452ac7cb89044aa906c1b0929aab09))


### Bug Fixes

* improve reimautophasecorrection by removing outliers ([#206](https://github.com/mljs/spectra-processing/issues/206)) ([7b00d93](https://github.com/mljs/spectra-processing/commit/7b00d93b7c3eeade9f6ac4895900808f34e46b6c))
* xSampling when the ratio originalLength finalLength is not an integer ([041c639](https://github.com/mljs/spectra-processing/commit/041c639127a4f9fb467556cb8b203186b05482ed))

## [12.7.0](https://github.com/mljs/spectra-processing/compare/v12.6.0...v12.7.0) (2023-11-23)


### Features

* add utilities isPowerOfTwo and nextPowerOfTwo ([bec701a](https://github.com/mljs/spectra-processing/commit/bec701a88d851ea6e95fa3792197ac764a729c4f))
* enable FFT for xHilbertTransform to enhance speed for arrays with lengths that are powers of 2 ([#198](https://github.com/mljs/spectra-processing/issues/198)) ([e5677a7](https://github.com/mljs/spectra-processing/commit/e5677a7c7805f463b4efaa6c2bf28e769444ee7a))

## [12.6.0](https://github.com/mljs/spectra-processing/compare/v12.5.1...v12.6.0) (2023-10-13)


### Features

* create xyFilter ([223f6f3](https://github.com/mljs/spectra-processing/commit/223f6f3cd2b29e3c7d2bb19604c007279212bf78))

## [12.5.1](https://github.com/mljs/spectra-processing/compare/v12.5.0...v12.5.1) (2023-09-14)


### Bug Fixes

* add remove main, module and types properties in package.json ([af6757e](https://github.com/mljs/spectra-processing/commit/af6757ea77782398974fff3b7952b5a3bcd6bfee))

## [12.5.0](https://github.com/mljs/spectra-processing/compare/v12.4.0...v12.5.0) (2023-06-23)


### Features

* add getRecaler with clamping ([95c1e74](https://github.com/mljs/spectra-processing/commit/95c1e74257e0600cd03ff651f4a4104de6441271))
* add more getRescaler algorithms ([6f1b5de](https://github.com/mljs/spectra-processing/commit/6f1b5de12cad21a9cffcc5f807ea8c206444f9f0))

## [12.4.0](https://github.com/mljs/spectra-processing/compare/v12.3.0...v12.4.0) (2023-05-05)


### Features

* expoe in package.json the different folders ([cb0025b](https://github.com/mljs/spectra-processing/commit/cb0025b8190e1fcb2a67a25b42d3438b3443e4dd))
* expose xCostMatrix ([dccc9ba](https://github.com/mljs/spectra-processing/commit/dccc9bae7521dcd15f29af2051989cf62f0d9fb4))


### Bug Fixes

* correct eslint problems ([f631198](https://github.com/mljs/spectra-processing/commit/f631198a126fe9ce23c941df091395317314d26d))

## [12.3.0](https://github.com/mljs/spectra-processing/compare/v12.2.0...v12.3.0) (2023-04-26)


### Features

* added reverse option to autoPhaseCorrection ([#186](https://github.com/mljs/spectra-processing/issues/186)) ([3970d65](https://github.com/mljs/spectra-processing/commit/3970d654f0287a61326b7c1afeb63a32ab8226d4))

## [12.2.0](https://github.com/mljs/spectra-processing/compare/v12.1.0...v12.2.0) (2023-04-25)


### Features

* add reverse to reimPhaseCorrection ([#183](https://github.com/mljs/spectra-processing/issues/183)) ([daed2d7](https://github.com/mljs/spectra-processing/commit/daed2d7d4b5312038508694b30a2c9736c31cd15))

## [12.1.0](https://github.com/mljs/spectra-processing/compare/v12.0.0...v12.1.0) (2023-04-03)


### Features

* add xVariance ([b1ae447](https://github.com/mljs/spectra-processing/commit/b1ae44737d6f177eaf4638b33ccd22e55881acf0))


### Bug Fixes

* xyCovariance unbiased type ([0e0361b](https://github.com/mljs/spectra-processing/commit/0e0361bab81e8a12c700b4429e468f92182370ad))

## [12.0.0](https://github.com/mljs/spectra-processing/compare/v11.17.0...v12.0.0) (2023-02-17)


### ⚠ BREAKING CHANGES

* remove xIsMonotone and xIsMonotoneIncreasing
    - remove xIsMonotone, should be replace by xIsMonotonic
    - remove xIsMonotoneIncreasing, xIsMonotonic should return 1

### Features

* add xIsMonotonic that returns -1, 0 or 1 ([c672db1](https://github.com/mljs/spectra-processing/commit/c672db1bb17b35a7a66aa82221846d79826b0553))
* xyArrayAlign is able to filter result to have a Y value ([a0c9496](https://github.com/mljs/spectra-processing/commit/a0c94968122ece243a6a651433e0d047a0c06070))

## [11.17.0](https://github.com/mljs/spectra-processing/compare/v11.16.0...v11.17.0) (2023-02-14)


### Features

* add xMinMaxDelta ([b142519](https://github.com/mljs/spectra-processing/commit/b142519a295c88d8a0b3d7de9419f484eddb102d))
* implement xMeanWeighted ([#178](https://github.com/mljs/spectra-processing/issues/178)) ([686d804](https://github.com/mljs/spectra-processing/commit/686d80475a4f2aa07466fe511bf8a5a4986a9844))
* xCheck as a minLength ([231ca46](https://github.com/mljs/spectra-processing/commit/231ca46a8e5e0b96d932bd9ec607eb705e05ffa8))

## [11.16.0](https://github.com/mljs/spectra-processing/compare/v11.15.0...v11.16.0) (2023-02-07)


### Features

* add xy2ToXY ([6bf49a5](https://github.com/mljs/spectra-processing/commit/6bf49a566cfae65cb246652cc9e3fd198e4fc2b1))

## [11.15.0](https://github.com/mljs/spectra-processing/compare/v11.14.0...v11.15.0) (2022-12-19)


### Features

* add xyFilterMinYValue ([5845edd](https://github.com/mljs/spectra-processing/commit/5845edd2c8d07256f01b0339ba3e1459f63fb7b3))
* add xyFilterTopYValues ([7570091](https://github.com/mljs/spectra-processing/commit/7570091ef091c49856dd88f2b17f88d8bcfe9fc2))

## [11.14.0](https://github.com/mljs/spectra-processing/compare/v11.13.1...v11.14.0) (2022-11-10)


### Features

* add matrixAutoCorrelation ([#173](https://github.com/mljs/spectra-processing/issues/173)) ([a7cda65](https://github.com/mljs/spectra-processing/commit/a7cda65a95ce6106913d40a2b6e0be5c1af8bd7c))
* add matrixBoxPlot ([#171](https://github.com/mljs/spectra-processing/issues/171)) ([a474793](https://github.com/mljs/spectra-processing/commit/a474793ffc37eef0cc9d6e0e1288d16fac2d1897))

## [11.13.1](https://github.com/mljs/spectra-processing/compare/v11.13.0...v11.13.1) (2022-11-08)


### Bug Fixes

* correctly export hilbertTransform as xHilbertTransform ([e0a80ef](https://github.com/mljs/spectra-processing/commit/e0a80ef17d9f971f8f398fffa5668e804831f004))
* xApplyFunctionStr did not accept functions ([8b6dca3](https://github.com/mljs/spectra-processing/commit/8b6dca3c71be6c379899ed0e002eb214a4d09f5c))

## [11.13.0](https://github.com/mljs/spectra-processing/compare/v11.12.0...v11.13.0) (2022-10-04)


### Features

* add xHilbertTransform ([9521510](https://github.com/mljs/spectra-processing/commit/9521510a9087de4e38f0ff4a5f3a671ee22ae351))

## [11.12.0](https://github.com/mljs/spectra-processing/compare/v11.11.0...v11.12.0) (2022-07-29)


### Features

* add matrixAbsoluteMedian ([a7a77b0](https://github.com/mljs/spectra-processing/commit/a7a77b01b854a9a1905956a3c065379fee8a2a64))

## [11.11.0](https://github.com/mljs/spectra-processing/compare/v11.10.0...v11.11.0) (2022-07-28)


### Features

* add xMaxAbsoluteValue ([d173542](https://github.com/mljs/spectra-processing/commit/d173542e2694d25b00583ff809f670319d8a88fd))

## [11.10.0](https://github.com/mljs/spectra-processing/compare/v11.9.0...v11.10.0) (2022-07-28)


### Features

* add matrixMedian ([#157](https://github.com/mljs/spectra-processing/issues/157)) ([4ce1b72](https://github.com/mljs/spectra-processing/commit/4ce1b726a9c49d723add5e5fcf92549b1ba472b6))
* add matrixToArray and matrixNoiseStandardDeviation ([ead7b21](https://github.com/mljs/spectra-processing/commit/ead7b218466c4cad87c800e602804662916fd8b5))

## [11.9.0](https://github.com/mljs/spectra-processing/compare/v11.8.0...v11.9.0) (2022-07-20)


### Features

* allows to specify the array target type for matrixZRescale ([3e8a39d](https://github.com/mljs/spectra-processing/commit/3e8a39dae0895fdb5237f771321f7f2700bac65e))

## [11.8.0](https://github.com/mljs/spectra-processing/compare/v11.7.0...v11.8.0) (2022-07-20)


### Features

* add matrixMaxAbsoluteZ ([c8ae9c0](https://github.com/mljs/spectra-processing/commit/c8ae9c0e7a64242a8643f429246ede9108374fd7))
* add matrixZPivotRescale ([784ab2e](https://github.com/mljs/spectra-processing/commit/784ab2eade4300c9b50f9a55cb1a99248a231bc2))


### Bug Fixes

* rename matrixZRescale to matrixZRescalePerColumn ([377300c](https://github.com/mljs/spectra-processing/commit/377300cd75ebbc65237c3d9a1659cc7852220e1c))

## [11.7.0](https://github.com/mljs/spectra-processing/compare/v11.6.0...v11.7.0) (2022-06-07)


### Features

* add xCostMatrix function ([#151](https://github.com/mljs/spectra-processing/issues/151)) ([fd88754](https://github.com/mljs/spectra-processing/commit/fd88754ae487efca6772265cfdb2a97d149c1c6d))

## [11.6.0](https://github.com/mljs/spectra-processing/compare/v11.5.0...v11.6.0) (2022-05-06)


### Features

* xBoxPlot returns an object with better named properties ([125a4cc](https://github.com/mljs/spectra-processing/commit/125a4cc8b05c0862f0d775a5f8a7882f64f81bf2))


### Bug Fixes

* update dependencies and fix cyclic dependencies ([f8c2445](https://github.com/mljs/spectra-processing/commit/f8c24454bee6f380cce3274bfab2f0837c3cbc62))

## [11.5.0](https://github.com/mljs/spectra-processing/compare/v11.4.0...v11.5.0) (2022-04-27)


### Features

* add xApplyFunctionStr ([e9e13fd](https://github.com/mljs/spectra-processing/commit/e9e13fdf493bb18b3589c6e4d49673055070839d))


### Bug Fixes

* xNormed use as options value instead of sum / max ([a9d1cbe](https://github.com/mljs/spectra-processing/commit/a9d1cbe637559d260f246b21e057113d32cce997))

## [11.4.0](https://github.com/mljs/spectra-processing/compare/v11.3.0...v11.4.0) (2022-04-11)


### Features

* refactor zonesNormalize and remove zonesInvert and getZones ([0236bbf](https://github.com/mljs/spectra-processing/commit/0236bbfe135c03b5ec4586a70cbad8722b55ff8b))
* xyEquallySpaced must be growing ! Throw error if not ([8221a2f](https://github.com/mljs/spectra-processing/commit/8221a2fdecb6604ec4f7f0e7e4b2bea1777e8394))


### Bug Fixes

* Remove Zone interface (that should be FromTo) ([a389f30](https://github.com/mljs/spectra-processing/commit/a389f30389ec382edc49ea93f200fde416acfdc5))
* specify variant possibilities ([7b22eb1](https://github.com/mljs/spectra-processing/commit/7b22eb13e1f6ce2656070e481e6b866c153bc417))

## [11.3.0](https://github.com/mljs/spectra-processing/compare/v11.2.0...v11.3.0) (2022-04-06)


### Features

* remove autoMinMax from xRescale ([ddad5ae](https://github.com/mljs/spectra-processing/commit/ddad5aeefcdbfb60e4c9689520bd1c497211d024))

## [11.2.0](https://github.com/mljs/spectra-processing/compare/v11.1.0...v11.2.0) (2022-04-01)


### Features

* xFindClosestIndex accepts a NumberArray ([4c10bc7](https://github.com/mljs/spectra-processing/commit/4c10bc73580dac0554af54cfd878525582f87024))
* xGetFromToIndex accepts a NumberArray ([c2acea7](https://github.com/mljs/spectra-processing/commit/c2acea7c0453ce3020d823abcfba08aeb1dcb14b))
* xMaxValue, xMinValue and xSum allow to specify from and to ([5e7212a](https://github.com/mljs/spectra-processing/commit/5e7212a939fb62676c315dd2c8f5651e3c95bd21))
* xMean allows to specify from and to ([4141d0f](https://github.com/mljs/spectra-processing/commit/4141d0f62815b9057ced8deac8067664f4cf290e))


### Bug Fixes

* xMean gives correct result if fromIndex or toIndex outside range ([4141d0f](https://github.com/mljs/spectra-processing/commit/4141d0f62815b9057ced8deac8067664f4cf290e))

## [11.1.0](https://github.com/mljs/spectra-processing/compare/v11.0.0...v11.1.0) (2022-03-23)


### Features

* add xEnsureFloat64 ([cc58e79](https://github.com/mljs/spectra-processing/commit/cc58e7919b9e74c8ad248ef1630d08f375e6e945))
* rename xyClosestX to xyFindClosestPoint and only allow sorted array ([2b439f8](https://github.com/mljs/spectra-processing/commit/2b439f8141c4d7869b0bac96101829c2cb8ec8a9))

## [11.0.0](https://www.github.com/mljs/spectra-processing/compare/v10.3.0...v11.0.0) (2022-02-25)


### ⚠ BREAKING CHANGES

* xNormed throws an error if divide by 0

### Features

* improve xDive, xMultiply, xRescale for typescript return value ([e90f3b2](https://www.github.com/mljs/spectra-processing/commit/e90f3b26f0f8576d49292abd7b2fa536114e8b9b))
* xNormed throws an error if divide by 0 ([7976466](https://www.github.com/mljs/spectra-processing/commit/79764667d07cef004bb687805a201d035a882ed5))

## [10.3.0](https://www.github.com/mljs/spectra-processing/compare/v10.2.0...v10.3.0) (2022-02-23)


### Features

* expose xCheck ([3fe1914](https://www.github.com/mljs/spectra-processing/commit/3fe1914c1211254c27c92e2b4cce4f4541605e8a))
* xDivide and xMultiply allow have output parameter ([0bd78dd](https://www.github.com/mljs/spectra-processing/commit/0bd78dd732dbfafcce58be3eef71db3f0e8e1b5e))
* xRescale and xNormed returns typed array ([20eadc0](https://www.github.com/mljs/spectra-processing/commit/20eadc03dd1da59dc17fc29e8baa046db760001b))

## [10.2.0](https://www.github.com/mljs/spectra-processing/compare/v10.1.2...v10.2.0) (2022-02-21)


### Features

* default seed for createRandomArray is Date.now() ([67ef5d9](https://www.github.com/mljs/spectra-processing/commit/67ef5d9fd10df5e70e06c78501f168864132974c))


### Bug Fixes

* matrixMinMaxZ returns always min and max as numbers ([a68fe87](https://www.github.com/mljs/spectra-processing/commit/a68fe879ab0660acb8d12f2b7ba3625bae17a956))

### [10.1.2](https://www.github.com/mljs/spectra-processing/compare/v10.1.1...v10.1.2) (2022-02-15)


### Bug Fixes

* throw error in null matrix for matrixMinMaxZ and matrixMinMaxAbsoluteZ ([fd1d921](https://www.github.com/mljs/spectra-processing/commit/fd1d921ba835340f926effc61a105f9482888688))

### [10.1.1](https://www.github.com/mljs/spectra-processing/compare/v10.1.0...v10.1.1) (2022-02-15)


### Bug Fixes

* don't use MIN_VALUE in xyReduce ([edafc19](https://www.github.com/mljs/spectra-processing/commit/edafc19178d7a90095796bbe92f4a1ad89cd0a20))
* don't use Number.MIN_VALUE in xyObjectSlotX ([c364d4c](https://www.github.com/mljs/spectra-processing/commit/c364d4c73003e674099b99413066423fe3ba1d7b))
* Normalize small zones that combined into one zone ([#132](https://www.github.com/mljs/spectra-processing/issues/132)) ([91225c5](https://www.github.com/mljs/spectra-processing/commit/91225c552b6ffa0886410e4fbcf93ac0fab5ad7a))

## [10.1.0](https://www.github.com/mljs/spectra-processing/compare/v10.0.0...v10.1.0) (2022-02-15)


### Features

* add uniform random array generator and rename createNormalRandomArray to createRandomArray ([adbf2b4](https://www.github.com/mljs/spectra-processing/commit/adbf2b4b06cf6f25575c87e87926d7b4cbb2e3c7))
* xMedianAbsoluteDeviation returns an object with median and mad ([26430ca](https://www.github.com/mljs/spectra-processing/commit/26430ca2233fe1c97a528f1b73b324df238596e4))
* xNoiseStandardDeviation returns now mad, median and sd ([8c7d332](https://www.github.com/mljs/spectra-processing/commit/8c7d3323671e4cf097271be0c5424e493e26810a))


### Bug Fixes

* improve xyEnsureGrowingX ([c8b33d6](https://www.github.com/mljs/spectra-processing/commit/c8b33d6c113e4f202492a72772064896d5827179))

## [10.0.0](https://www.github.com/mljs/spectra-processing/compare/v9.2.0...v10.0.0) (2022-02-14)


### ⚠ BREAKING CHANGES

* rename createXArray to createFromToArray

### Features

* add xIsMonotoneIncreasing ([fd8fb17](https://www.github.com/mljs/spectra-processing/commit/fd8fb174d3d0ad256b17392d9425a8277be5d6f2))
* rename createNormalRandomXArray to createNormalRandomArray ([6d2a40f](https://www.github.com/mljs/spectra-processing/commit/6d2a40f0557ccfef633106e9c0fccef1434d9b1a))
* rename createXArray to createFromToArray ([e9280e2](https://www.github.com/mljs/spectra-processing/commit/e9280e2ccae3842a960b2724aaba286d78415f65))
* rename createXArrayWithStep to createStepArray ([0db5d53](https://www.github.com/mljs/spectra-processing/commit/0db5d536b853e701d83b285f71bf7bc7cebc3b3d))

## [9.2.0](https://www.github.com/mljs/spectra-processing/compare/v9.1.0...v9.2.0) (2022-02-11)


### Features

* add xIsEquallySpaced ([19c182f](https://www.github.com/mljs/spectra-processing/commit/19c182f99e3d76f6dcca8bef80bcd2549663b5e6))
* add xMedianAbsoluteDeviation ([c8d5e38](https://www.github.com/mljs/spectra-processing/commit/c8d5e3811781dc4471caef395648b4df9fe3d65f))
* add xNoiseStandardDeviation ([9baff45](https://www.github.com/mljs/spectra-processing/commit/9baff45e5d33ecb85f519ea7c6ddb1c0bac96cb6))
* Implemented invert.ts, normalize.ts, zonesWithPoints.ts  ([#115](https://www.github.com/mljs/spectra-processing/issues/115)) ([4599613](https://www.github.com/mljs/spectra-processing/commit/4599613903398fe6953b3797a7282d40073fa1a6))

## [9.1.0](https://www.github.com/mljs/spectra-processing/compare/v9.0.0...v9.1.0) (2022-02-03)


### Features

* add xySetYValue ([e047bfd](https://www.github.com/mljs/spectra-processing/commit/e047bfdec7199cb33b5dd32b7512955472854544))

## [9.0.0](https://www.github.com/mljs/spectra-processing/compare/v8.3.1...v9.0.0) (2022-02-01)


### ⚠ BREAKING CHANGES

* added the xSampling and createXArray functions (#112)

### Features

* added the xSampling and createXArray functions ([#112](https://www.github.com/mljs/spectra-processing/issues/112)) ([655c428](https://www.github.com/mljs/spectra-processing/commit/655c428849a258a86ee7c01b4f0a701f493fc446))
* rename createSequentialArray was renamed to createXArray ([655c428](https://www.github.com/mljs/spectra-processing/commit/655c428849a258a86ee7c01b4f0a701f493fc446))

### [8.3.1](https://www.github.com/mljs/spectra-processing/compare/v8.3.0...v8.3.1) (2022-01-26)


### Bug Fixes

* xyIntegral and xyIntegration throw error is length 0 and returns correct value if length=1 ([#110](https://www.github.com/mljs/spectra-processing/issues/110)) ([cdbe86e](https://www.github.com/mljs/spectra-processing/commit/cdbe86efcfdd0a77b3027a8568ba69a388d5e514))

## [8.3.0](https://www.github.com/mljs/spectra-processing/compare/v8.2.0...v8.3.0) (2022-01-25)


### Features

* add xyObjectSumY ([28b709c](https://www.github.com/mljs/spectra-processing/commit/28b709cc0ca29051e7ad58f27ac7aab81c0010fd))

## [8.2.0](https://www.github.com/mljs/spectra-processing/compare/v8.1.0...v8.2.0) (2022-01-24)


### Features

* xyCheck may have the option minLength ([06501df](https://www.github.com/mljs/spectra-processing/commit/06501dfd989cbe1cc799485492bd03271bf67871))


### Bug Fixes

* avoid to return number in xyMaxYPoint and xyMinYPoint (throw error in no elements in array) ([5f9aae3](https://www.github.com/mljs/spectra-processing/commit/5f9aae3e6b959eb77f63b28a52f66fe77bdfe874))
* xGetFromToIndex takes care about the size of the array ([14f10f1](https://www.github.com/mljs/spectra-processing/commit/14f10f1afc747aa47bc2478a47fa643cad969b26))

## [8.1.0](https://www.github.com/mljs/spectra-processing/compare/v8.0.3...v8.1.0) (2022-01-20)


### Features

* added utility functions in order to encode textual features into numerical features  ([#104](https://www.github.com/mljs/spectra-processing/issues/104)) ([d987ac9](https://www.github.com/mljs/spectra-processing/commit/d987ac95488230fab109942a8cd39c751fb08016))

### [8.0.3](https://www.github.com/mljs/spectra-processing/compare/v8.0.2...v8.0.3) (2021-12-15)


### Bug Fixes

* is-any-array is a dependency and not a devDependency ([c7e6510](https://www.github.com/mljs/spectra-processing/commit/c7e651095f5204d968fd403cda16a2b2219dad8e))

### [8.0.2](https://www.github.com/mljs/spectra-processing/compare/v8.0.1...v8.0.2) (2021-12-15)


### Bug Fixes

* correct package.json, spline-interpolator is a dependency ([737eb3e](https://www.github.com/mljs/spectra-processing/commit/737eb3ee63376f648b5458900830260a99d18bdf))

### [8.0.1](https://www.github.com/mljs/spectra-processing/compare/v8.0.0...v8.0.1) (2021-12-15)


### Bug Fixes

* correctly import spline-interpolation and fix xNoiseSanPlot ([474f08c](https://www.github.com/mljs/spectra-processing/commit/474f08c190bb604e8039fedcb0c0ee5ec200b4f8))

## [8.0.0](https://www.github.com/mljs/spectra-processing/compare/v7.0.0...v8.0.0) (2021-12-15)


### ⚠ BREAKING CHANGES

* Remove xyCalibrate

### Miscellaneous Chores

* Remove xyCalibrate ([90d81cb](https://www.github.com/mljs/spectra-processing/commit/90d81cb663abfd48f6c2edae597a0579dc33afac))

## [7.0.0](https://www.github.com/mljs/spectra-processing/compare/v6.8.0...v7.0.0) (2021-12-14)


### ⚠ BREAKING CHANGES

* remove node 10 from CI

### Features

* add sorted option to xFindClosestIndex function ([#94](https://www.github.com/mljs/spectra-processing/issues/94)) ([aa228be](https://www.github.com/mljs/spectra-processing/commit/aa228beb14e321cd8d43eddec89c1ad9923d7561))


### Bug Fixes

* documentation of xyCheck ([4c6b59a](https://www.github.com/mljs/spectra-processing/commit/4c6b59a26bd255a49bab8ff39abb8e330f76993e))
* xHistogram test case ([4170db9](https://www.github.com/mljs/spectra-processing/commit/4170db98ab911a4caa2f03553da216d0875a5056))


### Miscellaneous Chores

* remove node 10 from CI ([391b064](https://www.github.com/mljs/spectra-processing/commit/391b064f357a69e2725ad581f90de2ecc09d519e))

## [6.8.0](https://www.github.com/mljs/spectra-processing/compare/v6.7.1...v6.8.0) (2021-07-23)


### Features

* add xUniqueSorted ([104cf0f](https://www.github.com/mljs/spectra-processing/commit/104cf0f8b31f1e31a07028093f8d374af5dfe5d3))

### [6.7.1](https://www.github.com/mljs/spectra-processing/compare/v6.7.0...v6.7.1) (2021-06-16)


### Bug Fixes

* **xyArrayAlignToFirst:** deal correctly with delta as function ([9cef8f4](https://www.github.com/mljs/spectra-processing/commit/9cef8f49bfa66acc17f66c2ddc62ee30f459d6f5))

## [6.7.0](https://www.github.com/mljs/spectra-processing/compare/v6.6.0...v6.7.0) (2021-06-16)


### Features

* add xyArrayAlighToFirst ([9ea0921](https://www.github.com/mljs/spectra-processing/commit/9ea0921617714eff982285eaa6aa6126c7e05e53))
* xyMedian function added ([#85](https://www.github.com/mljs/spectra-processing/issues/85)) ([e54280a](https://www.github.com/mljs/spectra-processing/commit/e54280a55417e7ade305248e3e6aec269aad730f))

## [6.6.0](https://www.github.com/mljs/spectra-processing/compare/v6.5.0...v6.6.0) (2021-05-12)


### Features

* export san plot chart ([#83](https://www.github.com/mljs/spectra-processing/issues/83)) ([fdaa738](https://www.github.com/mljs/spectra-processing/commit/fdaa738c48751dd514e99989570dd1200d5ac000))

## [6.5.0](https://www.github.com/mljs/spectra-processing/compare/v6.4.0...v6.5.0) (2021-05-04)


### Features

* optimize xySortX if already sorted ([e6dac65](https://www.github.com/mljs/spectra-processing/commit/e6dac65c584b9dcc64a5add1e9819051cf476db4))


### Bug Fixes

* script to deploy documentation ([2c2cbee](https://www.github.com/mljs/spectra-processing/commit/2c2cbee01967156ab1a2578ae0f8c6fbe8a3fd02))

## [6.4.0](https://www.github.com/mljs/spectra-processing/compare/v6.3.0...v6.4.0) (2021-05-04)


### Features

* add xyArrayWeightedMerge ([37032c2](https://www.github.com/mljs/spectra-processing/commit/37032c2da9b84f2503a58af7e83ce76c1673e357))
* xyArrayWeightedMerge allows a function for delta ([028eaa1](https://www.github.com/mljs/spectra-processing/commit/028eaa16648b33328207b1c2f4a01cbf06a4569f))

## [6.3.0](https://www.github.com/mljs/spectra-processing/compare/v6.2.1...v6.3.0) (2021-04-30)


### Features

* add xMinMaxValues ([7e2a85b](https://www.github.com/mljs/spectra-processing/commit/7e2a85bde1e3ca2adf828b80877ed63ee1d4d496))

### [6.2.1](https://www.github.com/mljs/spectra-processing/compare/v6.2.0...v6.2.1) (2021-04-30)


### Bug Fixes

* fix matrixHistogram with log scale ([c531c6c](https://www.github.com/mljs/spectra-processing/commit/c531c6c1754866cdde50a2202c65d0c7a13efb1e))

## [6.2.0](https://www.github.com/mljs/spectra-processing/compare/v6.1.3...v6.2.0) (2021-04-30)


### Features

* add absolute option in xHisotgram and matrixHistogram ([f3ea8a3](https://www.github.com/mljs/spectra-processing/commit/f3ea8a337d6464816bf9d764ca34ce10207c7a40))
* add matrixMinMaxAbsoluteZ ([0b30854](https://www.github.com/mljs/spectra-processing/commit/0b30854e6e5e35ca6ad1461777ff178568f1e0d6))
* add matrixMinMaxAbsoluteZ ([e8662e7](https://www.github.com/mljs/spectra-processing/commit/e8662e7c2502615e398969224230f2a8f0b8ba71))
* allow absolute in matrixHistogram ([f4e266c](https://www.github.com/mljs/spectra-processing/commit/f4e266cb327af3e8c1459f5b622a914d1ede9c2b))

### [6.1.3](https://www.github.com/mljs/spectra-processing/compare/v6.1.2...v6.1.3) (2021-04-29)


### Bug Fixes

* correct matrixHistogram for count of 0 ([a1c6b0d](https://www.github.com/mljs/spectra-processing/commit/a1c6b0d289ee612077b7931cceb52d110569544a))

### [6.1.2](https://www.github.com/mljs/spectra-processing/compare/v6.1.1...v6.1.2) (2021-04-29)


### Bug Fixes

* xHistogram log should be value + 1 ([024fd33](https://www.github.com/mljs/spectra-processing/commit/024fd3308f25d828f88dc49c929da634f44596c2))

### [6.1.1](https://www.github.com/mljs/spectra-processing/compare/v6.1.0...v6.1.1) (2021-04-29)


### Bug Fixes

* histogram is a float array to allow log ([7db1295](https://www.github.com/mljs/spectra-processing/commit/7db1295662a6193fdd773a29d21dfd4a6943c82a))

## [6.1.0](https://www.github.com/mljs/spectra-processing/compare/v6.0.0...v6.1.0) (2021-04-29)


### Features

* xHistogram and matrixHistogram add x and y log scale ([bf50407](https://www.github.com/mljs/spectra-processing/commit/bf50407c1927b9ae695c89b56bea1b3138b42f10))
* **xHistogram:** allow any base for log scale on X axis ([23dc2b3](https://www.github.com/mljs/spectra-processing/commit/23dc2b308c6135459d6a44db1704292cf5c51213))

## [6.0.0](https://www.github.com/mljs/spectra-processing/compare/v5.10.0...v6.0.0) (2021-04-25)


### ⚠ BREAKING CHANGES

* **matrixYRescale:** rename method to matrixZRescale
* **matrixCenterYMean:** rename method to matrixCenterZMean

### Features

* add matrixHistogram ([b49d2bf](https://www.github.com/mljs/spectra-processing/commit/b49d2bf353b6355aad9e21823234eb62daf199e5))
* **matrixCenterYMean:** rename method to matrixCenterZMean ([44f2673](https://www.github.com/mljs/spectra-processing/commit/44f2673b15f59480baa5c380ba5e3b77f950fd60))
* **matrixMinMaxZ:** add new method ([08d242e](https://www.github.com/mljs/spectra-processing/commit/08d242e6236b69f9ad8e12cf97cfffb7b1b7c99c))
* **matrixYRescale:** rename method to matrixZRescale ([8f980eb](https://www.github.com/mljs/spectra-processing/commit/8f980ebdcd1882f9de9e626b487a44ea1ce9c8c5))
* xHistogram returns a DataXY ([44089c7](https://www.github.com/mljs/spectra-processing/commit/44089c7915aad8372aba00c6857c4aa210150461))
* xHistogram: add log10Scale option ([6952e19](https://www.github.com/mljs/spectra-processing/commit/6952e1931ca7a0a2a984ae4a6c21f2f0e54c3d85))
* **xHistogram:** give possibility to append to existing histogram ([31f1e0d](https://www.github.com/mljs/spectra-processing/commit/31f1e0dad2b7585e7b71acaa9967a21317c9ddd0))


### Bug Fixes

* edge case of xHistogram ([40752b0](https://www.github.com/mljs/spectra-processing/commit/40752b0f3921262d25e1ff24c4df06ac0866100d))

## [5.10.0](https://www.github.com/mljs/spectra-processing/compare/v5.9.0...v5.10.0) (2021-04-22)


### Features

* add xCumulative ([a991750](https://www.github.com/mljs/spectra-processing/commit/a991750db1f218877bf457b67b20fe79147f20fd))
* add xyCumulativeDistributionStatistics ([d805015](https://www.github.com/mljs/spectra-processing/commit/d8050152c10b27dbafcc0da682beb2010134c85e))


### Bug Fixes

* xyCumulativeDistributionStatistics ([a154964](https://www.github.com/mljs/spectra-processing/commit/a154964e20bc554a77c9c1f7545fd0f2042685cc))

## [5.9.0](https://www.github.com/mljs/spectra-processing/compare/v5.8.0...v5.9.0) (2021-03-24)


### Features

* add xHistogram ([7297b55](https://www.github.com/mljs/spectra-processing/commit/7297b5507f3f0dd81bb8a4ea19db043b7830b0c4))


### Bug Fixes

* update dependencies ([80dcdcf](https://www.github.com/mljs/spectra-processing/commit/80dcdcf7303c1f01ed6c3f8dd16b8b8615eef938))

## [5.8.0](https://www.github.com/mljs/spectra-processing/compare/v5.7.2...v5.8.0) (2021-03-10)


### Features

* add xyArrayMerge ([e0a53ab](https://www.github.com/mljs/spectra-processing/commit/e0a53ab80614643d7f8eff70989d0b81e785baa6))

### [5.7.2](https://www.github.com/mljs/spectra-processing/compare/v5.7.1...v5.7.2) (2021-03-10)


### Bug Fixes

* xyObjectJoinX with y=0 ([feaa0fe](https://www.github.com/mljs/spectra-processing/commit/feaa0fe91923542963489835a7d0c00482d64f43))

### [5.7.1](https://www.github.com/mljs/spectra-processing/compare/v5.7.0...v5.7.1) (2021-03-09)


### Bug Fixes

* xyJoinX when Y values are zero ([69c7089](https://www.github.com/mljs/spectra-processing/commit/69c7089d048870f0266cf5db76cb8ab8c23326bb))

## [5.7.0](https://www.github.com/mljs/spectra-processing/compare/v5.6.0...v5.7.0) (2021-03-04)


### Features

* add xyFilterXPositive ([7d8ffcb](https://www.github.com/mljs/spectra-processing/commit/7d8ffcbe39702db030f514e37dcf7ba7f4d18db4))

## [5.6.0](https://www.github.com/mljs/spectra-processing/compare/v5.5.3...v5.6.0) (2021-03-03)


### Features

* filter non growing data ([#61](https://www.github.com/mljs/spectra-processing/issues/61)) ([f13c9eb](https://www.github.com/mljs/spectra-processing/commit/f13c9eb2666c5ca6c484ee1141a0761ca39c434e))

### [5.5.3](https://www.github.com/mljs/spectra-processing/compare/v5.5.2...v5.5.3) (2021-02-23)


### Bug Fixes

* release.yml ([e012f5d](https://www.github.com/mljs/spectra-processing/commit/e012f5d58d91c8fd23e4f8b7cdbe70df209b7d4d))

### [5.5.2](https://www.github.com/mljs/spectra-processing/compare/v5.5.1...v5.5.2) (2021-02-23)


### Bug Fixes

* try to change lactame.yml to trigger it ([28cd509](https://www.github.com/mljs/spectra-processing/commit/28cd509c3fbbf4bc0f1944062fa2627b3047de02))

### [5.5.1](https://www.github.com/mljs/spectra-processing/compare/v5.5.0...v5.5.1) (2021-02-23)


### Bug Fixes

* update documentation ([1292579](https://www.github.com/mljs/spectra-processing/commit/1292579334bb663b65204cdf039d520d14668dac))

## [5.5.0](https://www.github.com/mljs/spectra-processing/compare/v5.4.0...v5.5.0) (2021-02-23)


### Features

* add lactame deployment ([81f70c0](https://www.github.com/mljs/spectra-processing/commit/81f70c0741cf556327cd72a22e69319c96d20ef8))

## [5.4.0](https://www.github.com/mljs/spectra-processing/compare/v5.3.1...v5.4.0) (2021-02-23)


### Features

* add xMean ([7d98aa9](https://www.github.com/mljs/spectra-processing/commit/7d98aa9bab601a5a87214517853ba03a530ee527))
* add xyArrayAlign ([a96d786](https://www.github.com/mljs/spectra-processing/commit/a96d7867cf178d5e01f09663ea0c7934e3637f90))
* add xyJoinX ([6c53bf0](https://www.github.com/mljs/spectra-processing/commit/6c53bf08741c3bd5eef0a35f1231f2461d2a6264))
* delta may be a function in xyAlign ([f4cde8a](https://www.github.com/mljs/spectra-processing/commit/f4cde8a5c052872ab87d9428605bf585e8e9742b))

### [5.3.1](https://www.github.com/mljs/spectra-processing/compare/v5.3.0...v5.3.1) (2021-02-16)


### Bug Fixes

* xAdd/substract/divide/multiply also work with floatarray ([#53](https://www.github.com/mljs/spectra-processing/issues/53)) ([6460573](https://www.github.com/mljs/spectra-processing/commit/6460573974c04387f144faa4d0b7a88ebef9cec4))
* xMonotone was failing if it started with constant values ([#54](https://www.github.com/mljs/spectra-processing/issues/54)) ([3fbd82b](https://www.github.com/mljs/spectra-processing/commit/3fbd82b9a335724bbada5343e9654836ab769e47))

## [5.3.0](https://www.github.com/mljs/spectra-processing/compare/v5.2.0...v5.3.0) (2021-02-15)


### Features

* exporting xDotProduct in index.js ([#51](https://www.github.com/mljs/spectra-processing/issues/51)) ([e84b430](https://www.github.com/mljs/spectra-processing/commit/e84b4304b58919cfed0c8ef32e345666b7d20d7e))

## [5.2.0](https://www.github.com/mljs/spectra-processing/compare/v5.1.0...v5.2.0) (2021-02-10)


### Features

* added rollingMax, rollingMin ([#48](https://www.github.com/mljs/spectra-processing/issues/48)) ([083ca2c](https://www.github.com/mljs/spectra-processing/commit/083ca2c24a1364dd5fee1f310ee3624192704326))
* implemented mae and mse ([#50](https://www.github.com/mljs/spectra-processing/issues/50)) ([5cabd0a](https://www.github.com/mljs/spectra-processing/commit/5cabd0a9c2c65b5b71d949bd47bd8a023a57715f))

## [5.1.0](https://www.github.com/mljs/spectra-processing/compare/v5.0.0...v5.1.0) (2021-01-19)


### Features

* add matrixCenterYMean ([55dd43c](https://www.github.com/mljs/spectra-processing/commit/55dd43c8a31a2be34d0c614b319c6f56d327a6f2))
* add matrixYRescale ([1acf214](https://www.github.com/mljs/spectra-processing/commit/1acf21484c291b9cc9c4a6fd210b30bb15dfd2ed))
* rename probabilisticQuotientNormalization to matrixPQN ([8a1c7e0](https://www.github.com/mljs/spectra-processing/commit/8a1c7e03c698db88e5a4dc829c47d98a724a2721))

## [5.0.0](https://www.github.com/mljs/spectra-processing/compare/v4.12.0...v5.0.0) (2021-01-19)


### ⚠ BREAKING CHANGES

* rename xyXShift to xyCalibrate

### Features

* rename xyXShift to xyCalibrate ([eb04e3d](https://www.github.com/mljs/spectra-processing/commit/eb04e3d2dec985e092d730e0feec5d5254d6860c))

## [4.12.0](https://www.github.com/mljs/spectra-processing/compare/v4.11.0...v4.12.0) (2021-01-08)


### Features

* add xMaxValue ([df69c01](https://www.github.com/mljs/spectra-processing/commit/df69c01003788510ffb2bb80bf8e724000885869))
* add xMinValue ([4674548](https://www.github.com/mljs/spectra-processing/commit/467454822b888a81409cf2143623deff8909e6fc))
* add xSum ([6c3b90c](https://www.github.com/mljs/spectra-processing/commit/6c3b90ca16ce2eab5ee615b195dff323bdebcffc))

## [4.11.0](https://www.github.com/mljs/spectra-processing/compare/v4.10.0...v4.11.0) (2021-01-08)


### Features

* add createSequentialArray ([649547d](https://www.github.com/mljs/spectra-processing/commit/649547d48c51f8b4ce95553824ed8b92b6b17040))
* add xParetoNormalization ([ec0c517](https://www.github.com/mljs/spectra-processing/commit/ec0c5170f097fb0d4e8ed2a05e8aa96c5a4062b4))


### Bug Fixes

* change mean by median close[#32](https://www.github.com/mljs/spectra-processing/issues/32) ([#40](https://www.github.com/mljs/spectra-processing/issues/40)) ([9272c73](https://www.github.com/mljs/spectra-processing/commit/9272c7373b930567ee5ca2ab01ca746af495e8bc))

## [4.10.0](https://www.github.com/mljs/spectra-processing/compare/v4.9.4...v4.10.0) (2020-12-08)


### Features

* add xyUniqueX and xyQuickSortX ([6fd6711](https://www.github.com/mljs/spectra-processing/commit/6fd6711c61d3bfb5cc0ee8e73894c6564e80710b))
* add xyUniqueX and xySortX ([3ab1b4e](https://www.github.com/mljs/spectra-processing/commit/3ab1b4ed1380197747eacf62544f4679349481e8))

### [4.9.4](https://www.github.com/mljs/spectra-processing/compare/v4.9.3...v4.9.4) (2020-11-19)


### Bug Fixes

* return value of xyXShift if from / to not defined ([ca747f5](https://www.github.com/mljs/spectra-processing/commit/ca747f5af8d88fd09b5d20162d753afdae6d7f43))

### [4.9.3](https://www.github.com/mljs/spectra-processing/compare/v4.9.2...v4.9.3) (2020-11-19)


### Bug Fixes

* deal with from=0 or to=0 in xyXShift ([e0f8292](https://www.github.com/mljs/spectra-processing/commit/e0f829247c66712560d76a662e349aa97f3fb1b7))
* in xyXShift if no peaks returns 0 ([19b1643](https://www.github.com/mljs/spectra-processing/commit/19b1643c66f4ceccf416ec0140f0b64c76892960))

### [4.9.2](https://www.github.com/mljs/spectra-processing/compare/v4.9.1...v4.9.2) (2020-11-18)


### Bug Fixes

* documentation ([be46a70](https://www.github.com/mljs/spectra-processing/commit/be46a70b6fffa39e5d869f95930e226627b20ae9))

### [4.9.1](https://www.github.com/mljs/spectra-processing/compare/v4.9.0...v4.9.1) (2020-11-18)


### Bug Fixes

* remove docs ([b82a088](https://www.github.com/mljs/spectra-processing/commit/b82a088368dc55599db1847cc598bd5a8a3c962b))

## [4.9.0](https://www.github.com/mljs/spectra-processing/compare/v4.8.0...v4.9.0) (2020-11-18)


### Features

* add xyXShift ([2dd4b48](https://www.github.com/mljs/spectra-processing/commit/2dd4b4894307dc9f8aa2262d4db419dfaa455fac))

## [4.8.0](https://www.github.com/mljs/spectra-processing/compare/v4.7.0...v4.8.0) (2020-11-11)


### Features

* add Probabilistic quotient normalization method ([#30](https://www.github.com/mljs/spectra-processing/issues/30)) ([67f2ce0](https://www.github.com/mljs/spectra-processing/commit/67f2ce0243ef5d7648614e47b34e57ebd7dc5050))

## [4.7.0](https://www.github.com/mljs/spectra-processing/compare/v4.6.0...v4.7.0) (2020-11-06)


### Features

* add xyToXYArray ([71c2c4a](https://www.github.com/mljs/spectra-processing/commit/71c2c4a4f55f3c723117bb2a42a4524dbd1bb313))

## [4.6.0](https://www.github.com/mljs/spectra-processing/compare/v4.5.1...v4.6.0) (2020-11-02)


### Features

* add xyToXYArray ([17a9de5](https://www.github.com/mljs/spectra-processing/commit/17a9de5accc7107fcc4ab5af85a4d2d286234cf6))

### [4.5.1](https://www.github.com/mljs/spectra-processing/compare/v4.5.0...v4.5.1) (2020-10-09)


### Bug Fixes

* setup registry url for npm publish ([1ae83d5](https://www.github.com/mljs/spectra-processing/commit/1ae83d522591871f2c8d44e3b34e0ed057d8f28a))

## [4.5.0](https://www.github.com/mljs/spectra-processing/compare/v4.4.0...v4.5.0) (2020-10-09)


### Features

* add xyRolling ([#24](https://www.github.com/mljs/spectra-processing/issues/24)) ([0613eae](https://www.github.com/mljs/spectra-processing/commit/0613eaec01cfe13da6da6ec92e91a22e89183f75))


### Bug Fixes

* check that xRolling parameter is an array ([eb398ba](https://www.github.com/mljs/spectra-processing/commit/eb398baf813e7aef33b4b104d92c17165080a8f1))

## [4.4.0](https://www.github.com/mljs/spectra-processing/compare/v4.3.0...v4.4.0) (2020-10-09)


### Features

* add xRolling and xRollingAverage ([#19](https://www.github.com/mljs/spectra-processing/issues/19)) ([a439036](https://www.github.com/mljs/spectra-processing/commit/a439036365311d50374fd70a1e59f61033a91ddb))
* add xRollingMedian ([#21](https://www.github.com/mljs/spectra-processing/issues/21)) ([32676ab](https://www.github.com/mljs/spectra-processing/commit/32676ab12ea5ee70e8862dc0c4063dff90a470ee))

## [4.3.0](https://github.com/cheminfo/spectra-processing/compare/v4.2.1...v4.3.0) (2020-10-09)


### Features

* add xAbsolute ([#15](https://github.com/cheminfo/spectra-processing/issues/15)) ([22c51d8](https://github.com/cheminfo/spectra-processing/commit/22c51d86790b23deba0b3769dd8cb7ddc5105092))
* add xPadding ([#14](https://github.com/cheminfo/spectra-processing/issues/14)) ([7ee6dcf](https://github.com/cheminfo/spectra-processing/commit/7ee6dcf435442281f0f0fc33b72cd5c9983d02fe))
* add xyObjectBestPoints ([de52f2b](https://github.com/cheminfo/spectra-processing/commit/de52f2b7fc6d861c60ba6ae4b3f937a85c861e36))
* add xyObjectMaxXPoint and xyObjectMinXPoint ([876dc34](https://github.com/cheminfo/spectra-processing/commit/876dc34000435bea06d3c8fb003fa1dd7833123c))
* added argmin and argmax ([#10](https://github.com/cheminfo/spectra-processing/issues/10)) ([2a0b4b3](https://github.com/cheminfo/spectra-processing/commit/2a0b4b36b417f13155a21e053e40f9e8f460ce0c))



## [4.2.1](https://github.com/cheminfo/spectra-processing/compare/v4.2.0...v4.2.1) (2020-09-09)



# [4.2.0](https://github.com/cheminfo/spectra-processing/compare/v4.1.1...v4.2.0) (2020-07-14)


### Features

* add matrixColumnsCorrelation ([892a429](https://github.com/cheminfo/spectra-processing/commit/892a429069ad93d9b0be20ab1dd9126d33c2ba7d))
* add xIsMonotone ([3121f38](https://github.com/cheminfo/spectra-processing/commit/3121f380d4bfc58e3db486c3fd99d4c3a40b7597))



# [4.1.0](https://github.com/cheminfo/spectra-processing/compare/v4.0.0...v4.1.0) (2020-05-23)


### Features

* add zoneToX ([9857200](https://github.com/cheminfo/spectra-processing/commit/9857200226d9e98bbccfc37f7fa2a2fd875c87e4))



# [4.0.0](https://github.com/cheminfo/spectra-processing/compare/v3.0.2...v4.0.0) (2020-05-20)



## [3.0.2](https://github.com/cheminfo/spectra-processing/compare/v3.0.1...v3.0.2) (2020-05-16)


### Bug Fixes

* wrong search and replace ([430934a](https://github.com/cheminfo/spectra-processing/commit/430934a4c99100af13912a97d342cea9ab727225))



## [3.0.1](https://github.com/cheminfo/spectra-processing/compare/v3.0.0...v3.0.1) (2020-05-15)



# [3.0.0](https://github.com/cheminfo/spectra-processing/compare/v2.4.0...v3.0.0) (2020-05-15)



# [2.4.0](https://github.com/cheminfo/spectra-processing/compare/v2.3.0...v2.4.0) (2020-05-12)


### Features

* add X.absoluteMedian ([7732f39](https://github.com/cheminfo/spectra-processing/commit/7732f395aa5085ee17c82ca1912b9e2c0325f89f))



# [2.3.0](https://github.com/cheminfo/spectra-processing/compare/v2.2.0...v2.3.0) (2020-05-08)


### Features

* add automatic phase correction in ReIm ([#6](https://github.com/cheminfo/spectra-processing/issues/6)) ([cab2afa](https://github.com/cheminfo/spectra-processing/commit/cab2afaddb082448247675497df12f5dad08209e))



# [2.2.0](https://github.com/cheminfo/spectra-processing/compare/v2.1.1...v2.2.0) (2020-04-16)



## [2.1.1](https://github.com/cheminfo/spectra-processing/compare/v2.1.0...v2.1.1) (2020-04-09)



# [2.1.0](https://github.com/cheminfo/spectra-processing/compare/v2.0.2...v2.1.0) (2020-04-03)


### Features

* add the align method ([f490bf1](https://github.com/cheminfo/spectra-processing/commit/f490bf1c282a99e90725ee78bf20570c57f826b2))



## [2.0.2](https://github.com/cheminfo/spectra-processing/compare/v2.0.1...v2.0.2) (2020-03-27)



## [2.0.1](https://github.com/cheminfo/spectra-processing/compare/v2.0.0...v2.0.1) (2020-02-25)


### Bug Fixes

* correctly import is-any-array ([568b20b](https://github.com/cheminfo/spectra-processing/commit/568b20baaad30d9198ea005c9ea7484c88d9467b))
* rollup.config ([f1f8943](https://github.com/cheminfo/spectra-processing/commit/f1f894320ad55727f84ad848ed37a8f4091b77fd))



# [2.0.0](https://github.com/cheminfo/spectra-processing/compare/v1.3.1...v2.0.0) (2020-02-08)


### Bug Fixes

* eslint ([af497eb](https://github.com/cheminfo/spectra-processing/commit/af497eb5fd8e20e2b9111a174b8259894f240617))
* use Number.NEGATIVE_INFINITY and not Number.MIN_VALUE ([06827c1](https://github.com/cheminfo/spectra-processing/commit/06827c1b58f4fa75263e05a839c798130b430474))


### Features

* add XY.extract ([5dae851](https://github.com/cheminfo/spectra-processing/commit/5dae851b16653b97b072a7da5a871f9a0e8eb4c1))
* add zones ([bbe4a2f](https://github.com/cheminfo/spectra-processing/commit/bbe4a2f473d758fc4dc001d318a01e162a4b40ea))
* add zones in reduce ([9a2c573](https://github.com/cheminfo/spectra-processing/commit/9a2c573b5b3f7f10399e443b2cf9d2da442922c2))
* normalizeZones allow from / to ([a7e0762](https://github.com/cheminfo/spectra-processing/commit/a7e0762731a6919dbe56009a5590e6e9d5049645))



# [1.2.0](https://github.com/cheminfo/spectra-processing/compare/v1.1.0...v1.2.0) (2019-12-13)


### Features

* add XYObject.slotX ([deb03c1](https://github.com/cheminfo/spectra-processing/commit/deb03c1e8099342b0358c2231531de2f290967ce))



# [1.1.0](https://github.com/cheminfo/spectra-processing/compare/v0.6.1...v1.1.0) (2019-12-13)


### Bug Fixes

* export X.getFromToIndex ([39e16c3](https://github.com/cheminfo/spectra-processing/commit/39e16c346031524676b2ef76f94df96ffd2c601a))


### Features

* add optimize in reduce ([b00a6ce](https://github.com/cheminfo/spectra-processing/commit/b00a6cea4d6f263b431f319b405d52bf37ac02df))
* add xyObject ([dcd8c44](https://github.com/cheminfo/spectra-processing/commit/dcd8c445a2909300204e5b1b61d6fcdc6ab0e876))
* export X.findClosestIndex ([f5321b3](https://github.com/cheminfo/spectra-processing/commit/f5321b30652003eb97ac72d38cbaf4d9814ce168))



## [0.6.1](https://github.com/cheminfo/spectra-processing/compare/v0.6.0...v0.6.1) (2019-11-13)


### Features

* add index in minYPiont and maxYPoint ([0b5e135](https://github.com/cheminfo/spectra-processing/commit/0b5e1350229d259489ff652acd0176168d664b90))



# [0.6.0](https://github.com/cheminfo/spectra-processing/compare/v0.4.0...v0.6.0) (2019-11-13)


### Features

* add correlation ([dd6569c](https://github.com/cheminfo/spectra-processing/commit/dd6569c973efc17d437b31f338219c3ecb1da0f8))
* add maximaY ([e2cfa9b](https://github.com/cheminfo/spectra-processing/commit/e2cfa9b9c05f1a62975a322613b15d032f09a481))
* add peakInfo ([c76bfe6](https://github.com/cheminfo/spectra-processing/commit/c76bfe6a526e26cc0231d0eddcf378a65b7c9c7e))
* add XY minimaY and maximaY ([a2cff7f](https://github.com/cheminfo/spectra-processing/commit/a2cff7f30e42e33e38c658758c78eb87d4fdcaf7))
* invert from / to if required ([d99ef8e](https://github.com/cheminfo/spectra-processing/commit/d99ef8e0dbc044eae46ee302007d8d497e0589c9))



# [0.4.0](https://github.com/cheminfo/spectra-processing/compare/v0.3.0...v0.4.0) (2019-10-01)


### Features

* add X.boxPlot ([3a1f0ea](https://github.com/cheminfo/spectra-processing/commit/3a1f0ea))



# [0.3.0](https://github.com/cheminfo/spectra-processing/compare/v0.2.0...v0.3.0) (2019-08-30)


### Features

* **x:** add getTargetIndex ([389c3be](https://github.com/cheminfo/spectra-processing/commit/389c3be))
* **xy:** add maxClosestYPoint and minClosestYPoint ([85e36fe](https://github.com/cheminfo/spectra-processing/commit/85e36fe))
* **xy:** add realMinYPoint and realMaxYPoint ([0c628e3](https://github.com/cheminfo/spectra-processing/commit/0c628e3))



# [0.2.0](https://github.com/cheminfo/spectra-processing/compare/v0.1.5...v0.2.0) (2019-08-17)



## [0.1.5](https://github.com/cheminfo/spectra-processing/compare/v0.1.4...v0.1.5) (2019-08-16)



## [0.1.4](https://github.com/cheminfo/spectra-processing/compare/v0.1.3...v0.1.4) (2019-08-16)



## [0.1.3](https://github.com/cheminfo/spectra-processing/compare/v0.1.2...v0.1.3) (2019-08-06)



## [0.1.2](https://github.com/cheminfo/spectra-processing/compare/v0.1.1...v0.1.2) (2019-08-05)



## [0.1.1](https://github.com/cheminfo/spectra-processing/compare/v0.1.0...v0.1.1) (2019-07-26)



# [0.1.0](https://github.com/cheminfo/spectra-processing/compare/v0.0.3...v0.1.0) (2019-07-26)



## [0.0.3](https://github.com/cheminfo/spectra-processing/compare/v0.0.2...v0.0.3) (2019-07-14)



## [0.0.2](https://github.com/cheminfo/spectra-processing/compare/v0.0.1...v0.0.2) (2019-07-11)



## 0.0.1 (2019-07-11)
