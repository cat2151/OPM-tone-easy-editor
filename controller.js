angular.module('generatorApp')
.controller('generatorController', ['$scope', '$location', '$timeout', 'GeneratorService',
function($scope, $location, $timeout, GeneratorService) {

  $scope.p = {ed: {}, tone1: {}, tone2: {}};
  $scope.p.targetToneNum = 0; // [補足] ed配下にはしない。edとtone1とtone2とのやりとりで更新されないようにする為
  $scope.p.ed.alg = 0;
  $scope.p.ed.alg = 0;
  $scope.p.ed.fb = 0;
  var i;
  for (i = 0; i < 4; i++) {
    $scope.p.ed['op' + i + 'ar'] = 12;
    $scope.p.ed['op' + i + 'dr'] = 4;
    $scope.p.ed['op' + i + 'sr'] = 4;
    $scope.p.ed['op' + i + 'rr'] = 4;
    $scope.p.ed['op' + i + 'sl'] = 0;
    $scope.p.ed['op' + i + 'tl'] = 32;
    $scope.p.ed['op' + i + 'ks'] = 0;
    $scope.p.ed['op' + i + 'mul'] = 1;
    $scope.p.ed['op' + i + 'dt1'] = 4;
    $scope.p.ed['op' + i + 'dt2'] = 0;
    $scope.p.ed['op' + i + 'ams'] = 0;
  }
  $scope.p.ed.op3tl = 0;
  $scope.p.ed.previewPhrase = 'cde';
  angular.copy($scope.p.ed, $scope.p.tone1);
  angular.copy($scope.p.ed, $scope.p.tone2);

  function createRadios(min, max, step) {
    var radios = [];
    var i;
    var o;
    for (i = min; i < max + 1; i += step) {
      o = {id:i, name:"" + i};
      radios.push(o);
    }
    return radios;
  }
  $scope.algRadios = createRadios(0, 7, 1);
  $scope.fbRadios = createRadios(0, 7, 1);
  $scope.arRadios = createRadios(0, 31, 4);
  $scope.drRadios = createRadios(0, 31, 4);
  $scope.srRadios = createRadios(0, 31, 4);
  $scope.rrRadios = createRadios(0, 15, 3);
  $scope.slRadios = createRadios(0, 15, 3);
  $scope.tlRadios = createRadios(0, 127, 16);
  $scope.ksRadios = createRadios(0, 3, 1);
  $scope.mulRadios = createRadios(0, 15, 1);
  $scope.dt1Radios = createRadios(0, 7, 1);
  $scope.dt2Radios = createRadios(0, 3, 1);
  $scope.amsRadios = createRadios(0, 3, 1);

  $scope.generate = function() {
    if ($scope.p.targetToneNum == 0) { // for URL
      angular.copy($scope.p.ed, $scope.p.tone1);
    } else {
      angular.copy($scope.p.ed, $scope.p.tone2);
    }
    $scope.generatedMml = GeneratorService.generate($scope.p.ed);
    //console.log($scope.generatedMml);
    SIOPM.compile($scope.generatedMml);
  };

  $scope.changeTargetToneNum = function() {
    if ($scope.p.targetToneNum == 0) { // 保存データから読み込み
      angular.copy($scope.p.tone1, $scope.p.ed);
    } else {
      angular.copy($scope.p.tone2, $scope.p.ed);
    }
    $scope.generate();
  }

  $scope.play = function() {
    // TODO (優先度低)generatedMmlから$scope.pへの反映と、$scope.p.ed.previewPhraseへの反映。
    SIOPM.compile($scope.generatedMml);
  }

  SIOPM.onLoad = function() {
    // TODO 追々、chordGen同様パラメータ入出力を実装するつもり
    return;
  };

  SIOPM.onCompileComplete = function() {
    SIOPM.play();
  };

  SIOPM.initialize(); // [前提] SIOPMのプロパティへ各functionを代入し終わっていること
  $timeout(function() {
//TODO 追々やるつもり    setParamsFromUrl(); // [前提] $scopeのプロパティへ各functionを代入し終わっていること
  }, 0);

}]);
