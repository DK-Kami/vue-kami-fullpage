import KamiFullpage from 'KamiFullpage';

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

export default KamiFullpage;
