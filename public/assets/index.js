const html = `{{html}}`;

const ScriptRender = {
    created () {
        eval(this.$slots.default()[0].children);
    },
    template: '<div></div>',
};

//获取xpath
function readXPath (element) {
    if (element.id !== "") {//判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
        return '//*[@id=\"' + element.id + '\"]';
    }
    //这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
    if (element == document.body) {//递归到body处，结束递归
        return '/html/' + element.tagName.toLowerCase();
    }
    var ix = 1,//在nodelist中的位置，且每次点击初始化
        siblings = element.parentNode.childNodes;//同级的子元素

    for (var i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        //如果这个元素是siblings数组中的元素，则执行递归操作
        if (sibling == element) {
            return arguments.callee(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
            //如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
        } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            ix++;
        }
    }
};

const els = {};

const CompRender = {
    // components: { ScriptRender },
    // template: '<h1>Test ...</h1><script-render>console.log(111);</script-render>',
    directives: {
        connectxml: {
            mounted (el) {
                el.innerHTML = html;
                el.addEventListener('mouseover', ev => {
                    const el = ev.target;
                    const xpath = readXPath(el);
                    if (!els[xpath]) els[xpath] = { border: el.style.border, backgroundColor: el.style.backgroundColor };
                    el.style.border = '1px solid red';
                    el.style.backgroundColor = 'rgb(245 108 108 / 32%)';
                    function mouseout (eve) {
                        const ele = eve.target;
                        const x = readXPath(ele);
                        ele.style.border = els[x].border;
                        ele.style.backgroundColor = els[x].backgroundColor;
                        ele.removeEventListener('mouseout', mouseout);
                    }
                    el.addEventListener('mouseout', mouseout);
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
