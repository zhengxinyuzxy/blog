# 2023/07/12想法来源

1. 数据库类型-Insert into插入语句中的value[s]，s是动态的，建议插入一条时用value，多条使用values 。
2. rabbitmq的消息是队列规则queue,先进先出。
3. this关键字是指当前对象，用于区分局部变量、成员变量、成员方法，可以联想实体类一个标准的bean类中的属性的set方法中this.name = name ，this.name就是成员变量name。
4. 父类构造方法调用父子类重名方法是调用的子类重名方法，规则是编译看左边，运行看右边，可以借鉴多态的原则，其中子类此时没有完成实例化的过程，此时父类处于类加载过程中的linking阶段简单解释处于赋初值，先赋初值，在赋实际值。
    
    ```java
    public class A {
        int a = 10;
    
        public A() {
            printA();
        }
    
        public void printA() {
            System.out.println("a类方法中a的值：" + a);
        }
    }
    ```
    
    ```java
    public class B extends A{
        int b = 20;
    
        public B() {
           printA();
        }
    
        @Override
        public void printA() {
            System.out.println("b类方法中b的值：" + b);
        }
    }
    ```
    
    ```java
    public class B extends A{
        int b = 20;
    
        public B() {
           printA();
        }
    
        @Override
        public void printA() {
            System.out.println("b类方法中b的值：" + b);
        }
    }
    ```
    
    ```
    b类方法中b的值：0
    b类方法中b的值：20
    
    进程已结束,退出代码0
    ```
    
    ---
    
5. git branch -vv 当前分支和远程分支的关联关系
6. git branch —unset-upstream 取消本地分支和远程分支的关联关系
7. git branch —set-upstream-to 远程分支名 设置本地分支和远程分支的关联关系，其实就是跟踪上游分支