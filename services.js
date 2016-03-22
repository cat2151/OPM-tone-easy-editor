angular.module('generatorApp')
.service('GeneratorService', [
function() {
  function generate(p) {
    var s = '';
    s += '#OPM@0{';
    s += p.alg + ',';
    s += p.fb + ',';
    s += '\n';
    var OPM_COMMENT = '/*AR DR  SR  RR  SL  TL  KS MUL DT1 DT2 AMS*/' + '\n';
    s += OPM_COMMENT;
    var i;
    for (i = 0; i < 4; i++) {
      s += pd(p['op' + i + 'ar']) + ',';
      s += pd(p['op' + i + 'dr']) + ',';
      s += pd(p['op' + i + 'sr']) + ',';
      s += pd(p['op' + i + 'rr']) + ',';
      s += pd(p['op' + i + 'sl']) + ',';
      s += pd(p['op' + i + 'tl']) + ',';
      s += pd(p['op' + i + 'ks']) + ',';
      s += pd(p['op' + i + 'mul']) + ',';
      s += pd(p['op' + i + 'dt1']) + ',';
      s += pd(p['op' + i + 'dt2']) + ',';
      s += pd(p['op' + i + 'ams'])// + ',';
      s += '\n';
    }
    s += '};';
    s += '%6@0' + p.previewPhrase;
    return s;
  }

  function pd(i) { // padding(¶–„‚ßA”¼Špspace)
   var s = "  " + String(i);
   return s.substr(s.length - 3);
  }

  return {
    generate: generate
  };
}]);
