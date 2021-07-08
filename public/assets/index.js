const html = `{{html}}`;

const ScriptRender = {
    created () {
        eval(this.$slots.default()[0].children);
    },
    template: '<div></div>',
};

const CompRender = {
    // components: { ScriptRender },
    // template: '<h1>Test ...</h1><script-render>console.log(111);</script-render>',
    directives: {
        connectxml: {
            mounted (el) {
                el.innerHTML = html;
                el.addEventListener('mouseover', ev => {
                    if (ev.target.innerText) {
                        ev.target.style.border = '1px solid red';
                        ev.target.style.backgroundColor = 'rgb(245 108 108 / 32%)';
                    }
                });
            },
        }
    },
    template: '<div v-connectxml></div>',
};

const App = {
    components: { CompRender },
    data () {
        return {
            message: 'Hello Element Plus',
        };
    },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount('#app');
