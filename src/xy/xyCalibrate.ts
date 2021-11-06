import mean from 'ml-array-mean';
import { DataType, gsd } from 'ml-gsd';

import { DataXY } from '..';
import { xFindClosestIndex } from '../x/xFindClosestIndex';

/**
 *
 * Calibrates the data based on a range and means of peaks in this range
 * Based on a range we will make a peak picking using global spectra deconvolution
 * The selected nbPeaks will then be taken into account to calculate an average X value.
 * The difference between the targetX and the averageX value will be returned
 *
 * @param [data] array of points {x,y}
 * @param [range={}] range
 * @param [range.from] - Beginning of the range where the interest signal is localed
 * @param [range.to] - End of the range where the interest signal is localed
 * @param [options={}] options
 * @param [options.nbPeaks=1] Number of peaks to consider to calculate mean (sorted by height)
 * @param [options.targetX=0] Expected value for the mean of the peaks position
 * @param [options.gsd={}] GSD options. You may check options here: http://mljs.github.io/global-spectral-deconvolution/#gsd
 * @param [options.gsd.minMaxRatio=0.2] - GSD Threshold to determine if a given peak should be considered as a noise.
 * @param options.gsd.realTopDetection realTopDetection
 * @param options.gsd.smoothY smoothY
 * @param options.gsd.sgOptions sgOptions
 * @param options.gsd.sgOptions.windowSize sgOptions.windowSize
 * @param options.gsd.sgOptions.polynomial sgOptions.polynomial
 * @returns difference between targetX and currentX
 */
export function xyCalibrate(
  data: DataXY,
  range: { to?: number; from?: number } = {},
  options: {
    targetX?: number;
    nbPeaks?: number;
    gsd?: {
      minMaxRatio: number;
      realTopDetection: boolean;
      smoothY: boolean;
      sgOptions: {
        windowSize: number;
        polynomial: number;
      };
    };
  } = {},
): number {
  const {
    targetX = 0,
    nbPeaks = 1,
    gsd: gsdOptions = {
      minMaxRatio: 0.1,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 7,
        polynomial: 3,
      },
    },
  } = options;
  let { from, to } = range;
  if (from === undefined || to === undefined) return 0;

  const fromIndex = xFindClosestIndex(data.x, from);
  const toIndex = xFindClosestIndex(data.x, to);
  const sliceddata: DataType = {
    x: data.x.slice(fromIndex, toIndex) as number[],
    y: data.y.slice(fromIndex, toIndex) as number[],
  };

  let peaks = gsd(sliceddata, gsdOptions)
    .sort((a, b) => b.y - a.y)
    .slice(0, nbPeaks);

  if (peaks.length === 0) return 0;

  const middle = mean(peaks.map((peak) => peak.x));

  return targetX - middle;
}
