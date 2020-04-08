(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('KamiFullpage')) :
  typeof define === 'function' && define.amd ? define(['exports', 'KamiFullpage'], factory) :
  (global = global || self, factory(global.KamiFullpage = {}, global.KamiFullpage));
}(this, (function (exports, KamiFullpage) { 'use strict';

  KamiFullpage = KamiFullpage && Object.prototype.hasOwnProperty.call(KamiFullpage, 'default') ? KamiFullpage['default'] : KamiFullpage;

  var plugin = {
    installed: false,

    install: function install(Vue, ref) {
      var name = ref.name;

      if (this.installed) { return; }
      this.installed = true;

      name = name || KamiFullpage.name;
      Vue.component(name, KamiFullpage);
    },
  };

  var ref = window || global;
  var Vue = ref.Vue;
  if (Vue) {
    Vue.use(plugin);
  }

  exports.default = KamiFullpage;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
