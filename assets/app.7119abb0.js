import{_ as i,U as u,a2 as o,V as p,a3 as l,a4 as d,a5 as f,a6 as _,a7 as m,a8 as h,a9 as v,aa as A,ab as y,ac as g,ad as x,d as P,u as w,j as C,A as R,ae as T,af as b,ag as E}from"./chunks/framework.abdadb92.js";import{t as r}from"./chunks/theme.84cb34dc.js";const j={},D=u('<h1 class="name" data-v-5589edc8><span class="clip" data-v-5589edc8>mellow</span></h1><p class="text" style="font-size:36px;" data-v-5589edc8>朝辞白帝彩云间，千里江陵一日还。</p><p class="text" style="font-size:36px;" data-v-5589edc8>两岸猿声啼不住，轻舟已过万重山。</p><p class="pname" style="font-size:28px;" data-v-5589edc8>每天生活好一点</p><p class="tagline" style="font-size:22px;" data-v-5589edc8>个人博客，记录java学习的笔记本</p>',5);function L(e,a){return D}const S=i(j,[["render",L],["__scopeId","data-v-5589edc8"]]),V={...r,Layout(){return o(r.Layout,null,{"home-hero-info":()=>o(S)})},enhanceApp({app:e}){}};function c(e){if(e.extends){const a=c(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=c(V),z=P({name:"VitePressApp",setup(){const{site:e}=w();return C(()=>{R(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),T(),b(),E(),s.setup&&s.setup(),()=>o(s.Layout)}});async function O(){const e=I(),a=F();a.provide(d,e);const t=f(e.route);return a.provide(_,t),a.component("Content",m),a.component("ClientOnly",h),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:v}),{app:a,router:e,data:t}}function F(){return A(z)}function I(){let e=p,a;return y(t=>{let n=g(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),p&&(e=!1),x(()=>import(n),[])):null},s.NotFound)}p&&O().then(({app:e,router:a,data:t})=>{a.go().then(()=>{l(a.route,t.site),e.mount("#app")})});export{O as createApp};
