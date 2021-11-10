"use strict";
// ------------------------------------
// This code was autogenerated using
// scripts/console-library-generator.js
// ------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogs = exports.Bytes32Ty = exports.Bytes31Ty = exports.Bytes30Ty = exports.Bytes29Ty = exports.Bytes28Ty = exports.Bytes27Ty = exports.Bytes26Ty = exports.Bytes25Ty = exports.Bytes24Ty = exports.Bytes23Ty = exports.Bytes22Ty = exports.Bytes21Ty = exports.Bytes20Ty = exports.Bytes19Ty = exports.Bytes18Ty = exports.Bytes17Ty = exports.Bytes16Ty = exports.Bytes15Ty = exports.Bytes14Ty = exports.Bytes13Ty = exports.Bytes12Ty = exports.Bytes11Ty = exports.Bytes10Ty = exports.Bytes9Ty = exports.Bytes8Ty = exports.Bytes7Ty = exports.Bytes6Ty = exports.Bytes5Ty = exports.Bytes4Ty = exports.Bytes3Ty = exports.Bytes2Ty = exports.Bytes1Ty = exports.BytesTy = exports.AddressTy = exports.BoolTy = exports.StringTy = exports.UintTy = exports.IntTy = void 0;
exports.IntTy = "Int";
exports.UintTy = "Uint";
exports.StringTy = "String";
exports.BoolTy = "Bool";
exports.AddressTy = "Address";
exports.BytesTy = "Bytes";
exports.Bytes1Ty = "Bytes1";
exports.Bytes2Ty = "Bytes2";
exports.Bytes3Ty = "Bytes3";
exports.Bytes4Ty = "Bytes4";
exports.Bytes5Ty = "Bytes5";
exports.Bytes6Ty = "Bytes6";
exports.Bytes7Ty = "Bytes7";
exports.Bytes8Ty = "Bytes8";
exports.Bytes9Ty = "Bytes9";
exports.Bytes10Ty = "Bytes10";
exports.Bytes11Ty = "Bytes11";
exports.Bytes12Ty = "Bytes12";
exports.Bytes13Ty = "Bytes13";
exports.Bytes14Ty = "Bytes14";
exports.Bytes15Ty = "Bytes15";
exports.Bytes16Ty = "Bytes16";
exports.Bytes17Ty = "Bytes17";
exports.Bytes18Ty = "Bytes18";
exports.Bytes19Ty = "Bytes19";
exports.Bytes20Ty = "Bytes20";
exports.Bytes21Ty = "Bytes21";
exports.Bytes22Ty = "Bytes22";
exports.Bytes23Ty = "Bytes23";
exports.Bytes24Ty = "Bytes24";
exports.Bytes25Ty = "Bytes25";
exports.Bytes26Ty = "Bytes26";
exports.Bytes27Ty = "Bytes27";
exports.Bytes28Ty = "Bytes28";
exports.Bytes29Ty = "Bytes29";
exports.Bytes30Ty = "Bytes30";
exports.Bytes31Ty = "Bytes31";
exports.Bytes32Ty = "Bytes32";
// In order to optimize map lookup
// we'll store 4byte signature as int
exports.ConsoleLogs = {
    1368866505: [],
    1309416733: [exports.IntTy],
    4122065833: [exports.UintTy],
    1093685164: [exports.StringTy],
    843419373: [exports.BoolTy],
    741264322: [exports.AddressTy],
    199720790: [exports.BytesTy],
    1847107880: [exports.Bytes1Ty],
    3921027734: [exports.Bytes2Ty],
    763578662: [exports.Bytes3Ty],
    3764340945: [exports.Bytes4Ty],
    2793701517: [exports.Bytes5Ty],
    2927928721: [exports.Bytes6Ty],
    1322614312: [exports.Bytes7Ty],
    1334060334: [exports.Bytes8Ty],
    2428341456: [exports.Bytes9Ty],
    20780939: [exports.Bytes10Ty],
    67127854: [exports.Bytes11Ty],
    2258660029: [exports.Bytes12Ty],
    2488442420: [exports.Bytes13Ty],
    2456219775: [exports.Bytes14Ty],
    3667227872: [exports.Bytes15Ty],
    1717330180: [exports.Bytes16Ty],
    866084666: [exports.Bytes17Ty],
    3302112666: [exports.Bytes18Ty],
    1584093747: [exports.Bytes19Ty],
    1367925737: [exports.Bytes20Ty],
    3923391840: [exports.Bytes21Ty],
    3589990556: [exports.Bytes22Ty],
    2879508237: [exports.Bytes23Ty],
    4055063348: [exports.Bytes24Ty],
    193248344: [exports.Bytes25Ty],
    4172368369: [exports.Bytes26Ty],
    976705501: [exports.Bytes27Ty],
    3358255854: [exports.Bytes28Ty],
    1265222613: [exports.Bytes29Ty],
    3994207469: [exports.Bytes30Ty],
    3263516050: [exports.Bytes31Ty],
    666357637: [exports.Bytes32Ty],
    1812949376: [exports.UintTy, exports.UintTy],
    262402885: [exports.UintTy, exports.StringTy],
    510514412: [exports.UintTy, exports.BoolTy],
    1491830284: [exports.UintTy, exports.AddressTy],
    2534451664: [exports.StringTy, exports.UintTy],
    1264337527: [exports.StringTy, exports.StringTy],
    3283441205: [exports.StringTy, exports.BoolTy],
    832238387: [exports.StringTy, exports.AddressTy],
    910912146: [exports.BoolTy, exports.UintTy],
    2414527781: [exports.BoolTy, exports.StringTy],
    705760899: [exports.BoolTy, exports.BoolTy],
    2235320393: [exports.BoolTy, exports.AddressTy],
    574869411: [exports.AddressTy, exports.UintTy],
    1973388987: [exports.AddressTy, exports.StringTy],
    1974863315: [exports.AddressTy, exports.BoolTy],
    3673216170: [exports.AddressTy, exports.AddressTy],
    3884059252: [exports.UintTy, exports.UintTy, exports.UintTy],
    2104037094: [exports.UintTy, exports.UintTy, exports.StringTy],
    1733758967: [exports.UintTy, exports.UintTy, exports.BoolTy],
    3191032091: [exports.UintTy, exports.UintTy, exports.AddressTy],
    1533929535: [exports.UintTy, exports.StringTy, exports.UintTy],
    1062716053: [exports.UintTy, exports.StringTy, exports.StringTy],
    1185403086: [exports.UintTy, exports.StringTy, exports.BoolTy],
    529592906: [exports.UintTy, exports.StringTy, exports.AddressTy],
    1515034914: [exports.UintTy, exports.BoolTy, exports.UintTy],
    2332955902: [exports.UintTy, exports.BoolTy, exports.StringTy],
    3587091680: [exports.UintTy, exports.BoolTy, exports.BoolTy],
    1112473535: [exports.UintTy, exports.BoolTy, exports.AddressTy],
    2286109610: [exports.UintTy, exports.AddressTy, exports.UintTy],
    3464692859: [exports.UintTy, exports.AddressTy, exports.StringTy],
    2060456590: [exports.UintTy, exports.AddressTy, exports.BoolTy],
    2104993307: [exports.UintTy, exports.AddressTy, exports.AddressTy],
    2526862595: [exports.StringTy, exports.UintTy, exports.UintTy],
    2750793529: [exports.StringTy, exports.UintTy, exports.StringTy],
    4043501061: [exports.StringTy, exports.UintTy, exports.BoolTy],
    3817119609: [exports.StringTy, exports.UintTy, exports.AddressTy],
    4083337817: [exports.StringTy, exports.StringTy, exports.UintTy],
    753761519: [exports.StringTy, exports.StringTy, exports.StringTy],
    2967534005: [exports.StringTy, exports.StringTy, exports.BoolTy],
    2515337621: [exports.StringTy, exports.StringTy, exports.AddressTy],
    689682896: [exports.StringTy, exports.BoolTy, exports.UintTy],
    3801674877: [exports.StringTy, exports.BoolTy, exports.StringTy],
    2232122070: [exports.StringTy, exports.BoolTy, exports.BoolTy],
    2469116728: [exports.StringTy, exports.BoolTy, exports.AddressTy],
    130552343: [exports.StringTy, exports.AddressTy, exports.UintTy],
    3773410639: [exports.StringTy, exports.AddressTy, exports.StringTy],
    3374145236: [exports.StringTy, exports.AddressTy, exports.BoolTy],
    4243355104: [exports.StringTy, exports.AddressTy, exports.AddressTy],
    995886048: [exports.BoolTy, exports.UintTy, exports.UintTy],
    3359211184: [exports.BoolTy, exports.UintTy, exports.StringTy],
    464374251: [exports.BoolTy, exports.UintTy, exports.BoolTy],
    3302110471: [exports.BoolTy, exports.UintTy, exports.AddressTy],
    3224906412: [exports.BoolTy, exports.StringTy, exports.UintTy],
    2960557183: [exports.BoolTy, exports.StringTy, exports.StringTy],
    3686056519: [exports.BoolTy, exports.StringTy, exports.BoolTy],
    2509355347: [exports.BoolTy, exports.StringTy, exports.AddressTy],
    2954061243: [exports.BoolTy, exports.BoolTy, exports.UintTy],
    626391622: [exports.BoolTy, exports.BoolTy, exports.StringTy],
    1349555864: [exports.BoolTy, exports.BoolTy, exports.BoolTy],
    276362893: [exports.BoolTy, exports.BoolTy, exports.AddressTy],
    3950005167: [exports.BoolTy, exports.AddressTy, exports.UintTy],
    3734671984: [exports.BoolTy, exports.AddressTy, exports.StringTy],
    415876934: [exports.BoolTy, exports.AddressTy, exports.BoolTy],
    3530962535: [exports.BoolTy, exports.AddressTy, exports.AddressTy],
    2273710942: [exports.AddressTy, exports.UintTy, exports.UintTy],
    3136907337: [exports.AddressTy, exports.UintTy, exports.StringTy],
    3846889796: [exports.AddressTy, exports.UintTy, exports.BoolTy],
    2548867988: [exports.AddressTy, exports.UintTy, exports.AddressTy],
    484110986: [exports.AddressTy, exports.StringTy, exports.UintTy],
    4218888805: [exports.AddressTy, exports.StringTy, exports.StringTy],
    3473018801: [exports.AddressTy, exports.StringTy, exports.BoolTy],
    4035396840: [exports.AddressTy, exports.StringTy, exports.AddressTy],
    742821141: [exports.AddressTy, exports.BoolTy, exports.UintTy],
    555898316: [exports.AddressTy, exports.BoolTy, exports.StringTy],
    3951234194: [exports.AddressTy, exports.BoolTy, exports.BoolTy],
    4044790253: [exports.AddressTy, exports.BoolTy, exports.AddressTy],
    1815506290: [exports.AddressTy, exports.AddressTy, exports.UintTy],
    7426238: [exports.AddressTy, exports.AddressTy, exports.StringTy],
    4070990470: [exports.AddressTy, exports.AddressTy, exports.BoolTy],
    25986242: [exports.AddressTy, exports.AddressTy, exports.AddressTy],
    1554033982: [exports.UintTy, exports.UintTy, exports.UintTy, exports.UintTy],
    2024634892: [exports.UintTy, exports.UintTy, exports.UintTy, exports.StringTy],
    1683143115: [exports.UintTy, exports.UintTy, exports.UintTy, exports.BoolTy],
    3766828905: [exports.UintTy, exports.UintTy, exports.UintTy, exports.AddressTy],
    949229117: [exports.UintTy, exports.UintTy, exports.StringTy, exports.UintTy],
    2080582194: [exports.UintTy, exports.UintTy, exports.StringTy, exports.StringTy],
    2989403910: [exports.UintTy, exports.UintTy, exports.StringTy, exports.BoolTy],
    1127384482: [exports.UintTy, exports.UintTy, exports.StringTy, exports.AddressTy],
    1818524812: [exports.UintTy, exports.UintTy, exports.BoolTy, exports.UintTy],
    4024028142: [exports.UintTy, exports.UintTy, exports.BoolTy, exports.StringTy],
    2495495089: [exports.UintTy, exports.UintTy, exports.BoolTy, exports.BoolTy],
    3776410703: [exports.UintTy, exports.UintTy, exports.BoolTy, exports.AddressTy],
    1628154048: [exports.UintTy, exports.UintTy, exports.AddressTy, exports.UintTy],
    3600994782: [exports.UintTy, exports.UintTy, exports.AddressTy, exports.StringTy],
    2833785006: [exports.UintTy, exports.UintTy, exports.AddressTy, exports.BoolTy],
    3398671136: [exports.UintTy, exports.UintTy, exports.AddressTy, exports.AddressTy],
    3221501959: [exports.UintTy, exports.StringTy, exports.UintTy, exports.UintTy],
    2730232985: [exports.UintTy, exports.StringTy, exports.UintTy, exports.StringTy],
    2270850606: [exports.UintTy, exports.StringTy, exports.UintTy, exports.BoolTy],
    2877020669: [exports.UintTy, exports.StringTy, exports.UintTy, exports.AddressTy],
    1995203422: [exports.UintTy, exports.StringTy, exports.StringTy, exports.UintTy],
    1474103825: [exports.UintTy, exports.StringTy, exports.StringTy, exports.StringTy],
    310782872: [exports.UintTy, exports.StringTy, exports.StringTy, exports.BoolTy],
    3432549024: [exports.UintTy, exports.StringTy, exports.StringTy, exports.AddressTy],
    2763295359: [exports.UintTy, exports.StringTy, exports.BoolTy, exports.UintTy],
    2370346144: [exports.UintTy, exports.StringTy, exports.BoolTy, exports.StringTy],
    1371286465: [exports.UintTy, exports.StringTy, exports.BoolTy, exports.BoolTy],
    2037328032: [exports.UintTy, exports.StringTy, exports.BoolTy, exports.AddressTy],
    2565338099: [exports.UintTy, exports.StringTy, exports.AddressTy, exports.UintTy],
    4170733439: [exports.UintTy, exports.StringTy, exports.AddressTy, exports.StringTy],
    4181720887: [exports.UintTy, exports.StringTy, exports.AddressTy, exports.BoolTy],
    2141537675: [exports.UintTy, exports.StringTy, exports.AddressTy, exports.AddressTy],
    1451396516: [exports.UintTy, exports.BoolTy, exports.UintTy, exports.UintTy],
    3906845782: [exports.UintTy, exports.BoolTy, exports.UintTy, exports.StringTy],
    3534472445: [exports.UintTy, exports.BoolTy, exports.UintTy, exports.BoolTy],
    1329595790: [exports.UintTy, exports.BoolTy, exports.UintTy, exports.AddressTy],
    2438978344: [exports.UintTy, exports.BoolTy, exports.StringTy, exports.UintTy],
    2754870525: [exports.UintTy, exports.BoolTy, exports.StringTy, exports.StringTy],
    879671495: [exports.UintTy, exports.BoolTy, exports.StringTy, exports.BoolTy],
    1231956916: [exports.UintTy, exports.BoolTy, exports.StringTy, exports.AddressTy],
    3173363033: [exports.UintTy, exports.BoolTy, exports.BoolTy, exports.UintTy],
    831186331: [exports.UintTy, exports.BoolTy, exports.BoolTy, exports.StringTy],
    1315722005: [exports.UintTy, exports.BoolTy, exports.BoolTy, exports.BoolTy],
    1392910941: [exports.UintTy, exports.BoolTy, exports.BoolTy, exports.AddressTy],
    1102442299: [exports.UintTy, exports.BoolTy, exports.AddressTy, exports.UintTy],
    2721084958: [exports.UintTy, exports.BoolTy, exports.AddressTy, exports.StringTy],
    2449150530: [exports.UintTy, exports.BoolTy, exports.AddressTy, exports.BoolTy],
    2263728396: [exports.UintTy, exports.BoolTy, exports.AddressTy, exports.AddressTy],
    3399106228: [exports.UintTy, exports.AddressTy, exports.UintTy, exports.UintTy],
    1054063912: [exports.UintTy, exports.AddressTy, exports.UintTy, exports.StringTy],
    435581801: [exports.UintTy, exports.AddressTy, exports.UintTy, exports.BoolTy],
    4256361684: [exports.UintTy, exports.AddressTy, exports.UintTy, exports.AddressTy],
    2697204968: [exports.UintTy, exports.AddressTy, exports.StringTy, exports.UintTy],
    2373420580: [exports.UintTy, exports.AddressTy, exports.StringTy, exports.StringTy],
    581204390: [exports.UintTy, exports.AddressTy, exports.StringTy, exports.BoolTy],
    3420819197: [exports.UintTy, exports.AddressTy, exports.StringTy, exports.AddressTy],
    2064181483: [exports.UintTy, exports.AddressTy, exports.BoolTy, exports.UintTy],
    1676730946: [exports.UintTy, exports.AddressTy, exports.BoolTy, exports.StringTy],
    2116501773: [exports.UintTy, exports.AddressTy, exports.BoolTy, exports.BoolTy],
    3056677012: [exports.UintTy, exports.AddressTy, exports.BoolTy, exports.AddressTy],
    2587672470: [exports.UintTy, exports.AddressTy, exports.AddressTy, exports.UintTy],
    2034490470: [exports.UintTy, exports.AddressTy, exports.AddressTy, exports.StringTy],
    22350596: [exports.UintTy, exports.AddressTy, exports.AddressTy, exports.BoolTy],
    1430734329: [exports.UintTy, exports.AddressTy, exports.AddressTy, exports.AddressTy],
    149837414: [exports.StringTy, exports.UintTy, exports.UintTy, exports.UintTy],
    2773406909: [exports.StringTy, exports.UintTy, exports.UintTy, exports.StringTy],
    4147936829: [exports.StringTy, exports.UintTy, exports.UintTy, exports.BoolTy],
    3201771711: [exports.StringTy, exports.UintTy, exports.UintTy, exports.AddressTy],
    2697245221: [exports.StringTy, exports.UintTy, exports.StringTy, exports.UintTy],
    1821956834: [exports.StringTy, exports.UintTy, exports.StringTy, exports.StringTy],
    3919545039: [exports.StringTy, exports.UintTy, exports.StringTy, exports.BoolTy],
    3144824297: [exports.StringTy, exports.UintTy, exports.StringTy, exports.AddressTy],
    1427009269: [exports.StringTy, exports.UintTy, exports.BoolTy, exports.UintTy],
    1993105508: [exports.StringTy, exports.UintTy, exports.BoolTy, exports.StringTy],
    3816813520: [exports.StringTy, exports.UintTy, exports.BoolTy, exports.BoolTy],
    3847527825: [exports.StringTy, exports.UintTy, exports.BoolTy, exports.AddressTy],
    1481210622: [exports.StringTy, exports.UintTy, exports.AddressTy, exports.UintTy],
    844415720: [exports.StringTy, exports.UintTy, exports.AddressTy, exports.StringTy],
    285649143: [exports.StringTy, exports.UintTy, exports.AddressTy, exports.BoolTy],
    3939013249: [exports.StringTy, exports.UintTy, exports.AddressTy, exports.AddressTy],
    3587119056: [exports.StringTy, exports.StringTy, exports.UintTy, exports.UintTy],
    2366909661: [exports.StringTy, exports.StringTy, exports.UintTy, exports.StringTy],
    3864418506: [exports.StringTy, exports.StringTy, exports.UintTy, exports.BoolTy],
    1565476480: [exports.StringTy, exports.StringTy, exports.UintTy, exports.AddressTy],
    2681211381: [exports.StringTy, exports.StringTy, exports.StringTy, exports.UintTy],
    3731419658: [exports.StringTy, exports.StringTy, exports.StringTy, exports.StringTy],
    739726573: [exports.StringTy, exports.StringTy, exports.StringTy, exports.BoolTy],
    1834430276: [exports.StringTy, exports.StringTy, exports.StringTy, exports.AddressTy],
    2256636538: [exports.StringTy, exports.StringTy, exports.BoolTy, exports.UintTy],
    1585754346: [exports.StringTy, exports.StringTy, exports.BoolTy, exports.StringTy],
    1081628777: [exports.StringTy, exports.StringTy, exports.BoolTy, exports.BoolTy],
    3279013851: [exports.StringTy, exports.StringTy, exports.BoolTy, exports.AddressTy],
    1250010474: [exports.StringTy, exports.StringTy, exports.AddressTy, exports.UintTy],
    3944480640: [exports.StringTy, exports.StringTy, exports.AddressTy, exports.StringTy],
    1556958775: [exports.StringTy, exports.StringTy, exports.AddressTy, exports.BoolTy],
    1134328815: [exports.StringTy, exports.StringTy, exports.AddressTy, exports.AddressTy],
    1572859960: [exports.StringTy, exports.BoolTy, exports.UintTy, exports.UintTy],
    1119461927: [exports.StringTy, exports.BoolTy, exports.UintTy, exports.StringTy],
    1019590099: [exports.StringTy, exports.BoolTy, exports.UintTy, exports.BoolTy],
    1909687565: [exports.StringTy, exports.BoolTy, exports.UintTy, exports.AddressTy],
    885731469: [exports.StringTy, exports.BoolTy, exports.StringTy, exports.UintTy],
    2821114603: [exports.StringTy, exports.BoolTy, exports.StringTy, exports.StringTy],
    1066037277: [exports.StringTy, exports.BoolTy, exports.StringTy, exports.BoolTy],
    3764542249: [exports.StringTy, exports.BoolTy, exports.StringTy, exports.AddressTy],
    2155164136: [exports.StringTy, exports.BoolTy, exports.BoolTy, exports.UintTy],
    2636305885: [exports.StringTy, exports.BoolTy, exports.BoolTy, exports.StringTy],
    2304440517: [exports.StringTy, exports.BoolTy, exports.BoolTy, exports.BoolTy],
    1905304873: [exports.StringTy, exports.BoolTy, exports.BoolTy, exports.AddressTy],
    685723286: [exports.StringTy, exports.BoolTy, exports.AddressTy, exports.UintTy],
    764294052: [exports.StringTy, exports.BoolTy, exports.AddressTy, exports.StringTy],
    2508990662: [exports.StringTy, exports.BoolTy, exports.AddressTy, exports.BoolTy],
    870964509: [exports.StringTy, exports.BoolTy, exports.AddressTy, exports.AddressTy],
    3668153533: [exports.StringTy, exports.AddressTy, exports.UintTy, exports.UintTy],
    1280700980: [exports.StringTy, exports.AddressTy, exports.UintTy, exports.StringTy],
    1522647356: [exports.StringTy, exports.AddressTy, exports.UintTy, exports.BoolTy],
    2741431424: [exports.StringTy, exports.AddressTy, exports.UintTy, exports.AddressTy],
    2405583849: [exports.StringTy, exports.AddressTy, exports.StringTy, exports.UintTy],
    609847026: [exports.StringTy, exports.AddressTy, exports.StringTy, exports.StringTy],
    1595265676: [exports.StringTy, exports.AddressTy, exports.StringTy, exports.BoolTy],
    2864486961: [exports.StringTy, exports.AddressTy, exports.StringTy, exports.AddressTy],
    3318856587: [exports.StringTy, exports.AddressTy, exports.BoolTy, exports.UintTy],
    72663161: [exports.StringTy, exports.AddressTy, exports.BoolTy, exports.StringTy],
    2038975531: [exports.StringTy, exports.AddressTy, exports.BoolTy, exports.BoolTy],
    573965245: [exports.StringTy, exports.AddressTy, exports.BoolTy, exports.AddressTy],
    1857524797: [exports.StringTy, exports.AddressTy, exports.AddressTy, exports.UintTy],
    2148146279: [exports.StringTy, exports.AddressTy, exports.AddressTy, exports.StringTy],
    3047013728: [exports.StringTy, exports.AddressTy, exports.AddressTy, exports.BoolTy],
    3985582326: [exports.StringTy, exports.AddressTy, exports.AddressTy, exports.AddressTy],
    853517604: [exports.BoolTy, exports.UintTy, exports.UintTy, exports.UintTy],
    3657852616: [exports.BoolTy, exports.UintTy, exports.UintTy, exports.StringTy],
    2753397214: [exports.BoolTy, exports.UintTy, exports.UintTy, exports.BoolTy],
    4049711649: [exports.BoolTy, exports.UintTy, exports.UintTy, exports.AddressTy],
    1098907931: [exports.BoolTy, exports.UintTy, exports.StringTy, exports.UintTy],
    3542771016: [exports.BoolTy, exports.UintTy, exports.StringTy, exports.StringTy],
    2446522387: [exports.BoolTy, exports.UintTy, exports.StringTy, exports.BoolTy],
    2781285673: [exports.BoolTy, exports.UintTy, exports.StringTy, exports.AddressTy],
    3554563475: [exports.BoolTy, exports.UintTy, exports.BoolTy, exports.UintTy],
    3067439572: [exports.BoolTy, exports.UintTy, exports.BoolTy, exports.StringTy],
    2650928961: [exports.BoolTy, exports.UintTy, exports.BoolTy, exports.BoolTy],
    1114097656: [exports.BoolTy, exports.UintTy, exports.BoolTy, exports.AddressTy],
    3399820138: [exports.BoolTy, exports.UintTy, exports.AddressTy, exports.UintTy],
    403247937: [exports.BoolTy, exports.UintTy, exports.AddressTy, exports.StringTy],
    1705899016: [exports.BoolTy, exports.UintTy, exports.AddressTy, exports.BoolTy],
    2318373034: [exports.BoolTy, exports.UintTy, exports.AddressTy, exports.AddressTy],
    2387273838: [exports.BoolTy, exports.StringTy, exports.UintTy, exports.UintTy],
    2007084013: [exports.BoolTy, exports.StringTy, exports.UintTy, exports.StringTy],
    549177775: [exports.BoolTy, exports.StringTy, exports.UintTy, exports.BoolTy],
    1529002296: [exports.BoolTy, exports.StringTy, exports.UintTy, exports.AddressTy],
    1574643090: [exports.BoolTy, exports.StringTy, exports.StringTy, exports.UintTy],
    392356650: [exports.BoolTy, exports.StringTy, exports.StringTy, exports.StringTy],
    508266469: [exports.BoolTy, exports.StringTy, exports.StringTy, exports.BoolTy],
    2547225816: [exports.BoolTy, exports.StringTy, exports.StringTy, exports.AddressTy],
    2372902053: [exports.BoolTy, exports.StringTy, exports.BoolTy, exports.UintTy],
    1211958294: [exports.BoolTy, exports.StringTy, exports.BoolTy, exports.StringTy],
    3697185627: [exports.BoolTy, exports.StringTy, exports.BoolTy, exports.BoolTy],
    1401816747: [exports.BoolTy, exports.StringTy, exports.BoolTy, exports.AddressTy],
    453743963: [exports.BoolTy, exports.StringTy, exports.AddressTy, exports.UintTy],
    316065672: [exports.BoolTy, exports.StringTy, exports.AddressTy, exports.StringTy],
    1842623690: [exports.BoolTy, exports.StringTy, exports.AddressTy, exports.BoolTy],
    724244700: [exports.BoolTy, exports.StringTy, exports.AddressTy, exports.AddressTy],
    1181212302: [exports.BoolTy, exports.BoolTy, exports.UintTy, exports.UintTy],
    1348569399: [exports.BoolTy, exports.BoolTy, exports.UintTy, exports.StringTy],
    2874982852: [exports.BoolTy, exports.BoolTy, exports.UintTy, exports.BoolTy],
    201299213: [exports.BoolTy, exports.BoolTy, exports.UintTy, exports.AddressTy],
    395003525: [exports.BoolTy, exports.BoolTy, exports.StringTy, exports.UintTy],
    1830717265: [exports.BoolTy, exports.BoolTy, exports.StringTy, exports.StringTy],
    3092715066: [exports.BoolTy, exports.BoolTy, exports.StringTy, exports.BoolTy],
    4188875657: [exports.BoolTy, exports.BoolTy, exports.StringTy, exports.AddressTy],
    3259532109: [exports.BoolTy, exports.BoolTy, exports.BoolTy, exports.UintTy],
    719587540: [exports.BoolTy, exports.BoolTy, exports.BoolTy, exports.StringTy],
    992632032: [exports.BoolTy, exports.BoolTy, exports.BoolTy, exports.BoolTy],
    2352126746: [exports.BoolTy, exports.BoolTy, exports.BoolTy, exports.AddressTy],
    1620281063: [exports.BoolTy, exports.BoolTy, exports.AddressTy, exports.UintTy],
    2695133539: [exports.BoolTy, exports.BoolTy, exports.AddressTy, exports.StringTy],
    3231908568: [exports.BoolTy, exports.BoolTy, exports.AddressTy, exports.BoolTy],
    4102557348: [exports.BoolTy, exports.BoolTy, exports.AddressTy, exports.AddressTy],
    2617143996: [exports.BoolTy, exports.AddressTy, exports.UintTy, exports.UintTy],
    2691192883: [exports.BoolTy, exports.AddressTy, exports.UintTy, exports.StringTy],
    4002252402: [exports.BoolTy, exports.AddressTy, exports.UintTy, exports.BoolTy],
    1760647349: [exports.BoolTy, exports.AddressTy, exports.UintTy, exports.AddressTy],
    194640930: [exports.BoolTy, exports.AddressTy, exports.StringTy, exports.UintTy],
    2805734838: [exports.BoolTy, exports.AddressTy, exports.StringTy, exports.StringTy],
    3804222987: [exports.BoolTy, exports.AddressTy, exports.StringTy, exports.BoolTy],
    1870422078: [exports.BoolTy, exports.AddressTy, exports.StringTy, exports.AddressTy],
    1287000017: [exports.BoolTy, exports.AddressTy, exports.BoolTy, exports.UintTy],
    1248250676: [exports.BoolTy, exports.AddressTy, exports.BoolTy, exports.StringTy],
    1788626827: [exports.BoolTy, exports.AddressTy, exports.BoolTy, exports.BoolTy],
    474063670: [exports.BoolTy, exports.AddressTy, exports.BoolTy, exports.AddressTy],
    1384430956: [exports.BoolTy, exports.AddressTy, exports.AddressTy, exports.UintTy],
    3625099623: [exports.BoolTy, exports.AddressTy, exports.AddressTy, exports.StringTy],
    1180699616: [exports.BoolTy, exports.AddressTy, exports.AddressTy, exports.BoolTy],
    487903233: [exports.BoolTy, exports.AddressTy, exports.AddressTy, exports.AddressTy],
    1024368100: [exports.AddressTy, exports.UintTy, exports.UintTy, exports.UintTy],
    2301889963: [exports.AddressTy, exports.UintTy, exports.UintTy, exports.StringTy],
    3964381346: [exports.AddressTy, exports.UintTy, exports.UintTy, exports.BoolTy],
    519451700: [exports.AddressTy, exports.UintTy, exports.UintTy, exports.AddressTy],
    4111650715: [exports.AddressTy, exports.UintTy, exports.StringTy, exports.UintTy],
    2119616147: [exports.AddressTy, exports.UintTy, exports.StringTy, exports.StringTy],
    2751614737: [exports.AddressTy, exports.UintTy, exports.StringTy, exports.BoolTy],
    3698927108: [exports.AddressTy, exports.UintTy, exports.StringTy, exports.AddressTy],
    1770996626: [exports.AddressTy, exports.UintTy, exports.BoolTy, exports.UintTy],
    2391690869: [exports.AddressTy, exports.UintTy, exports.BoolTy, exports.StringTy],
    4272018778: [exports.AddressTy, exports.UintTy, exports.BoolTy, exports.BoolTy],
    602229106: [exports.AddressTy, exports.UintTy, exports.BoolTy, exports.AddressTy],
    2782496616: [exports.AddressTy, exports.UintTy, exports.AddressTy, exports.UintTy],
    1567749022: [exports.AddressTy, exports.UintTy, exports.AddressTy, exports.StringTy],
    4051804649: [exports.AddressTy, exports.UintTy, exports.AddressTy, exports.BoolTy],
    3961816175: [exports.AddressTy, exports.UintTy, exports.AddressTy, exports.AddressTy],
    2764647008: [exports.AddressTy, exports.StringTy, exports.UintTy, exports.UintTy],
    1561552329: [exports.AddressTy, exports.StringTy, exports.UintTy, exports.StringTy],
    2116357467: [exports.AddressTy, exports.StringTy, exports.UintTy, exports.BoolTy],
    3755464715: [exports.AddressTy, exports.StringTy, exports.UintTy, exports.AddressTy],
    2706362425: [exports.AddressTy, exports.StringTy, exports.StringTy, exports.UintTy],
    1560462603: [exports.AddressTy, exports.StringTy, exports.StringTy, exports.StringTy],
    900007711: [exports.AddressTy, exports.StringTy, exports.StringTy, exports.BoolTy],
    2689478535: [exports.AddressTy, exports.StringTy, exports.StringTy, exports.AddressTy],
    3877655068: [exports.AddressTy, exports.StringTy, exports.BoolTy, exports.UintTy],
    3154862590: [exports.AddressTy, exports.StringTy, exports.BoolTy, exports.StringTy],
    1595759775: [exports.AddressTy, exports.StringTy, exports.BoolTy, exports.BoolTy],
    542667202: [exports.AddressTy, exports.StringTy, exports.BoolTy, exports.AddressTy],
    2350461865: [exports.AddressTy, exports.StringTy, exports.AddressTy, exports.UintTy],
    4158874181: [exports.AddressTy, exports.StringTy, exports.AddressTy, exports.StringTy],
    233909110: [exports.AddressTy, exports.StringTy, exports.AddressTy, exports.BoolTy],
    221706784: [exports.AddressTy, exports.StringTy, exports.AddressTy, exports.AddressTy],
    3255869470: [exports.AddressTy, exports.BoolTy, exports.UintTy, exports.UintTy],
    2606272204: [exports.AddressTy, exports.BoolTy, exports.UintTy, exports.StringTy],
    2244855215: [exports.AddressTy, exports.BoolTy, exports.UintTy, exports.BoolTy],
    227337758: [exports.AddressTy, exports.BoolTy, exports.UintTy, exports.AddressTy],
    2652011374: [exports.AddressTy, exports.BoolTy, exports.StringTy, exports.UintTy],
    1197235251: [exports.AddressTy, exports.BoolTy, exports.StringTy, exports.StringTy],
    1353532957: [exports.AddressTy, exports.BoolTy, exports.StringTy, exports.BoolTy],
    436029782: [exports.AddressTy, exports.BoolTy, exports.StringTy, exports.AddressTy],
    3484780374: [exports.AddressTy, exports.BoolTy, exports.BoolTy, exports.UintTy],
    3754205928: [exports.AddressTy, exports.BoolTy, exports.BoolTy, exports.StringTy],
    3401856121: [exports.AddressTy, exports.BoolTy, exports.BoolTy, exports.BoolTy],
    3476636805: [exports.AddressTy, exports.BoolTy, exports.BoolTy, exports.AddressTy],
    3698398930: [exports.AddressTy, exports.BoolTy, exports.AddressTy, exports.UintTy],
    769095910: [exports.AddressTy, exports.BoolTy, exports.AddressTy, exports.StringTy],
    2801077007: [exports.AddressTy, exports.BoolTy, exports.AddressTy, exports.BoolTy],
    1711502813: [exports.AddressTy, exports.BoolTy, exports.AddressTy, exports.AddressTy],
    1425929188: [exports.AddressTy, exports.AddressTy, exports.UintTy, exports.UintTy],
    2647731885: [exports.AddressTy, exports.AddressTy, exports.UintTy, exports.StringTy],
    3270936812: [exports.AddressTy, exports.AddressTy, exports.UintTy, exports.BoolTy],
    3603321462: [exports.AddressTy, exports.AddressTy, exports.UintTy, exports.AddressTy],
    69767936: [exports.AddressTy, exports.AddressTy, exports.StringTy, exports.UintTy],
    566079269: [exports.AddressTy, exports.AddressTy, exports.StringTy, exports.StringTy],
    1863997774: [exports.AddressTy, exports.AddressTy, exports.StringTy, exports.BoolTy],
    2406706454: [exports.AddressTy, exports.AddressTy, exports.StringTy, exports.AddressTy],
    2513854225: [exports.AddressTy, exports.AddressTy, exports.BoolTy, exports.UintTy],
    2858762440: [exports.AddressTy, exports.AddressTy, exports.BoolTy, exports.StringTy],
    752096074: [exports.AddressTy, exports.AddressTy, exports.BoolTy, exports.BoolTy],
    2669396846: [exports.AddressTy, exports.AddressTy, exports.BoolTy, exports.AddressTy],
    3982404743: [exports.AddressTy, exports.AddressTy, exports.AddressTy, exports.UintTy],
    4161329696: [exports.AddressTy, exports.AddressTy, exports.AddressTy, exports.StringTy],
    238520724: [exports.AddressTy, exports.AddressTy, exports.AddressTy, exports.BoolTy],
    1717301556: [exports.AddressTy, exports.AddressTy, exports.AddressTy, exports.AddressTy],
};
//# sourceMappingURL=logger.js.map