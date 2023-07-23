# 2023/07/16想法来源

### 1. <mvc:default-servlet-handler/>的作用

- 是对没有@RequestMapping注解的请求不返回404，而是交给DefaultServletHttpHandler组件，由这个组件转发

```xml
<!-- mvc:default-servlet-handler 标签的作用：在 IOC 容器中加入一个组件：DefaultServletHttpRequestHandler。 -->
    <!-- 有了 DefaultServletHttpRequestHandler 这个组件，SpringMVC 对待没有 @RequestMapping 的请求不会粗暴的返回 404。 -->
    <!-- 这样的请求会被交给 DefaultServletHttpRequestHandler 组件，由 DefaultServletHttpRequestHandler 转发到目标地址。 -->
    <mvc:default-servlet-handler/>
```

- 代码解析：
    
    所在类：org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler
    
    关键方法：handleRequest()方法
    
    大体机制：SpringMVC 首先查找是否存在和当前请求对应的 @RequestMapping；如果没有，则调用handleRequest()方法转发到目标资源。
    
    ```java
    @Override
    public void handleRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
      
      Assert.state(this.servletContext != null, "No ServletContext set");
      RequestDispatcher rd = this.servletContext.getNamedDispatcher(this.defaultServletName);
      if (rd == null) {
        throw new IllegalStateException("A RequestDispatcher could not be located for the default servlet '" +
        this.defaultServletName + "'");
      }
        
        // 这里执行请求转发操作
      rd.forward(request, response);
    }
    ```