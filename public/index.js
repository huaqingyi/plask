/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
const html = `
<div class="page-wrap">
<header class="navbar navbar-fixed-top navbar-empty">
<div class="container">
<div class="center-logo">
<svg width="24" height="24" class="tanuki-logo" viewBox="0 0 36 36">
  <path class="tanuki-shape tanuki-left-ear" fill="#e24329" d="M2 14l9.38 9v-9l-4-12.28c-.205-.632-1.176-.632-1.38 0z"></path>
  <path class="tanuki-shape tanuki-right-ear" fill="#e24329" d="M34 14l-9.38 9v-9l4-12.28c.205-.632 1.176-.632 1.38 0z"></path>
  <path class="tanuki-shape tanuki-nose" fill="#e24329" d="M18,34.38 3,14 33,14 Z"></path>
  <path class="tanuki-shape tanuki-left-eye" fill="#fc6d26" d="M18,34.38 11.38,14 2,14 6,25Z"></path>
  <path class="tanuki-shape tanuki-right-eye" fill="#fc6d26" d="M18,34.38 24.62,14 34,14 30,25Z"></path>
  <path class="tanuki-shape tanuki-left-cheek" fill="#fca326" d="M2 14L.1 20.16c-.18.565 0 1.2.5 1.56l17.42 12.66z"></path>
  <path class="tanuki-shape tanuki-right-cheek" fill="#fca326" d="M34 14l1.9 6.16c.18.565 0 1.2-.5 1.56L18 34.38z"></path>
</svg>

</div>
</div>
</header>

<div class="login-page-broadcast">

</div>
<div class="container navless-container">
<div class="content">
<div class="flash-container flash-container-page">
</div>

<div class="row">
<div class="col-sm-5 pull-right new-session-forms-container">
<div>
<ul class="nav-links new-session-tabs nav-tabs" role="tablist">
<li class="active" role="presentation">
<a data-toggle="tab" href="#login-pane" role="tab">登录</a>
</li>
<li role="presentation">
<a data-toggle="tab" href="#register-pane" role="tab">注册</a>
</li>
</ul>

<div class="tab-content">
<div class="login-box tab-pane active" id="login-pane" role="tabpanel">
<div class="login-body">
<form class="new_user gl-show-field-errors" aria-live="assertive" id="new_user" action="/users/sign_in" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="6s3Y7U6J+c5C4YIBJRkAzdgAxWsoUC+1bh+rE0jAr3YeuB7TMXAb7ANMkMGE+1nT1NqorCx9BGAUDaOubJf4IQ=="><div class="form-group">
<label for="user_login">用户名或邮箱</label>
<input class="form-control top" autofocus="autofocus" autocapitalize="off" autocorrect="off" required="required" title="必填项" type="text" name="user[login]" id="user_login">
</div>
<div class="form-group">
<label for="password">密码</label>
<input class="form-control bottom" required="required" title="必填项" type="password" name="user[password]" id="user_password">
</div>
<div class="remember-me checkbox">
<label for="user_remember_me">
<input name="user[remember_me]" type="hidden" value="0"><input class="remember-me-checkbox" type="checkbox" value="1" name="user[remember_me]" id="user_remember_me">
<span>记住我</span>
</label>
<div class="pull-right forgot-password">
<a href="/users/password/new">忘记密码？</a>
</div>
</div>
<div class="submit-container move-submit-down">
<input type="submit" name="commit" value="登录" class="btn btn-save">
</div>
</form>
</div>
</div>

<div class="tab-pane login-box" id="register-pane" role="tabpanel">
<div class="login-body">
<form class="new_new_user gl-show-field-errors" aria-live="assertive" id="new_new_user" action="/users" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="7g+xaKx2FkuRDjMY6w/j4X/S1n8C0WWWMOHcJNh1AcgaendW04/0adCjIdhK7br/cwi7uAb8TkNK89SZ/CJWnw=="><div class="devise-errors">

</div>
<div class="form-group">
<label for="new_user_name">Full name</label>
<input class="form-control top" required="required" title="This field is required." type="text" name="new_user[name]" id="new_user_name">
</div>
<div class="username form-group">
<label for="new_user_username">Username</label>
<input class="form-control middle" pattern="[a-zA-Z0-9_\.][a-zA-Z0-9_\-\.]*[a-zA-Z0-9_\-]|[a-zA-Z0-9_]" required="required" title="Please create a username with only alphanumeric characters." type="text" name="new_user[username]" id="new_user_username">
<p class="validation-error hide">Username is already taken.</p>
<p class="validation-success hide">Username is available.</p>
<p class="validation-pending hide">Checking username availability...</p>
</div>
<div class="form-group">
<label for="new_user_email">Email</label>
<input class="form-control middle" required="required" title="Please provide a valid email address." type="email" value="" name="new_user[email]" id="new_user_email">
</div>
<div class="form-group">
<label for="new_user_email_confirmation">Email confirmation</label>
<input class="form-control middle" required="required" title="Please retype the email address." type="email" name="new_user[email_confirmation]" id="new_user_email_confirmation">
</div>
<div class="form-group append-bottom-20" id="password-strength">
<label for="new_user_password">密码</label>
<input class="form-control bottom" required="required" pattern=".{8,}" title="Minimum length is 8 characters." type="password" name="new_user[password]" id="new_user_password">
<p class="gl-field-hint">Minimum length is 8 characters</p>
</div>

<div></div>
<div class="submit-container">
<input type="submit" name="commit" value="Register" class="btn-register btn">
</div>
</form></div>
</div>
<div class="clearfix submit-container">
<p>
<span class="light">Didn't receive a confirmation email?</span>
<a href="/users/confirmation/new">Request a new one</a>.
</p>
</div>

</div>
</div>

</div>
<div class="col-sm-7 brand-holder pull-left">
<h1>
GitLab Enterprise Edition
</h1>

<h3>用于代码协作的开源软件</h3>
<p>
细粒度访问控制管理 git 仓库以保证代码安全。
使用合并请求进行代码审查并加强团体合作。
每个项目均有自己的问题跟踪和维基页面。
</p>
</div>
</div>
</div>
</div>
<hr class="footer-fixed">
<div class="container footer-container">
<div class="footer-links">
<a href="/explore">浏览</a>
<a href="/help">帮助</a>
<a href="https://about.gitlab.com/">关于 GitLab</a>
<a href="https://gitlab.com/xhang/gitlab/">中文社区版</a>
</div>
</div>
</div>


`;

const ScriptRender = {
    created() {
        eval(this.$slots.default()[0].children);
    },
    template: '<div></div>',
};

//获取xpath
function readXPath(element) {
    // if (element.id !== "") {//判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
    //     return '//*[@id=\"' + element.id + '\"]';
    // }
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
            mounted(el, { value }) {
                el.innerHTML = html;
                el.addEventListener('mouseover', ev => {
                    const el = ev.target;
                    const xpath = readXPath(el);
                    const click = e => {
                        e.preventDefault();
                        e.stopPropagation();
                        value(e, xpath);
                    };
                    el.addEventListener('click', click);
                    if (!els[xpath]) els[xpath] = { border: el.style.border, backgroundColor: el.style.backgroundColor };
                    el.style.border = '1px solid red';
                    el.style.backgroundColor = 'rgb(245 108 108 / 32%)';
                    function mouseout(eve) {
                        const ele = eve.target;
                        const x = readXPath(ele);
                        ele.style.border = els[x].border;
                        ele.style.backgroundColor = els[x].backgroundColor;
                        ele.removeEventListener('mouseout', mouseout);
                        el.removeEventListener('click', click);
                    }
                    el.addEventListener('mouseout', mouseout);
                });
            },
        }
    },
    methods: {
        onClick(event, xpath) {
            this.$emit('click', { event, xpath });
        },
    },
    template: '<div v-connectxml="onClick"></div>',
};

const App = {
    components: { CompRender },
    data() {
        return {
            url: '',
            message: 'Element Plus',
            visible: false,
            cvisible: false,
            tableData: [],
            form: { xpath: '', name: '', type: 'text' },
            cform: { type: 'text' },
            rules: {
                xpath: [{ required: true, message: 'XPath 不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '名称 不能为空', trigger: 'blur' }],
                type: [{ required: true, message: '请选择 采集方式', trigger: 'change' }],
            },
        };
    },
    methods: {
        onChange(type) {
            if (type === 'url') {
                this.cvisible = true;
                this.cform.type = 'text';
            }
        },
        handleClose() {
            this.visible = false;
        },
        handleOk() {
            console.log(222, this.form);
            this.handleClose();
        },
        chandleClose() {
            this.visible = false;
        },
        chandleOk() {
            console.log(222, this.form);
            this.handleClose();
        },
        onClick({ event, xpath }) {
            // console.log(222, event, xpath);
            this.form.xpath = xpath;
            this.form.type = 'text';
            this.visible = true;
        },
    },
};
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount('#app');
