# 2023/07/15想法来源

### 关于代理模式中目标类加载器的解读

1. 代理工厂类的成员方法的一部分
    
    ```java
    public T getProxy() {
    
            // Proxy.newProxyInstance() 方法所需参数一：目标类对应的类加载器
            ClassLoader classLoader = this.target.getClass().getClassLoader();
    ......
    ```
    
    ![层01-ClassLoader&AppClassLoader](2023%2007%2015%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%206c0e0fb64a97473f9b42ee68c1c738c2/Untitled.png)
    
    层01-ClassLoader&AppClassLoader
    
    ![层02-ClassLoader&PlatfromClassLoade](2023%2007%2015%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%206c0e0fb64a97473f9b42ee68c1c738c2/Untitled%201.png)
    
    层02-ClassLoader&PlatfromClassLoade
    
    ![层03-ClassLoader&BootClassLoader](2023%2007%2015%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%206c0e0fb64a97473f9b42ee68c1c738c2/Untitled%202.png)
    
    层03-ClassLoader&BootClassLoader
    
    <aside>
    💡 注意点：以上可以联想到类加载器的过程，比如启动类加载器，应用类加载器，扩展类加载器
    
    </aside>
    

### 关于ApplicationContext:

![AnnotationConfigApplicationContext.png](2023%2007%2015%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%206c0e0fb64a97473f9b42ee68c1c738c2/AnnotationConfigApplicationContext.png)

IOC容器内容在**private final DefaultListableBeanFactory beanFactory; 此final字段在GenericApplicationContext类中**

带DefaultListableBeanFactory类的关系图：

![AnnotationConfigApplicationContext.png](2023%2007%2015%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%206c0e0fb64a97473f9b42ee68c1c738c2/AnnotationConfigApplicationContext%201.png)

dug功能查看ioc容器的beanDefinitionMap中的内容，里边包含IOC容器的bean

在AbstractGenericContextLoader类中的loadContext方法中得到context内容

```java
// 注意下边的：this.loadBeanDefinitions(context, mergedConfig);
// AnnotationConfigUtils.registerAnnotationConfigProcessors(context);
// 执行这两行后，context中才会有内容

public final ConfigurableApplicationContext loadContext(MergedContextConfiguration mergedConfig) throws Exception {
        if (logger.isDebugEnabled()) {
            logger.debug(String.format("Loading ApplicationContext for merged context configuration [%s].", mergedConfig));
        }

        this.validateMergedContextConfiguration(mergedConfig);
				// 这里很重要
        GenericApplicationContext context = this.createContext();
        ApplicationContext parent = mergedConfig.getParentApplicationContext();
        if (parent != null) {
            context.setParent(parent);
        }

        this.prepareContext(context);
        this.prepareContext(context, mergedConfig);
        this.customizeBeanFactory(context.getDefaultListableBeanFactory());
        this.loadBeanDefinitions(context, mergedConfig);
        AnnotationConfigUtils.registerAnnotationConfigProcessors(context);
        this.customizeContext(context);
        this.customizeContext(context, mergedConfig);
        context.refresh();
        context.registerShutdownHook();
        return context;
    }
```

### 关于IOC容器失败报错的一点：

- org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.mellow.aop.impl.SonImpl' available
- 一个接口（FatherInteger.java）、两个实现类（一个实现类也会出现问题）SonImpl.java、DaughterImpl.java，如果不走切入点表达式或者不使用AOP代理，也能正常获取。如果想要使用代理，并且不报错，只能不重写接口的抽象方法，比如接口中没有方法，实现类有自己特有方法或没有方法，就不会报错。
- 原因分析：
    - 应用了切面后，真正放在IOC容器中的是代理类的对象
    - 目标类并没有被放到IOC容器中，所以根据目标类的类型从IOC容器中是找不到的