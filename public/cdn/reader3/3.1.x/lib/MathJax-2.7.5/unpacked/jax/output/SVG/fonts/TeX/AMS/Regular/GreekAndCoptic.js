/*************************************************************
 *
 *  MathJax/jax/output/SVG/fonts/TeX/svg/AMS/Regular/GreekAndCoptic.js
 *
 *  Copyright (c) 2011-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

MathJax.Hub.Insert(
  MathJax.OutputJax.SVG.FONTDATA.FONTS['MathJax_AMS'],
  {
    // GREEK SMALL LETTER DIGAMMA
    0x3DD: [605,85,778,55,719,'477 261Q477 257 473 256T455 253T417 251T348 250H235L155 -77L146 -82Q137 -85 109 -85Q55 -85 55 -77L139 261Q224 596 226 598Q229 603 239 603Q240 603 254 603T290 603T341 604T405 605T477 605Q656 603 687 602T719 596Q719 589 692 588T513 585H319L282 427L242 272Q242 270 351 270Q388 270 410 270T444 269T460 267T469 265T477 261'],

    // GREEK KAPPA SYMBOL
    0x3F0: [434,6,667,37,734,'228 325Q170 322 156 316T127 309Q108 309 104 314Q99 319 99 322T108 341Q125 376 171 400T268 425H271Q302 425 319 396Q328 377 328 358Q328 332 324 314Q311 270 286 221Q274 194 274 192H275Q339 234 484 325T639 421Q669 434 691 434T723 425T734 406Q734 394 719 381Q715 376 644 330L575 287L566 267Q543 233 526 176Q520 160 515 143T508 115T506 105Q506 103 533 103Q585 103 607 110T641 118Q670 118 670 107Q670 100 661 85Q643 50 598 27T504 3Q465 3 450 36Q441 51 441 73Q441 84 444 96Q452 146 484 205L497 236L324 125Q143 12 135 10Q103 -6 77 -6Q61 -6 49 2T37 21Q37 36 49 46T124 96L195 141L204 156Q219 179 243 248T264 323Q264 325 228 325']
  }
);

MathJax.Ajax.loadComplete(MathJax.OutputJax.SVG.fontDir+"/AMS/Regular/GreekAndCoptic.js");
