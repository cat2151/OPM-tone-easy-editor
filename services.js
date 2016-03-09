angular.module('generatorApp')
.service('GeneratorService', [
function() {
  function generate(p) {
    var s = '';
    s += '#OPM@0{';
    s += p.alg + ',';
    s += p.fb + ',';
    s += '\n';
    var i;
    for (i = 0; i < 4; i++) {
      s += p['op' + i + 'ar'] + ',';
      s += p['op' + i + 'dr'] + ',';
      s += p['op' + i + 'sr'] + ',';
      s += p['op' + i + 'rr'] + ',';
      s += p['op' + i + 'sl'] + ',';
      s += p['op' + i + 'tl'] + ',';
      s += p['op' + i + 'ks'] + ',';
      s += p['op' + i + 'mul'] + ',';
      s += p['op' + i + 'dt1'] + ',';
      s += p['op' + i + 'dt2'] + ',';
      s += p['op' + i + 'ams']// + ',';
      s += '\n';
    }
    s += '};';
    s += '%6@0 cde;';
    return s;
  }

  return {
    generate: generate
  };
}]);
