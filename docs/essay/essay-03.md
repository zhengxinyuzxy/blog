# 2023/07/14想法来源

# 关于spring代理的部分：

1. 接口有实现类，@AutoWired接口名，目标类是接口的方法，此时代理类是动态代理。

2. 当没有实现类只有接口自己，也自动注入了（即@AutoWired接口名，被IOC容器管理），此时会报错

   - *Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException*

3. 当一个类不是接口，类名.getClass.getName()；此时使用的cglib代理

4. **注意**：

   - 不是动态代理也不是cglib代理而是输出了【*全类名com.mellow.aop.impl.EmpService*】，这种现象属于没有被代理管理，想要被代理可以检测下AOP原理中的切入点表达式的规则，看目标类时候包含在切入点表达式的范围内。

   - 切入点表达式的规则是具体到方法的，只有有时方法用*代替了（标识该类的任意方法）。

     比如：*@Pointcut("execution(* *..\*Service.\*(Integer, ..)) || execution(* *..Calculator.*(..))")。*

   - 如果接口和实现类没有成员即没有方法，也是不经过代理的，因为没有匹配到切入点表达式，即使切入点表达式中方法的规则是*

5. 当一个接口有实现类，并且目标类被动态代理，通过接口.toString()输出的是实现类的地址，而接口.getClass().getName()输出的是代理对象

   - 接口（Calculator）、实现类（CalculatorPureImpl）

   ```java
   @Autowired
   private Calculator calculator;
   
   // 测试日志输出内容
   logger.debug(calculator.toString());
   logger.debug(calculator.getClass().getName());
   
   // 控制台输出内容
   [calculator 的toString() = com.mellow.aop.impl.CalculatorPureImpl@3e2822]
   [calculator 的全类名 = jdk.proxy2.$Proxy27]
   ```

------

# 关于IOC的随手记：

1. IOC容器的内容包含哪些bean（比如xml配置的IOC容器、注解配置的IOC容器）

   1. **参考：D:\basic-code\mybatis-spring-springMVC-case\*P09-spring-ioc-annotation\***

   2. **注意点：一定要注意配置自动扫描的包的范围，包的范围决定了IOC容器中bean的数量。**

   3. **代码内容：**

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns:xsi="<http://www.w3.org/2001/XMLSchema-instance>"
             xmlns:context="<http://www.springframework.org/schema/context>"
             xmlns="<http://www.springframework.org/schema/beans>"
             xsi:schemaLocation="<http://www.springframework.org/schema/beans> <http://www.springframework.org/schema/beans/spring-beans.xsd> <http://www.springframework.org/schema/context> <https://www.springframework.org/schema/context/spring-context.xsd>">
      
          <!-- 配置自动扫描的包 -->
          <!-- 情况一：最基本的扫描方式[常用] -->
          <context:component-scan base-package="***com.mellow.ioc***"/>
      
          <!-- xml形式bean的装配 -->
          <bean id="componentXML" class="com.mellow.ioc.component.CommonComponent"/>
      </beans>
      ```

      ```java
      package *com.mellow.ioc.component*;
      
      import org.springframework.stereotype.Component;
      
      @Component
      public class CommonComponent {
      }
      ```

      ```java
      // @Configuration 表示这个类是一个配置类
      @Configuration
      @ComponentScan("com.mellow.ioc")
      public class MyConfiguration {
      
          // @Bean 注解相当于在 XML 配置文件中编写的 bean 标签
          // 默认以方法名作为 bean 的 id
          @Bean(value = "myComponent")
          public CommonComponent getCommonComponent() {
              return new CommonComponent();
          }
      
      }
      ```

      ```java
      // 根据 XML 形式的配置文件创建 IOC 容器对象
          private ApplicationContext iocContainer =
                  new ClassPathXmlApplicationContext("spring-context.xml");
      
          // 根据注解配置类创建 IOC 容器对象
          private ApplicationContext annotationIOCContainer =
                  new AnnotationConfigApplicationContext(MyConfiguration.class);
      ```

      ------

   - 根据 XML 形式的配置文件创建 IOC 容器对象

     - 代码内容

       ```java
       // 根据 XML 形式的配置文件创建 IOC 容器对象
           private ApplicationContext iocContainer =
                   new ClassPathXmlApplicationContext("spring-context.xml");
       ```

     - 控制台内容解读：iocContainer 中内容

       - 以上结论：xml配置的IOC容器把范围内xml中的bean和注解装配的bean都包含了。
       - 小细节点：可以看出IOC容器中bean的id后内容不一样，分别有***{ScannedGenericBeanDefinition@3031}、{GenericBeanDefinition@3035}、ConfigurationClassBeanDefinitionReader$ConfigurationClassBeanDefinition@3027}、{RootBeanDefinition@3018}。***
       - 分析解读：
         - ***{RootBeanDefinition@3018}是IOC原生内容。***
         - ***{GenericBeanDefinition@3035}是xml文件中的bean。***
         - ***{ScannedGenericBeanDefinition@3031}是注解配制扫描来的。***
         - {***ConfigurationClassBeanDefinitionReader$ConfigurationClassBeanDefinition@3027}是注解@Bean装配来的。***
         - 需要注意：MyConfiguration.java（此类使用注解@Configuration、@ComponentScan）是配置类，IOC容器中显示***{ScannedGenericBeanDefinition@3031}，***此时在xml配置的IOC容器中理解为扫描装配的。

   - 根据注解配置类创建 IOC 容器对象

     - 代码内容

       ```java
       // 根据注解配置类创建 IOC 容器对象
           private ApplicationContext annotationIOCContainer =
                   new AnnotationConfigApplicationContext(MyConfiguration.class);
       ```

     - 控制台内容解读

       ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3eb6362d-76cb-47c3-9a3f-1d788ab570fb/Untitled.png)

       - 以上结论：根据注解配置类创建的 IOC 容器把扫描的包范围内只使用注解装配的bean装配了。
       - 需要注意：MyConfiguration.java（此类使用注解@Configuration、@ComponentScan）是配置类，IOC容器中显示{AnnotatedGenericBeanDefinition@3140}***，***此时在根据注解配置类创建的 IOC 容器中理解为注解（此注解理解为AnnotatedGenericBeanDefinition）装配的。

   <aside> 💡 **注意项：**

   - xml创建的IOC容器会把扫描范围内所有的bean装配进IOC容器，根据注解配置类创建的 IOC 容器只装配注解配置的bean，不会装配xml文件中的bean。

   - 注解配置的IOC容器不会装配xml文件中用<bean id=”” class=””/>标记的bean

     如：根据注解配置类创建的 IOC 容器中由xml配置的bean不会存在

     ```xml
     <bean id="component" class="com.mellow.ioc.component.CommonComponent"/>
     ```

   </aside>

2. 关于bean同时被注解配置类装配和xml文件装配

3. 当一个类同时使用了注解和xml-bean标签的方式装到IOC容器中，但在IOC容器中（*这里的IOC容器是-根据 XML 形式的配置文件创建 IOC 容器对象*）显示的是xml文件id形式装配的bean（*{GenericBeanDefinition@3610}*）,而不是注解形式的（***{ScannedGenericBeanDefinition@3607\*}**）

4. 关于IOC容器多个bean导致的不唯一报错信息（*org.springframework.beans.factory.NoUniqueBeanDefinitionException*）

   - 报错原因解读：bean不唯一，无法装配到IOC容器中。

     ```java
     // 报错信息
     org.springframework.beans.factory.NoUniqueBeanDefinitionException: 
     No qualifying bean of type 'com.mellow.aop.impl.HelloImpl' available: 
     expected single matching bean but found 3: 
     helloImpl,helloImplxml,myHelloImpl
     
     // 报错的代码，（iocContainer是xml形式创建的IOC容器）
     // HelloImpl.class，类.class相当于根据类进行装配，->
     // 会检测此类所有的bean（比如@Bean、此类上的注解Component、xml文件中的此类的bean标签）->
     // 这样存在多个bean无法装配的IOC容器中，因为bean不是唯一的，->
     // 所有报错为：NoUniqueBeanDefinitionException
     HelloImpl helloImpl = iocContainer.getBean(HelloImpl.class);
     ```

   - 解决方法：使用唯一的bean的id，比如xml文件中bean的id。

     ```java
     // xml文件内容
     <bean id="helloImplxml" class="com.mellow.aop.impl.HelloImpl"/>
     // 根据xml文件中bean的id进行装配
     HelloImpl helloImpl = (HelloImpl) iocContainer.getBean("helloImplxml");
     ```

   - 如下边的接口类型要声明为抽象的，此时xml配置的IOC容器中也会有接口类型的bean。

   ```xml
   <bean id="helloInterfaceXML" class="com.mellow.aop.api.HelloInterface" abstract="true"/>
   ```

5. **提醒一点**：建议spring的xml文件中能装配的bean只能是类的类型，虽然接口类型也能在xml中使用bean装配，但要声明是抽象类型，目前尝试在xml中装配的都是类，没有试过装配接口（即抽象类型），虽然xml中写抽象类型的bean不会爆红色，但没有测试过，所以目前结论，建议只在xml文件中只装配类。）

6. 关于**不要使用自动注解@Aurowired装配接口的实现类。**

```java
// Calculator类虽然没有使用注解加入ioc容器，
    // 但是它的实现类使用了spring的注解,从测试来看传递注入了ioc容器
    // 如果实现类没有使用如@Component,这里就是显示，无法自动装配。找不到 'Calculator' 类型的 Bean。
    @Autowired
    private Calculator calculator;

//   使用代理时自动装配实现类报错
//    @Autowired
//    private CalculatorPureImpl calculatorPure;

// 报错信息
Caused by: org.springframework.beans.factory.BeanNotOfRequiredTypeException
```

- 从上边看，虽然@Autowired自动装配写的是接口，但在IOC容器中存在的是该接口的实现类。