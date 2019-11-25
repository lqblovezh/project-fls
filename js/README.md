X-Book
===

### 文件后缀说明

| 后缀（suffix）| 描述 | 分支 |
|---|---|--|
| xnjd | 西南交大出版社，在线教育（X-Teach） | master |
| jyz | 江苏人民出版社，金圆桌 | develop-jyz |
| jz | 九州出版社，X-Read | develop-jiuzhou |
| - | 晚安主播（自营）, 广西民族出版社 | develop-zb |
| - | 商务印书馆（图文对照） | develop-zb |
| - | xcloud3 自营 | develop-cq |

### 分支说明

| 分支类型 | 描述 |
|---|---|
| master | 开发主分支，稳定之后合并到 release |
| develop-* | 临时开发分支，可能会被舍弃，尽量只做小改动，不合并到任何分支，也用于打包 |
| feature-* | 特殊功能开发分支，适用于长时间开发，并且影响其它功能，完成后需要合并到 master |
| release | 发布分支，用于打包，旧 Bug 修复（需要合并到 master）|
| hotfixes | 紧急开发分支，始于某个版本的安全性 Bug，修复之后合并到 master 和 release |

### 标签说明

* **xcloud3**

	针对 php 没有使用 laravel 框架之前保留的版本。


### 目录说明

   * **cdn**: 需使用cdn导入的资源。
   * **bin**: 命令行说明配置。
   * **src**: 源文件目录。
   * **src/build**: 构建服务和webpack配置。
   * **src/common**: 生成公共全局变量。
   * **src/projects**: 子项目源码目录。
   * **src/services**: API接口目录。
   * **src/server**: 调试目录。
   * **src/webpack.base.js**: 公共配置文件。
