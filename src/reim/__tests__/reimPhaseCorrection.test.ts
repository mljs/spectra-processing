import XSAdd from 'ml-xsadd';

import { reimPhaseCorrection } from '../../index';

let data = {
  x: [
    8.199734086424085, 8.199000651380036, 8.198267216335987, 8.197533781291938,
    8.196800346247889, 8.19606691120384, 8.19533347615979, 8.194600041115741,
    8.193866606071692, 8.193133171027643, 8.192399735983594, 8.191666300939545,
    8.190932865895496, 8.190199430851447, 8.189465995807398, 8.188732560763349,
    8.1879991257193, 8.18726569067525, 8.186532255631201, 8.185798820587152,
    8.185065385543103, 8.184331950499054, 8.183598515455005, 8.182865080410956,
    8.182131645366907, 8.181398210322858, 8.180664775278808, 8.17993134023476,
    8.17919790519071, 8.178464470146661, 8.177731035102612, 8.176997600058563,
    8.176264165014514, 8.175530729970465, 8.174797294926416, 8.174063859882367,
    8.173330424838317, 8.172596989794268, 8.17186355475022, 8.17113011970617,
    8.170396684662121, 8.169663249618072, 8.168929814574023, 8.168196379529974,
    8.167462944485925, 8.166729509441875, 8.165996074397826, 8.165262639353777,
    8.164529204309728, 8.163795769265679, 8.16306233422163, 8.16232889917758,
    8.161595464133532, 8.160862029089483, 8.160128594045434, 8.159395159001384,
    8.158661723957335, 8.157928288913286, 8.157194853869237, 8.156461418825188,
    8.155727983781139, 8.15499454873709, 8.15426111369304, 8.153527678648992,
    8.152794243604943, 8.152060808560893, 8.151327373516844, 8.150593938472795,
    8.149860503428746, 8.149127068384697, 8.148393633340648, 8.147660198296599,
    8.14692676325255, 8.1461933282085, 8.145459893164452, 8.144726458120402,
    8.143993023076353, 8.143259588032304, 8.142526152988255, 8.141792717944206,
    8.141059282900157, 8.140325847856108, 8.139592412812059, 8.13885897776801,
    8.13812554272396, 8.137392107679911, 8.136658672635862, 8.135925237591813,
    8.135191802547764, 8.134458367503715, 8.133724932459666, 8.132991497415617,
    8.132258062371568, 8.131524627327519, 8.13079119228347, 8.13005775723942,
    8.129324322195371, 8.128590887151322, 8.127857452107273, 8.127124017063224,
    8.126390582019175, 8.125657146975126, 8.124923711931077, 8.124190276887028,
    8.123456841842978, 8.12272340679893, 8.12198997175488, 8.121256536710831,
    8.120523101666782, 8.119789666622733, 8.119056231578684, 8.118322796534635,
    8.117589361490586, 8.116855926446537, 8.116122491402487, 8.115389056358438,
    8.11465562131439, 8.11392218627034, 8.113188751226291, 8.112455316182242,
    8.111721881138193, 8.110988446094144, 8.110255011050095, 8.109521576006046,
    8.108788140961996, 8.108054705917947, 8.107321270873898, 8.106587835829849,
    8.1058544007858, 8.105120965741751, 8.104387530697702, 8.103654095653653,
    8.102920660609604, 8.102187225565554, 8.101453790521505, 8.100720355477456,
    8.099986920433407, 8.099253485389358, 8.098520050345309, 8.09778661530126,
    8.09705318025721, 8.096319745213162, 8.095586310169113, 8.094852875125063,
    8.094119440081014, 8.093386005036965, 8.092652569992916, 8.091919134948867,
    8.091185699904818, 8.090452264860769, 8.08971882981672, 8.08898539477267,
    8.088251959728622, 8.087518524684572, 8.086785089640523, 8.086051654596474,
    8.085318219552425, 8.084584784508376, 8.083851349464327, 8.083117914420278,
    8.082384479376229, 8.08165104433218, 8.08091760928813, 8.080184174244081,
    8.079450739200032, 8.078717304155983, 8.077983869111934, 8.077250434067885,
    8.076516999023836, 8.075783563979787, 8.075050128935738, 8.074316693891689,
    8.07358325884764, 8.07284982380359, 8.072116388759541, 8.071382953715492,
    8.070649518671443, 8.069916083627394,
  ],
  re: [
    822423, 1081785, 1067187, 1116249, 1151841, 1189596, 1239867, 1256766,
    1362485, 1397263, 1448391, 1464224, 1420442, 1426225, 1524771, 1774048,
    1766676, 1886695, 1832236, 2148116, 2037927, 2212281, 2282038, 2376123,
    2411792, 2553408, 2671702, 2809003, 3028830, 3118490, 3440325, 3601248,
    3836716, 4130812, 4336543, 4745020, 4968638, 5431880, 5632227, 6017824,
    6362400, 6742733, 7001635, 7435214, 8157257, 8739253, 9391238, 10348131,
    11400357, 12517023, 13558927, 14611256, 15900304, 17672936, 19810783,
    22001994, 24772047, 27950115, 32539307, 39865188, 51646017, 71597938,
    107343070, 165281591, 239696386, 303070504, 327312081, 315593407, 301733470,
    313310193, 337902300, 337760644, 294095320, 223346063, 156343425, 108230615,
    77709542, 58900593, 47192678, 40094453, 35567011, 32674479, 30865426,
    30024828, 30230836, 31302486, 33403405, 36337812, 41545079, 50578391,
    65982667, 94489931, 143948180, 215534593, 289661287, 332602999, 332034522,
    312628829, 311858259, 334739549, 348810488, 321487365, 255384496, 180894277,
    121864796, 82952331, 58321402, 42365224, 32262338, 25638642, 20917967,
    17214749, 14017117, 11683417, 9796699, 8486028, 7925725, 6758569, 5996526,
    5120060, 4305045, 3537722, 3210630, 2853977, 2725112, 2398581, 2050923,
    1917958, 1745268, 1720097, 1517453, 1561291, 1391978, 1394199, 1364716,
    1397405, 1353128, 1228542, 1284793, 1339989, 1166448, 1052858, 1098619,
    989349, 916027, 890740, 839746, 752868, 845223, 708162, 673163, 659383,
    713162, 650226, 655630, 644567, 589769, 623081, 542377, 509329, 542399,
    339780, 335449, 477048, 238755, 380527, 364363, 414233, 359919, 444592,
    330401, 424915, 240138, 295724, 125546, 191534, 113171, 200947,
  ],
  im: [
    -20078683, -20430132, -20799330, -21261613, -21640727, -22047097, -22422447,
    -22756195, -23191868, -23533018, -24014540, -24410285, -24866337, -25413064,
    -25999719, -26295135, -27108723, -27533495, -28056455, -28621771, -29193438,
    -29711981, -30398680, -30919962, -31658670, -32243438, -32972687, -33693402,
    -34551298, -35232699, -36027702, -36930557, -37762939, -38666949, -39644012,
    -40543325, -41533481, -42686063, -43665694, -44672095, -45942631, -47242239,
    -48460560, -49868192, -51334585, -52983617, -54624313, -56377703, -58328355,
    -60237426, -62499727, -64741090, -67352260, -69693770, -72574975, -75571282,
    -79057441, -82693934, -86496744, -90374228, -94875093, -99537240,
    -104870406, -111584341, -118661078, -126834251, -135848274, -146080390,
    -158353985, -173264941, -191460418, -212741483, -236545492, -260503305,
    -274468119, -260328174, -206044223, -127337179, -62578293, -32634996,
    -18247437, 18242434, 86275500, 156404818, 193174703, 188921467, 162562050,
    132023003, 105378824, 83301559, 64396687, 48401841, 34018491, 20270817,
    6870637, -6667021, -20467129, -35276356, -51631532, -70415183, -92011399,
    -116257991, -141896196, -162456648, -163470082, -127579982, -57769871,
    14687045, 57692412, 73243358, 96449279, 151544423, 223622705, 275928567,
    287839990, 269843256, 242194778, 216545373, 195806943, 178916146, 165368519,
    154631620, 145778767, 138144199, 131622935, 125436010, 120053395, 115287759,
    111234540, 107396458, 103854702, 100345131, 97123333, 94254825, 91555244,
    88757075, 86481353, 84284744, 82339260, 80314527, 78615944, 76906316,
    75266098, 73731107, 72154132, 70795094, 69322547, 68088804, 66793004,
    65509327, 64418402, 63185857, 62181063, 61044133, 60103892, 59111815,
    58325728, 57312164, 56592103, 55811694, 54919166, 54241624, 53519632,
    52922671, 52030265, 51339488, 50632353, 50113795, 49486934, 48982266,
    48390023, 47832744, 47308448, 46785677, 46303098, 45797427, 45410426,
    45004027,
  ],
};
describe('reimPhaseCorrection', () => {
  it('test reimPhaseCorrection even', () => {
    let re = [0, 1, 2, 3];
    let im = [0, 1, 2, 3];
    let result = reimPhaseCorrection({ re, im }, 0, 0);
    let newRe = Array.from(result.re);
    let newIm = Array.from(result.im);

    expect({ re: newRe, im: newIm }).toStrictEqual({ re, im });
  });
  it('180 zero order phasing', () => {
    const generator = new XSAdd(0);
    let phased = reimPhaseCorrection(data, Math.PI, 0);
    let diff = data.re.map((e, i) => e + phased.re[i]);
    let index = Math.floor(generator.random() * data.x.length);
    expect(diff[index]).toBeCloseTo(0, 4);
  });
});
