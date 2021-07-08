const html = `
    <div class="timeout hide">
        <div class="timeout-img"></div>
        <div class="timeout-title">网络不给力，请稍后重试</div>
        <button type="button" class="timeout-button">返回首页</button>
    </div>
    <div class="timeout-feedback hide">
        <div class="timeout-feedback-icon"></div>
        <p class="timeout-feedback-title">问题反馈</p>
    </div>

<script src="https://wappass.baidu.com/static/machine/js/api/mkd.js"></script>
<script src="https://ppui-static-wap.cdn.bcebos.com/static/touch/js/mkdjump_fbb9952.js"></script>

`;

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
