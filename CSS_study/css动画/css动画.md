## css动画类型

+ transition 补间动画
+ keyframe 关键帧动画
+ 逐帧动画

## 补间动画

+ 位置-平移（left/right/margin/transform）
+ 方位-旋转（transform）
+ 大小-缩放（transform）
+ 透明度（transform）
+ 线性变换（transform）

## transform

+ transition: property（属性 ） duration（完成时间） timing-function（线性速度） delay（延时）;

+ F12  ->  esc 打开动画面板


##  关键帧动画

+ 相当于多个补间动画
+ 与元素状态的变化无关（如：:hover）
+ 定义更灵活

## animation

+ animation: keyframe 名称（name ） duration（完成时间） timing-function（线性速度） delay（延时） iteration-count （播放次数）direction（播放方向）;

## 逐帧动画

+ 适用于无法补间计算的动画
+ 资源较大
+ 使用steps()
+  animation-timing-function: steps(1);//去掉动画之间的补间