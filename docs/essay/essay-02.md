# 2023/07/13想法来源

### redirect重定向

- 首先两次解析一次服务器、一次浏览器。
- "redirect:/person/outer.html"中的person目录是在webapp目录中，这样才会生效。
- 可以跳转到页面，也可以跳转到方法中，如return "redirect:/show/list"; 。
- 重定向到 /show/list 地址。效果：页面上能够显示数据，而且浏览器地址栏从删除操作地址变成了 /show/list。用户刷新浏览器访问的就是 /show/list 地址，而这个查询操作是可以缓存的。
- 注意类上的注解@RespController会使跳转页面变成文本，可以改为@Controller。

```java
@RequestMapping("/dispatcher/command/redirect")
    public String redirectCommand() {

        // 使用 redirect: 指令执行重定向操作
        // 注意：SpringMVC 会自动替我们加上 contextPath，我们再加就会多一个
        return "redirect:/person/outer.html";
    }
```