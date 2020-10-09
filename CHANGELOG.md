# Changelog

## 1.0.0 (2020-10-09)


### Features

* add automatic phase correction in ReIm ([#6](https://www.github.com/mljs/spectra-processing/issues/6)) ([cab2afa](https://www.github.com/mljs/spectra-processing/commit/cab2afaddb082448247675497df12f5dad08209e))
* add correlation ([dd6569c](https://www.github.com/mljs/spectra-processing/commit/dd6569c973efc17d437b31f338219c3ecb1da0f8))
* add index in minYPiont and maxYPoint ([0b5e135](https://www.github.com/mljs/spectra-processing/commit/0b5e1350229d259489ff652acd0176168d664b90))
* add matrixColumnsCorrelation ([892a429](https://www.github.com/mljs/spectra-processing/commit/892a429069ad93d9b0be20ab1dd9126d33c2ba7d))
* add maximaY ([e2cfa9b](https://www.github.com/mljs/spectra-processing/commit/e2cfa9b9c05f1a62975a322613b15d032f09a481))
* add optimize in reduce ([b00a6ce](https://www.github.com/mljs/spectra-processing/commit/b00a6cea4d6f263b431f319b405d52bf37ac02df))
* add peakInfo ([c76bfe6](https://www.github.com/mljs/spectra-processing/commit/c76bfe6a526e26cc0231d0eddcf378a65b7c9c7e))
* add the align method ([f490bf1](https://www.github.com/mljs/spectra-processing/commit/f490bf1c282a99e90725ee78bf20570c57f826b2))
* add X.absoluteMedian ([7732f39](https://www.github.com/mljs/spectra-processing/commit/7732f395aa5085ee17c82ca1912b9e2c0325f89f))
* add X.boxPlot ([3a1f0ea](https://www.github.com/mljs/spectra-processing/commit/3a1f0eaa7dd4bb5af1ff7780c75c22da66d02cb3))
* add xIsMonotone ([3121f38](https://www.github.com/mljs/spectra-processing/commit/3121f380d4bfc58e3db486c3fd99d4c3a40b7597))
* add xPadding ([#14](https://www.github.com/mljs/spectra-processing/issues/14)) ([7ee6dcf](https://www.github.com/mljs/spectra-processing/commit/7ee6dcf435442281f0f0fc33b72cd5c9983d02fe))
* add XY minimaY and maximaY ([a2cff7f](https://www.github.com/mljs/spectra-processing/commit/a2cff7f30e42e33e38c658758c78eb87d4fdcaf7))
* add XY.extract ([5dae851](https://www.github.com/mljs/spectra-processing/commit/5dae851b16653b97b072a7da5a871f9a0e8eb4c1))
* add xyObject ([dcd8c44](https://www.github.com/mljs/spectra-processing/commit/dcd8c445a2909300204e5b1b61d6fcdc6ab0e876))
* add XYObject.slotX ([deb03c1](https://www.github.com/mljs/spectra-processing/commit/deb03c1e8099342b0358c2231531de2f290967ce))
* add xyObjectBestPoints ([de52f2b](https://www.github.com/mljs/spectra-processing/commit/de52f2b7fc6d861c60ba6ae4b3f937a85c861e36))
* add xyObjectMaxXPoint and xyObjectMinXPoint ([876dc34](https://www.github.com/mljs/spectra-processing/commit/876dc34000435bea06d3c8fb003fa1dd7833123c))
* add zones ([bbe4a2f](https://www.github.com/mljs/spectra-processing/commit/bbe4a2f473d758fc4dc001d318a01e162a4b40ea))
* add zones in reduce ([9a2c573](https://www.github.com/mljs/spectra-processing/commit/9a2c573b5b3f7f10399e443b2cf9d2da442922c2))
* add zoneToX ([9857200](https://www.github.com/mljs/spectra-processing/commit/9857200226d9e98bbccfc37f7fa2a2fd875c87e4))
* added argmin and argmax ([#10](https://www.github.com/mljs/spectra-processing/issues/10)) ([2a0b4b3](https://www.github.com/mljs/spectra-processing/commit/2a0b4b36b417f13155a21e053e40f9e8f460ce0c))
* export X.findClosestIndex ([f5321b3](https://www.github.com/mljs/spectra-processing/commit/f5321b30652003eb97ac72d38cbaf4d9814ce168))
* invert from / to if required ([d99ef8e](https://www.github.com/mljs/spectra-processing/commit/d99ef8e0dbc044eae46ee302007d8d497e0589c9))
* normalizeZones allow from / to ([a7e0762](https://www.github.com/mljs/spectra-processing/commit/a7e0762731a6919dbe56009a5590e6e9d5049645))
* **x:** add getTargetIndex ([389c3be](https://www.github.com/mljs/spectra-processing/commit/389c3be6e3bf6513065954e0fae137c8396ac3e2))
* **xy:** add maxClosestYPoint and minClosestYPoint ([85e36fe](https://www.github.com/mljs/spectra-processing/commit/85e36fea6f4714442fa753fa8e7a6d150f2508f4))
* **xy:** add realMinYPoint and realMaxYPoint ([0c628e3](https://www.github.com/mljs/spectra-processing/commit/0c628e31cfc45e1a3e872c2c8d56752a1dcddba0))


### Bug Fixes

* correctly export autocorrelation and crosscorrelation ([60b8442](https://www.github.com/mljs/spectra-processing/commit/60b8442b425d6922ff44cc980cf54dd8e6590b5a))
* correctly import is-any-array ([568b20b](https://www.github.com/mljs/spectra-processing/commit/568b20baaad30d9198ea005c9ea7484c88d9467b))
* eslint ([af497eb](https://www.github.com/mljs/spectra-processing/commit/af497eb5fd8e20e2b9111a174b8259894f240617))
* export X.getFromToIndex ([39e16c3](https://www.github.com/mljs/spectra-processing/commit/39e16c346031524676b2ef76f94df96ffd2c601a))
* rollup.config ([f1f8943](https://www.github.com/mljs/spectra-processing/commit/f1f894320ad55727f84ad848ed37a8f4091b77fd))
* use Number.NEGATIVE_INFINITY and not Number.MIN_VALUE ([06827c1](https://www.github.com/mljs/spectra-processing/commit/06827c1b58f4fa75263e05a839c798130b430474))
* wrong search and replace ([430934a](https://www.github.com/mljs/spectra-processing/commit/430934a4c99100af13912a97d342cea9ab727225))
