# 2023/07/19想法来源

### 关于beanFactory的过程

> 方法的的调用过程是一层层的向前调用，然后方法体从上到下结束，在一层层向后返回结果的过程。
> 
1. *根据 XML 形式的配置文件创建 IOC 容器对象*
    
    ```java
    // 根据 XML 形式的配置文件创建 IOC 容器对象
        private ApplicationContext iocContainer =
                new ClassPathXmlApplicationContext("spring-context.xml");
    ```
    
    类向前的调用过程：
    
    - ClassPathXmlApplicationContext→
        - AbstractXmlApplication→
            - AbstractRefreshableConfigApplicationContext→
                - AbstractRefreshableApplicationContext→
                    - AbstractApplicationContext
    
    ![Untitled](2023%2007%2019%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%208b8ee3b550dc483f867cd8c7c5f53739/Untitled.png)
    
    ---
    
    解读this.refresh();，指向AbstractApplication的refresh方法，这是多态的体现。
    
    ```java
    public ClassPathXmlApplicationContext(String[] configLocations, boolean refresh, @Nullable ApplicationContext parent) throws BeansException {
            super(parent);
            this.setConfigLocations(configLocations);
            if (refresh) {
                this.refresh();
            }
    
        }
    ```
    
    - AbstractApplication的refresh方法
    
    ```java
    public void refresh() throws BeansException, IllegalStateException {
            synchronized(this.startupShutdownMonitor) {
                StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");
                this.prepareRefresh();
                ConfigurableListableBeanFactory beanFactory = this.obtainFreshBeanFactory();
                this.prepareBeanFactory(beanFactory);
    
                try {
                    this.postProcessBeanFactory(beanFactory);
                    StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
                    this.invokeBeanFactoryPostProcessors(beanFactory);
                    this.registerBeanPostProcessors(beanFactory);
                    beanPostProcess.end();
                    this.initMessageSource();
                    this.initApplicationEventMulticaster();
                    this.onRefresh();
                    this.registerListeners();
                    this.finishBeanFactoryInitialization(beanFactory);
                    this.finishRefresh();
                } catch (BeansException var10) {
                    if (this.logger.isWarnEnabled()) {
                        this.logger.warn("Exception encountered during context initialization - cancelling refresh attempt: " + var10);
                    }
    
                    this.destroyBeans();
                    this.cancelRefresh(var10);
                    throw var10;
                } finally {
                    this.resetCommonCaches();
                    contextRefresh.end();
                }
    
            }
        }
    ```
    
    重点看this.obtainFreshBeanFactory()方法。属于AbstractApplicationContext类方法。
    
    ```java
    protected ConfigurableListableBeanFactory obtainFreshBeanFactory() {
            this.refreshBeanFactory();
            return this.getBeanFactory();
        }
    ```
    
    this.refreshBeanFactory();方法
    
    ```java
    // this.refreshBeanFactory();调用类本类的抽象方法
    // 该抽象方法被AbstractRefreshableConfigApplicationContext重写
    protected abstract void refreshBeanFactory() throws BeansException, IllegalStateException;
    
    protected final void refreshBeanFactory() throws BeansException {
            if (this.hasBeanFactory()) {
                this.destroyBeans();
                this.closeBeanFactory();
            }
    
            try {
                **DefaultListableBeanFactory beanFactory = this.createBeanFactory();**
                beanFactory.setSerializationId(this.getId());
                this.customizeBeanFactory(beanFactory);
                this.loadBeanDefinitions(beanFactory);
                this.beanFactory = beanFactory;
            } catch (IOException var2) {
                throw new ApplicationContextException("I/O error parsing bean definition source for " + this.getDisplayName(), var2);
            }
        }
    ```
    
    重点在this.createBeanFactory()方法，调用本类的受保护的抽象方法
    
    ```java
    // 这里相当于返回了DefaulitListableBeanFactory，这里边包含了初始的bean内容
    protected DefaultListableBeanFactory createBeanFactory() {
            return new DefaultListableBeanFactory(this.getInternalParentBeanFactory());
    }
    ```
    
    此时得到DefaultListableBeanFactory beanFactory。
    
    > this.beanFactory = beanFactory;此时就得到了beanFactory
    > 

### servlet类的走向

![Untitled](2023%2007%2019%E6%83%B3%E6%B3%95%E6%9D%A5%E6%BA%90%208b8ee3b550dc483f867cd8c7c5f53739/Untitled%201.png)