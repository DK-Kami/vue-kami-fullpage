import KamiFullpage from 'KamiFullpage';

const plugin = {
  installed: false,

  install(Vue, { name }) {
    if (this.installed) return;
    this.installed = true;

    name = name || KamiFullpage.name;
    Vue.component(name, KamiFullpage);
  },
};

const { Vue } = window || global;
if (Vue) {
  Vue.use(plugin);
}

export default KamiFullpage;
