import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronRight, ChevronLeft, List, Filter, Star, LayoutGrid, X, FileSignature, Clock, Award } from 'lucide-react';

// 完整题库数据：包含所有 140 道题
const questionBank = [
  // --- 知识点 1：WPS 软件相关 (1-30) ---
  { id: 1, knowledge: "知识点 1：WPS 软件相关", text: "1、WPS 首页的最近列表中，包含的内容是", options: ["(A)最近联系过的同事", "(B)最近浏览过的网页", "(C)最近访问过的文件夹", "(D)最近打开过的文档"], answer: 3 },
  { id: 2, knowledge: "知识点 1：WPS 软件相关", text: "2、WPS 首页的共享列表中，不包含的内容为", options: ["(A)其他人通过 WPS 共享给我的文件夹", "(B)在操作系统中设置为“共享”属性的文件夹", "(C)我通过 WPS 共享给他人的文件", "(D)其他人通过 WPS 共享给我的文件"], answer: 1 },
  { id: 3, knowledge: "知识点 1：WPS 软件相关", text: "3、要在多个设备间同步最近打开过的文件，正确的操作方法是", options: ["(A)使用“分享”功能", "(B)设置“同步文件夹”", "(C)使用“历史版本”功能", "(D)开启“文档云同步”选项"], answer: 3 },
  { id: 4, knowledge: "知识点 1：WPS 软件相关", text: "4、WPS 支持的文件格式互相转换操作，不包括", options: ["(A)PDF 与 Office 互相转换", "(B)图片与 Office 互相转换", "(C)PDF 与图片互相转换", "(D)PDF 与视频互相转换"], answer: 3 },
  { id: 5, knowledge: "知识点 1：WPS 软件相关", text: "5、关于 WPS 首页的全局搜索框，描述正确的是", options: ["(A)只能搜索本地计算机的文档", "(B)通过全文检索关键词，可以搜索云文档", "(C)不支持直接访问网址", "(D)只能搜索云文档"], answer: 1 },
  { id: 6, knowledge: "知识点 1：WPS 软件相关", text: "6、在 WPS 整合窗口模式下，不支持的文档切换方法是", options: ["(A)通过系统任务栏按钮悬停时展开的缩略图进行切换", "(B)直接点击 WPS 标签栏的对应标签进行切换", "(C)通过 Alt+Tab 组合键快捷切换", "(D)通过 Ctrl+Tab 组合键快捷切换"], answer: 2 },
  { id: 7, knowledge: "知识点 1：WPS 软件相关", text: "7、WPS 不支持的操作是", options: ["(A)PDF 转视频", "(B)图片转文字", "(C)PDF 转图片", "(D)屏幕录制"], answer: 0 },
  { id: 8, knowledge: "知识点 1：WPS 软件相关", text: "8、默认情况下，WPS 文档都以标签形式打开。下列有关标签的叙述中，错误的是", options: ["(A)重要文档可以使用“固定标签”命令将其固定在标签栏的左侧", "(B)使用 Shift+Tab 组合键，可以实现在标签之间的轮流切换", "(C)被固定的标签不显示“关闭”按钮", "(D)通过拖动标签操作，可以调整文档标签的位置"], answer: 1 },
  { id: 9, knowledge: "知识点 1：WPS 软件相关", text: "9、WPS 首页，文档列表区域的默认展示为“最近列表”。下列关于“最近列表”叙述中，错误的是", options: ["(A)访问过的文件默认按文件名排序", "(B)用户可直接从最近列表找到打开过的文档，快速延续上次未完成的文档处理工作，无需再去目录中检索", "(C)最近列表的访问记录跟随用户帐号，退出帐号后其他人不可查看和访问", "(D)开启文档云同步后，用户在各个登录设备上打开过的文档，将实时更新到最近列表，方便用户跨设备访问同一文档"], answer: 0 },
  { id: 10, knowledge: "知识点 1：WPS 软件相关", text: "10、WPS 中，将 PDF 文件转为文档格式时，不支持的格式为", options: ["(A).RTF", "(B).docx", "(C).doc", "(D).dotx"], answer: 3 },
  { id: 11, knowledge: "知识点 1：WPS 软件相关", text: "11、下列关于 WPS“远程会议”的叙述中，错误的是", options: ["(A)会议发起人可以将他人移出会议", "(B)会议发起人可以在需要时锁定会议，禁止其他人加入会议", "(C)只有会议发起人可以演示文档", "(D)可以通过二维码方式邀请他人加入会议"], answer: 2 },
  { id: 12, knowledge: "知识点 1：WPS 软件相关", text: "12、下列关于 WPS 工作窗口管理模式的描述，错误的是", options: ["(A)多组件模式支持标签列表保存为工作区跨设备同步", "(B)多组件模式是按文件类型分窗口组织文档标签", "(C)整合模式支持将多窗口多标签自由拆分与组合", "(D)整合模式支持标签列表保存为工作区跨设备同步"], answer: 0 },
  { id: 13, knowledge: "知识点 1：WPS 软件相关", text: "13、WPS 中的“取色器”功能可以实现的操作不包括", options: ["(A)提取 WPS 工作窗口以外的颜色", "(B)提取多种颜色并混合成新颜色", "(C)提取图形中的颜色", "(D)提取图片中的颜色"], answer: 1 },
  { id: 14, knowledge: "知识点 1：WPS 软件相关", text: "14、WPS 新建界面中提供了多种办公组件或应用，下列无需联网即可本地使用的是", options: ["(A)图片设计", "(B)表单", "(C)流程图/脑图", "(D)文字/演示/表格/PDF"], answer: 3 },
  { id: 15, knowledge: "知识点 1：WPS 软件相关", text: "15、下列关于 WPS 中工作窗口模式和文档标签管理的描述，错误的是", options: ["(A)WPS 在整合模式下，每个工作窗口都有独立的标签列表，称之为工作区", "(B)WPS 多个文档标签默认在工作窗口顶部的标签栏中显示", "(C)WPS 在多组件模式下，每个工作窗口都有独立的标签列表，称之为工作区", "(D)WPS 中所有的文档都默认以标签的形式打开"], answer: 2 },
  { id: 16, knowledge: "知识点 1：WPS 软件相关", text: "16、关于 WPS 的文档标签，说法正确的是", options: ["(A)不可以固定", "(B)可以固定在标签栏中间", "(C)可以固定在标签栏左侧", "(D)可以固定在标签栏右侧"], answer: 2 },
  { id: 17, knowledge: "知识点 1：WPS 软件相关", text: "17、WPS 工作界面的底部有状态栏，下面不包含在状态栏的是", options: ["(A)缩放比例控制区", "(B)视图切换按钮", "(C)任务窗格", "(D)状态信息区"], answer: 2 },
  { id: 18, knowledge: "知识点 1：WPS 软件相关", text: "18、WPS 应用中心提供了多种实用办公软件和服务。下列不属于 WPS 应用中心的是", options: ["(A)智能制作简谱", "(B)稻壳商城", "(C)图片转文字", "(D)论文查重"], answer: 0 },
  { id: 19, knowledge: "知识点 1：WPS 软件相关", text: "19、下列与 WPS 文档标签相关的说法中，错误的是", options: ["(A)按住组合键 Alt+Tab 不放，可以实现在当前窗口所有标签之间的轮流切换", "(B)通过文档标签，可以方便文档的归类放置", "(C)通过文档标签，可以快速切换文档", "(D)重要文档可以通过“固定标签”命令固定在标签栏左侧"], answer: 0 },
  { id: 20, knowledge: "知识点 1：WPS 软件相关", text: "20、在 WPS 工作界面的顶部标签栏中，尚不支持的操作是", options: ["(A)登录账号", "(B)关闭窗口", "(C)查看日历", "(D)新建标签"], answer: 2 },
  { id: 21, knowledge: "知识点 1：WPS 软件相关", text: "21、下列关于 WPS 基础设置的描述，错误的是", options: ["(A)开启“退出时保存工作状态”设置，在下次启动 WPS 时可恢复当前标签和编辑状态", "(B)用户可通过“皮肤中心”自定义 WPS 界面的皮肤", "(C)WPS 三组件(文字、表格、演示)内的网页链接仅能通过 WPS 浏览器打开", "(D)用户可通过“兼容设置”修改默认存储格式、文件打开方式等"], answer: 2 },
  { id: 22, knowledge: "知识点 1：WPS 软件相关", text: "22、在 WPS 首页的文件列表中，为了方便打开一些常用的文档，以下操作错误的是", options: ["(A)添加“星标”", "(B)固定到“常用”", "(C)添加到“快速访问”", "(D)在全局搜索框中搜索文档"], answer: 3 },
  { id: 23, knowledge: "知识点 1：WPS 软件相关", text: "23、在标签栏中打开了多个文档，下列切换文档标签的方法错误的是", options: ["(A)点击标签栏的标签", "(B)按 Ctrl+Tab 快捷键", "(C)按 Shift+Tab 快捷键", "(D)选择系统任务栏的文档缩略图"], answer: 2 },
  { id: 24, knowledge: "知识点 1：WPS 软件相关", text: "24、WPS 各组件均包含的选项卡是", options: ["(A)公式选项卡", "(B)数据选项卡", "(C)动画选项卡", "(D)审阅选项卡"], answer: 3 },
  { id: 25, knowledge: "知识点 1：WPS 软件相关", text: "25、下列关于 WPS 文档标签的描述错误的是", options: ["(A)每个文档标签只能对应一个独立窗口", "(B)支持批量关闭操作", "(C)一个窗口可以同时展示多个文档标签", "(D)支持固定标签操作"], answer: 0 },
  { id: 26, knowledge: "知识点 1：WPS 软件相关", text: "26、通过 WPS 首页顶部的“全局搜索框”，可以", options: ["(A)快速找到实用 Office 技巧", "(B)对云文档进行全文检索", "(C)搜索到账号相关的协作消息", "(D)搜索模板"], answer: 2 },
  { id: 27, knowledge: "知识点 1：WPS 软件相关", text: "27、下列说法中，错误的是", options: ["(A)快速访问工具栏可以放置在功能区之下", "(B)快速访问工具栏不可以作为浮动工具栏显示", "(C)快速访问工具栏中放置的高频使用命令，可以方便用户快速操作", "(D)用户可以自定义快速访问工具栏中命令按钮"], answer: 1 },
  { id: 28, knowledge: "知识点 1：WPS 软件相关", text: "28、WPS 首页是为用户准备的工作起始页，下列关于 WPS 首页的描述错误的是", options: ["(A)可查看日历", "(B)可新建文档", "(C)可查看最近使用过的文档", "(D)可查看书签"], answer: 3 },
  { id: 29, knowledge: "知识点 1：WPS 软件相关", text: "29、下列说法错误的是", options: ["(A)快速访问工具栏支持自定义快捷键", "(B)快速访问工具栏可以调整命令顺序", "(C)快速访问工具栏可以调整访问位置", "(D)快速访问工具栏支持添加常用命令"], answer: 0 },
  { id: 30, knowledge: "知识点 1：WPS 软件相关", text: "30、WPS 切换文档标签的方式，不支持的是", options: ["(A)通过 Ctrl+Tab 组合键快捷切换", "(B)通过系统任务栏按钮悬停时展开的缩略图进行切换", "(C)直接点击 WPS 标签栏的对应标签进行切换", "(D)通过 Alt+Tab 组合键快捷切换"], answer: 3 },

  // --- 知识点 2：PDF 组件 (31-51) ---
  { id: 31, knowledge: "知识点 2：PDF 组件", text: "1、在 WPS 中，可以对 PDF 文件的内容添加批注，但不包含", options: ["(A)文字批注", "(B)音频批注", "(C)形状批注", "(D)注解"], answer: 1 },
  { id: 32, knowledge: "知识点 2：PDF 组件", text: "2、WPS 可以对 PDF 页面进行的操作不包括", options: ["(A)将部分页面提取为独立 PDF 文件", "(B)删除部分页面", "(C)设置页面边距", "(D)插入空白页"], answer: 2 },
  { id: 33, knowledge: "知识点 2：PDF 组件", text: "3、在 WPS 中可以创建多种类型的 PDF 签名，不支持的是", options: ["(A)手写签名", "(B)图片签名", "(C)语音签名", "(D)文字签名"], answer: 2 },
  { id: 34, knowledge: "知识点 2：PDF 组件", text: "4、在 WPS 中打开 PDF 文件，通过左侧导航窗格无法查看的文档信息是", options: ["(A)书签", "(B)文档附件", "(C)文档历史版本", "(D)缩略图"], answer: 2 },
  { id: 35, knowledge: "知识点 2：PDF 组件", text: "5、在 WPS 中，PDF 文件不支持的保护形式是", options: ["(A)文档保存密码", "(B)电子证书签名", "(C)文档编辑密码", "(D)文档打开密码"], answer: 0 },
  { id: 36, knowledge: "知识点 2：PDF 组件", text: "6、下列关于在 WPS 中管理 PDF 页面的描述，错误的是", options: ["(A)支持合并或拆分页面", "(B)支持替换或删除页面", "(C)支持提取或插入页面", "(D)尚不支持裁剪或分割页面"], answer: 3 },
  { id: 37, knowledge: "知识点 2：PDF 组件", text: "7、下列关于在 WPS 中新建 PDF 文件的描述，错误的是", options: ["(A)支持从视频新建 PDF", "(B)支持新建空白页", "(C)支持从扫描仪新建 PDF", "(D)支持从文件新建 PDF"], answer: 0 },
  { id: 38, knowledge: "知识点 2：PDF 组件", text: "8、WPS 中提供了多种 PDF 页面管理功能，下列描述错误的是", options: ["(A)支持使用其它 PDF 文件中的页面替换本文件中的页面", "(B)支持将其他 PDF 文件中的页面插入到本文件中", "(C)支持统一旋转整个文档，无法旋转单个页面", "(D)支持提取部分页面生成一个新的 PDF 文件"], answer: 2 },
  { id: 39, knowledge: "知识点 2：PDF 组件", text: "9、WPS 中提供了多种 PDF 处理工具，下列无需联网即可使用的是", options: ["(A)文档加密(密码加密)", "(B)提取文字(从扫描件)"], answer: 0 },
  { id: 40, knowledge: "知识点 2：PDF 组件", text: "10、下列关于 WPS 中 PDF 图片资源压缩的描述，正确的是", options: ["(A)压缩等级划分中普通级的压缩力度是最大的", "(B)压缩等级划分中标准级的压缩力度是最大的", "(C)压缩等级划分中高清级的压缩力度是最大的", "(D)每次只能压缩一个文件"], answer: 0 },
  { id: 41, knowledge: "知识点 2：PDF 组件", text: "11、WPS 内置的 PDF 组件，简称为 WPS PDF。下列叙述中，错误的是", options: ["(A)WPS 支持从扫描仪新建 PDF 文件", "(B)WPS PDF 提供全文翻译功能", "(C)WPS PDF 仅支持 PDF 文件的阅读，不支持 PDF 文件的编辑", "(D)WPS PDF 本身嵌入字体，可以避免设备中没有对应字体而导致的显示差异"], answer: 2 },
  { id: 42, knowledge: "知识点 2：PDF 组件", text: "12、WPS PDF 支持导出多种格式，下列不属于支持的导出格式是", options: ["(A)PDF 转 PSD", "(B)PDF 转纯文本", "(C)PDF 转 Excel", "(D)PDF 转 Word"], answer: 0 },
  { id: 43, knowledge: "知识点 2：PDF 组件", text: "13、下列关于 WPS PDF 的描述，正确的是", options: ["(A)支持拆分和合并 PDF 文档", "(B)PDF 签名只提供两种签名方式：图片签名、手写签名", "(C)在自动滚动中，负倍数为向下阅读，正倍数为向上阅读", "(D)自动滚动可设置任意倍速度"], answer: 0 },
  { id: 44, knowledge: "知识点 2：PDF 组件", text: "14、PDF 支持的批注形式不包括", options: ["(A)测量工具", "(B)文字批注", "(C)形状批注", "(D)编辑图片"], answer: 3 },
  { id: 45, knowledge: "知识点 2：PDF 组件", text: "15、以下不属于创建 PDF 签名方式的是", options: ["(A)语音签名", "(B)输入签名", "(C)手写签名", "(D)图片签名"], answer: 0 },
  { id: 46, knowledge: "知识点 2：PDF 组件", text: "16、在阅读 PDF 文件时，可以查看书签目录和缩略图的区域是", options: ["(A)文档标签区域", "(B)底部任务栏区域", "(C)文档显示区域", "(D)左侧导航栏区域"], answer: 3 },
  { id: 47, knowledge: "知识点 2：PDF 组件", text: "17、为适应 PDF 文件中不同页面尺寸的阅读体验，WPS PDF 提供了多种视图布局方式，但不支持", options: ["(A)独立封面阅读", "(B)单页连续阅读", "(C)双页连续阅读", "(D)多页连续阅读"], answer: 3 },
  { id: 48, knowledge: "知识点 2：PDF 组件", text: "18、为方便用户对页面内容快速标记，WPS PDF 提供了“随意画”功能，但该功能不包括", options: ["(A)画矩形", "(B)画曲线", "(C)画横线", "(D)画竖线"], answer: 0 },
  { id: 49, knowledge: "知识点 2：PDF 组件", text: "19、下列关于 PDF 格式文件的描述错误的是", options: ["(A)PDF 文件是一种版式文档", "(B)PDF 文件具备跨系统、跨平台显示的一致性", "(C)PDF 文件支持电子签名", "(D)PDF 文件内容无法被编辑"], answer: 3 },
  { id: 50, knowledge: "知识点 2：PDF 组件", text: "20、下列关于 WPS 打印 PDF 文件的描述，正确的是", options: ["(A)页面内容、批注和注释都可以打印出来", "(B)可以将页面内容和批注打印出来，注释不能打印", "(C)可以将页面内容和注释打印出来，批注不能打印", "(D)只能将页面内容打印出来，批注和注释不能打印"], answer: 0 },
  { id: 51, knowledge: "知识点 2：PDF 组件", text: "21、在 WPS PDF 中，不能够通过导航窗格查看和管理的是", options: ["(A)文档的书签", "(B)缩略图", "(C)视频", "(D)附件"], answer: 2 },

  // --- 知识点 3：WPS 文字 (52-80) ---
  { id: 52, knowledge: "知识点 3：WPS 文字", text: "1、在 WPS 文字中为所选单元格设置斜线表头，最优的操作方法是", options: ["(A)拆分单元格", "(B)自定义边框", "(C)插入线条形状", "(D)绘制斜线表头"], answer: 3 },
  { id: 53, knowledge: "知识点 3：WPS 文字", text: "2、小王在 WPS 文字中编辑一篇摘自互联网的文章，他需要将文档每行后面的手动换行符全部删除，最优的操作方法是", options: ["(A)通过文字工具删除换行符", "(B)在每行的结尾处，逐个手动删除", "(C)通过查找和替换功能删除", "(D)长按 Ctrl 键依次选中所有手动换行符后，再按 Delete 键删除"], answer: 0 },
  { id: 54, knowledge: "知识点 3：WPS 文字", text: "3、在 WPS 文字的功能区中，不包含的选项卡是", options: ["(A)章节", "(B)邮件", "(C)审阅", "(D)引用"], answer: 1 },
  { id: 55, knowledge: "知识点 3：WPS 文字", text: "4、使用 WPS 文字撰写包含若干章节的长篇论文时，若要使各章内容自动从新的页面开始，最优的操作方法是", options: ["(A)在每章结尾处连续按回车键使插入点定位到新的页面", "(B)将每章标题指定为标题样式，并将样式的段落格式修改为“段前分页”", "(C)在每章结尾处插入一个分页符", "(D)依次将每章标题的段落格式设为“段前分页”"], answer: 1 },
  { id: 56, knowledge: "知识点 3：WPS 文字", text: "5、在 WPS 文字中，关于尾注说法错误的是", options: ["(A)尾注可以转换为脚注", "(B)尾注可以插入到节的结尾处", "(C)尾注可以插入到页脚中", "(D)尾注可以插入到文档的结尾处"], answer: 2 },
  { id: 57, knowledge: "知识点 3：WPS 文字", text: "6、在 WPS 文字中，不可以将文档直接输出为", options: ["(A)扩展名为.PPTX 的文件", "(B)PDF 文件", "(C)图片", "(D)电子邮件正文"], answer: 3 },
  { id: 58, knowledge: "知识点 3：WPS 文字", text: "7、WPS 文字中，针对设置段落间距的操作，下列说法正确的是", options: ["(A)如果没有选定文字，则设置无效", "(B)一旦设置，即全文生效", "(C)一旦设置，不能更改", "(D)如果选定了文字，则设置只对选定文字所在的段落有效"], answer: 3 },
  { id: 59, knowledge: "知识点 3：WPS 文字", text: "8、WPS 文字中，为了将一部分文本内容移动到另一个位置，首先要进行的操作是", options: ["(A)光标定位", "(B)复制", "(C)粘贴", "(D)选定内容"], answer: 3 },
  { id: 60, knowledge: "知识点 3：WPS 文字", text: "9、WPS 文字文档中填写问卷时需要插入带勾方框，错误的操作是", options: ["(A)直接单击方框即可打勾", "(B)插入自定义符号栏中预设的带勾方框", "(C)只能通过输入法特殊键入", "(D)键入对勾并应用带圈字符"], answer: 2 },
  { id: 61, knowledge: "知识点 3：WPS 文字", text: "10、WPS 文字文档中填写合同时需要将小写数字金额转换为人民币大写，错误的操作是", options: ["(A)插入编号并选择“壹元整...”数字格式", "(B)只能通过输入法特殊键入", "(C)在 WPS 表格中应用“人民币大写”数字格式后再复制到文字文档", "(D)插入公式域并选择“人民币大写”数字格式"], answer: 1 },
  { id: 62, knowledge: "知识点 3：WPS 文字", text: "11、下列不属于 WPS 文字模板文件扩展名的是", options: ["(A).wpt", "(B).dotx", "(C).docx", "(D).dot"], answer: 2 },
  { id: 63, knowledge: "知识点 3：WPS 文字", text: "12、小明需要将 WPS 文字文档内容以稿纸格式输出，最优的操作方法是", options: ["(A)利用“插入表格”功能绘制稿纸，然后将文字内容复制到表格中", "(B)适当调整文档内容的字体和段落格式，然后将其直接打印到稿纸上", "(C)利用“稿纸设置”功能", "(D)利用“文档网格”功能"], answer: 2 },
  { id: 64, knowledge: "知识点 3：WPS 文字", text: "13、小李正在编辑一篇包含 15 个章节的书稿，他希望每一章都能自动从新的页开始，最好的操作方法是", options: ["(A)将每一章标题指定为标题样式，并将样式的段落格式修改为“段前分页”", "(B)在每一章最后插入分页符", "(C)在每一章最后连续按 Enter 键，直到下一页面开始处", "(D)将每一章标题的段落格式设为“段前分页”"], answer: 0 },
  { id: 65, knowledge: "知识点 3：WPS 文字", text: "14、对于 WPS 文字，下列关于页眉页脚的描述中，正确的是", options: ["(A)可以为文档各节创建不同的页眉页脚", "(B)不可以插入时间和日期", "(C)页眉页脚在各种视图中都可以编辑", "(D)编辑页眉页脚时，可以同时编辑正文"], answer: 0 },
  { id: 66, knowledge: "知识点 3：WPS 文字", text: "15、关于 WPS 文字中的“自动图文集”，错误的说法是", options: ["(A)自动图文集是一种文档部件，可以将文档中指定内容封装保存", "(B)自动图文集是一组能够嵌入文档的代码指令", "(C)自动图文集中的词条可以重复应用", "(D)自动图文集是共享文档中已有内容的一种手段"], answer: 1 },
  { id: 67, knowledge: "知识点 3：WPS 文字", text: "16、WPS 文字中，不能实现选择整篇文档的操作是", options: ["(A)首先单击文档起始处，然后按住 Shift 键的同时在文档结束处单击", "(B)组合键 Ctrl+A", "(C)“章节”选项卡中的“全选”按钮", "(D)鼠标移至文档左侧选择条内，三击左键"], answer: 2 },
  { id: 68, knowledge: "知识点 3：WPS 文字", text: "17、在 WPS 文字中，以下描述正确的是", options: ["(A)不可同时添加文字水印和图片水印", "(B)样式中，默认样式不能被删除", "(C)Web 版式可提供简洁的写作环境", "(D)未设置大纲的情况下，不能生成目录"], answer: 1 },
  { id: 69, knowledge: "知识点 3：WPS 文字", text: "18、新建目录后，如果想修改目录的格式，最优的方式是", options: ["(A)选中目录，直接在功能区选项卡中进行修改", "(B)等文档编辑完成并更新目录后，再使用功能区选项卡或相应对话框进行更改", "(C)选中目录，打开对应的对话框进行修改", "(D)修改目录相关样式的格式"], answer: 3 },
  { id: 70, knowledge: "知识点 3：WPS 文字", text: "19、不属于 WPS 文字视图模式的是", options: ["(A)Web 版式", "(B)大纲模式", "(C)母版模式", "(D)阅读模式"], answer: 2 },
  { id: 71, knowledge: "知识点 3：WPS 文字", text: "20、下列关于邮件合并结果输出方式的描述，错误的是", options: ["(A)合并到电子邮件", "(B)合并到新文档", "(C)合并到演示文稿", "(D)合并到打印机"], answer: 2 },
  { id: 72, knowledge: "知识点 3：WPS 文字", text: "21、在 WPS 文字中，插入分页符的快捷键为", options: ["(A)Shift+Enter", "(B)Ctrl+Enter", "(C)Alt+Shift", "(D)Ctrl+Shift"], answer: 1 },
  { id: 73, knowledge: "知识点 3：WPS 文字", text: "22、为了禁止他人编辑文字文档，下列操作错误的是", options: ["(A)设置文档编辑权限密码", "(B)设置文档为修订状态", "(C)设置文档的保护方式为只读", "(D)设置文档权限为仅查看"], answer: 1 },
  { id: 74, knowledge: "知识点 3：WPS 文字", text: "23、下面关于 WPS 文字功能描述中，错误的是", options: ["(A)“在线翻译”功能仅支持中文和英语、法语 2 种语言的互译", "(B)“套打隐藏文字”功能，可以在打印时不显示隐藏文本，但将隐藏文本的位置保留下来", "(C)“数字转人民币大写”功能，可以轻松的将文档中的阿拉伯数字转换成人民币大写", "(D)“在线翻译”功能中的“全文翻译”模式可以对整篇文档进行翻译"], answer: 0 },
  { id: 75, knowledge: "知识点 3：WPS 文字", text: "24、关于 WPS 文字中的表格操作，下列叙述中错误的是", options: ["(A)可以将表格转换成文本", "(B)支持斜线表头的绘制", "(C)不支持表格计算功能", "(D)对于不规则的复杂表格，可以采用手动绘制方式"], answer: 2 },
  { id: 76, knowledge: "知识点 3：WPS 文字", text: "25、如果需要批量制作会议邀请函，可以使用的功能是", options: ["(A)文档校对", "(B)文字工具", "(C)格式刷", "(D)邮件合并"], answer: 3 },
  { id: 77, knowledge: "知识点 3：WPS 文字", text: "26、下列关于文字文档样式的描述，错误的是", options: ["(A)用户可按需创建新样式", "(B)默认样式不可删除", "(C)默认样式不可修改", "(D)样式可以快速统一格式"], answer: 2 },
  { id: 78, knowledge: "知识点 3：WPS 文字", text: "27、下列关于 WPS 文字章节导航功能的描述，错误的是", options: ["(A)可以对节进行合并、删除或重命名操作", "(B)可以快速创建书签", "(C)可以快速调整文档章节结构", "(D)可以快速确定位文档"], answer: 1 },
  { id: 79, knowledge: "知识点 3：WPS 文字", text: "28、利用 WPS 文字对文本区域进行垂直选择，需要使用的按键是", options: ["(A)Ctrl 键", "(B)Shift 键", "(C)Tab 键", "(D)Alt 键"], answer: 3 },
  { id: 80, knowledge: "知识点 3：WPS 文字", text: "29、若文档中某段与前后两段之间要求留有较大间隔，最好的解决方法是", options: ["(A)用段前分页功能", "(B)在每行之间用 Enter 键添加空行", "(C)在前后两段之间用 Enter 键添加空行", "(D)用段落间距功能增加段间距"], answer: 3 },

  // --- 知识点 4：WPS 表格 (81-111) ---
  { id: 81, knowledge: "知识点 4：WPS 表格", text: "1、高一各班的成绩分别保存在独立的工作簿中，老师需要将这些数据合并到一个工作簿中统一管理，最优的操作方法是", options: ["(A)使用合并表格功能", "(B)使用移动或复制工作表功能", "(C)使用复制、粘贴命令", "(D)使用插入对象功能"], answer: 0 },
  { id: 82, knowledge: "知识点 4：WPS 表格", text: "2、在 WPS 表格中，若要在一个单元格输入两行数据，最优的操作方法是", options: ["(A)将单元格设置为“自动换行”，并适当调整列宽", "(B)输入第一行数据后，直接按 Enter 键换行", "(C)输入第一行数据后，按 Shift+Enter 组合键换行", "(D)输入第一行数据后，按 Alt+Enter 组合键换行"], answer: 3 },
  { id: 83, knowledge: "知识点 4：WPS 表格", text: "3、在 WPS 表格中，需要展示公司各部门的销售额占比情况，比较适合的图表是", options: ["(A)饼图", "(B)条形图", "(C)柱形图", "(D)雷达图"], answer: 0 },
  { id: 84, knowledge: "知识点 4：WPS 表格", text: "4、在 WPS 表格中，公司的“报价单”工作表使用了公式引用了商业数据，发送给客户时需要仅呈现计算结果而不保留公式细节，错误的做法是", options: ["(A)将“报价单”工作表输出为图片", "(B)复制原文件中的计算结果，以“粘贴为数值”的方式，把结果粘贴到空白报价单中", "(C)通过工作表标签右键菜单的“移动或复制工作表”命令，将“报价单”工作表复制到一个新的文件中", "(D)将“报价单”工作表输出为 PDF 格式文件"], answer: 2 },
  { id: 85, knowledge: "知识点 4：WPS 表格", text: "5、WPS 表格的工作表 C 列保存了 11 位手机号码信息，为保护个人隐私，需将手机号码的后 4 位均用*表示，以 C3 单元格为例，可以实现的公式是", options: ["(A)=REPLACE(C3, 8, 4, \"****\")", "(B)=MID(C3, 8, 4, \"****\")", "(C)=REPLACE(C3, 7, 4, \"****\")", "(D)=MID(C3, 7, 4, \"****\")"], answer: 0 },
  { id: 86, knowledge: "知识点 4：WPS 表格", text: "6、以下公式中，错误的是", options: ["(A)=AVERAGE(B3:3E) * F3", "(B)=AVERAGE(B3:E3) * F$3", "(C)=AVERAGE(B3:E3) * F3", "(D)=AVERAGE(B3:E3) * $F$3"], answer: 0 },
  { id: 87, knowledge: "知识点 4：WPS 表格", text: "7、WPS 表格中，如果工作表的某单元格中有公式“=销售情况!A5”，则其中的“销售情况”是指", options: ["(A)单元格区域名称", "(B)工作表名称", "(C)工作簿名称", "(D)单元格名称"], answer: 1 },
  { id: 88, knowledge: "知识点 4：WPS 表格", text: "8、WPS 表格中，某单元格公式的计算结果应为一个大于 0 的数，但却显示了错误信息“#####”。为了使结果正常显示，且又不影响该单元格的数据内容，应进行的操作是", options: ["(A)重新输入公式", "(B)加大该单元所在行的行高", "(C)加大该单元所在列的列宽", "(D)使用“复制”命令"], answer: 2 },
  { id: 89, knowledge: "知识点 4：WPS 表格", text: "9、WPS 表格中限制录入重复数据，最快捷的功能是", options: ["(A)条件格式", "(B)数据有效性", "(C)高亮显示重复项", "(D)拒绝录入重复项"], answer: 3 },
  { id: 90, knowledge: "知识点 4：WPS 表格", text: "10、WPS 表格中提取 18 位身份证号码中的 8 位出生日期数字，错误的操作是", options: ["(A)使用公式功能", "(B)使用智能填充功能", "(C)使用拆分表格功能", "(D)使用分列功能"], answer: 2 },
  { id: 91, knowledge: "知识点 4：WPS 表格", text: "11、下列不属于 WPS 表格视图的是", options: ["(A)全屏显示视图", "(B)大纲视图", "(C)分页预览视图", "(D)阅读模式视图"], answer: 1 },
  { id: 92, knowledge: "知识点 4：WPS 表格", text: "12、在 WPS 表格中，A1 单元格中有公式=SUM(B$2:C$3)，将其复制到 D4 单元格，则 D4 中的公式为", options: ["(A)=SUM(E$2:F$3)", "(B)=SUM(B$5:C$6)", "(C)=SUM(B$2:C$3)", "(D)=SUM(E$5:F$6)"], answer: 0 },
  { id: 93, knowledge: "知识点 4：WPS 表格", text: "13、在 WPS 表格的 A1 单元格里存放了 18 位身份证号码，其中 7~10 位表示出生年份。在 A2 单元格中利用公式计算该人的年龄，正确的是", options: ["(A)=YEAR(TODAY())-MID(A1,6,8)", "(B)=YEAR(TODAY())-MID(A1,7,4)", "(C)=YEAR(TODAY())-MID(A1,6,4)", "(D)=YEAR(TODAY())-MID(A1,7,8)"], answer: 1 },
  { id: 94, knowledge: "知识点 4：WPS 表格", text: "14、在工作表单元格中输入公式时，F$2 的单元格引用方式称为", options: ["(A)交叉地址引用", "(B)混合地址引用", "(C)相对地址引用", "(D)绝对地址引用"], answer: 1 },
  { id: 95, knowledge: "知识点 4：WPS 表格", text: "15、WPS 表格提供了模拟分析工具，下面属于逆向模拟分析工具的是", options: ["(A)合并计算", "(B)模拟运算表", "(C)规划求解", "(D)分类汇总"], answer: 2 },
  { id: 96, knowledge: "知识点 4：WPS 表格", text: "16、WPS 表格中，不属于图表基本组成元素的是", options: ["(A)流程图", "(B)绘图区", "(C)图例", "(D)图表标题"], answer: 0 },
  { id: 97, knowledge: "知识点 4：WPS 表格", text: "17、为了在 WPS 表格中方便且准确地阅读数据，以下操作中错误的是", options: ["(A)适当冻结行列标题", "(B)为数据区域添加表格样式", "(C)在“视图”选项卡中打开“大纲模式”", "(D)在“视图”选项卡中打开“阅读模式”"], answer: 2 },
  { id: 98, knowledge: "知识点 4：WPS 表格", text: "18、WPS 表格中创建单元格下拉列表，最快捷的方法是", options: ["(A)通过数据对比创建", "(B)通过条件格式创建", "(C)通过数据有效性创建", "(D)通过插入下拉列表创建"], answer: 3 },
  { id: 99, knowledge: "知识点 4：WPS 表格", text: "19、在 WPS 表格中创建分类汇总表前，需完成的步是", options: ["(A)开启自动筛选", "(B)套用表格样式", "(C)进行数据有效性检测", "(D)对分类字段进行排序"], answer: 3 },
  { id: 100, knowledge: "知识点 4：WPS 表格", text: "20、在 WPS 表格中输入以下数据，不会被默认识别为文本型数字的是", options: ["(A)0001234", "(B)202112241040", "(C)000123", "(D)12345678900"], answer: 3 },
  { id: 101, knowledge: "知识点 4：WPS 表格", text: "21、使用公式计算年龄时，最适合的函数是", options: ["(A) DATEDIF", "(B) DATEVALUE", "(C) DATE", "(D) YEARFRAC"], answer: 0 },
  { id: 102, knowledge: "知识点 4：WPS 表格", text: "22、WPS 表格中包含以下出生日期数据，其中序列值最大的是", options: ["(A) 1999/10/10", "(B) 2023/9/10", "(C) 1990/1/1", "(D) 2020/1/1"], answer: 1 },
  { id: 103, knowledge: "知识点 4：WPS 表格", text: "23、开启保护工作簿后，无法进行的操作是", options: ["(A)保护工作表", "(B)重命名工作簿", "(C)删除工作表", "(D)编辑单元格"], answer: 2 },
  { id: 104, knowledge: "知识点 4：WPS 表格", text: "24、WPS 表格中，实现“自动重算”的功能键是", options: ["(A) F8", "(B) F4", "(C) F2", "(D) F9"], answer: 3 },
  { id: 105, knowledge: "知识点 4：WPS 表格", text: "25、对于 WPS 表格，下列叙述错误的是", options: ["(A)“合并计算”的数据源区域可以来自同一工作表中的不同数据区域", "(B)“分列”时，支持“按随机宽度”分列的方式", "(C)“合并计算”的数据源区域可以来自不同工作簿中的数据区域", "(D)“分列”时，支持“按分隔符号”分列的方式"], answer: 1 },
  { id: 106, knowledge: "知识点 4：WPS 表格", text: "26、WPS 表格中的筛选功能，不支持的是", options: ["(A)按内容筛选", "(B)按颜色筛选", "(C)按字体筛选", "(D)按日期筛选"], answer: 2 },
  { id: 107, knowledge: "知识点 4：WPS 表格", text: "27、在表格 A1 单元格中输入“周一”，向下拖动该单元格的填充柄，A2 单元格将默认显示", options: ["(A)周一", "(B)周二", "(C)周三", "(D)周四"], answer: 0 },
  { id: 108, knowledge: "知识点 4：WPS 表格", text: "28、在表格中，智能填充的快捷键为", options: ["(A) Ctrl+C", "(B) Ctrl+E", "(C) Ctrl+W", "(D) Ctrl+A"], answer: 1 },
  { id: 109, knowledge: "知识点 4：WPS 表格", text: "29、下列关于 WPS 表格图表的描述，错误的是", options: ["(A)图例用于识别和区分类别", "(B)图例用于识别和区分系列", "(C)坐标轴按维度分为主坐标轴和次坐标轴", "(D)坐标轴按方向分为横坐标轴和纵坐标轴"], answer: 0 },
  { id: 110, knowledge: "知识点 4：WPS 表格", text: "30、在 WPS 表格中，将包含公式“=$A$2+D3”的 B1 单元格复制到 C5 单元格，公式将变为", options: ["(A)=$A$2+E7", "(B)=$B$6+E7", "(C)=$B$6+D3", "(D)=$A$6+E3"], answer: 0 },
  { id: 111, knowledge: "知识点 4：WPS 表格", text: "31、在 WPS 表格的 B3 和 B4 中分别输入 2 和 5，然后选定区域 B3:B4，向下拖动该区域的填充柄至 B7 单元格，则区域 B5:B7 中得到的数据为", options: ["(A) 5, 5, 5", "(B) 8, 11, 14", "(C) 7, 12, 9", "(D) 6, 7, 8"], answer: 1 },

  // --- 知识点 5：WPS 演示 (112-126) ---
  { id: 112, knowledge: "知识点 5：WPS 演示", text: "1、在 WPS 演示中，需要将所有幻灯片中设置为“宋体”的文字全部修改为“微软雅黑”，最优的操作方式是", options: ["(A)将“主题字体”设置为“微软雅黑”", "(B)通过“替换字体”功能，将“宋体”批量替换为“微软雅黑”", "(C)在幻灯片母版中通过“字体”对话框，将标题和正文占位符中的字体修改为“微软雅黑”", "(D)在幻灯片中逐个找到设置为“宋体”的文本，并通过“字体”对话框将字体修改为“微软雅黑”"], answer: 1 },
  { id: 113, knowledge: "知识点 5：WPS 演示", text: "2、在 WPS 演示中，关于幻灯片浏览视图的用途，描述正确的是", options: ["(A)对幻灯片的内容进行编辑修改及格式调整", "(B)对所有幻灯片进行整理编排或顺序调整", "(C)对幻灯片的内容进行动画设计", "(D)观看幻灯片的播放效果"], answer: 1 },
  { id: 114, knowledge: "知识点 5：WPS 演示", text: "3、在 WPS 演示中，不支持插入的对象是", options: ["(A)视频", "(B)书签", "(C)音频", "(D)图片"], answer: 1 },
  { id: 115, knowledge: "知识点 5：WPS 演示", text: "4、WPS 演示中，如果需要对某页幻灯片中的文本框进行编辑修改，则需要进入", options: ["(A)阅读视图", "(B)放映视图", "(C)普通视图", "(D)幻灯片浏览视图"], answer: 2 },
  { id: 116, knowledge: "知识点 5：WPS 演示", text: "5、WPS 演示文稿中为全部幻灯片页批量添加校图片，最合适的操作是", options: ["(A)粘贴图片", "(B)分页插图", "(C)编辑母版", "(D)插入图片"], answer: 2 },
  { id: 117, knowledge: "知识点 5：WPS 演示", text: "6、在 WPS 演示中，不可以使用的", options: ["(A)视频", "(B)图表", "(C)书签", "(D)超链接"], answer: 2 },
  { id: 118, knowledge: "知识点 5：WPS 演示", text: "7、如果需要在一个演示文稿的每页幻灯片左下角相同位置插入公司的 LOGO 图片，最好的操作方法是", options: ["(A)打开幻灯片放映视图，将图片插入在幻灯片中", "(B)打开幻灯片母版视图，将图片插入在母版中", "(C)打开幻灯片普通视图，将图片插入在幻灯片中", "(D)打开幻灯片浏览视图，将图片插入在幻灯片中"], answer: 1 },
  { id: 119, knowledge: "知识点 5：WPS 演示", text: "8、为了便于用户组织幻灯片页数较多的演示文稿，以进行演示文稿的导航和模块划分，WPS 演示提供了", options: ["(A)内置版式", "(B)智能图形", "(C)节功能", "(D)幻灯片母版"], answer: 2 },
  { id: 120, knowledge: "知识点 5：WPS 演示", text: "9、在 WPS 演示中，如果想在多个对象中快速选中被遮挡的对象，最恰当的操作是", options: ["(A)打开选择窗格，根据目标对象名称和类型选择对象", "(B)将遮挡目标对象的元素移开，直到选中目标对象", "(C)在制作时，适当地将一些对象进行组合并移开", "(D)复制一张幻灯片，在新的幻灯片中将遮挡目标对象的元素删除，再选中目标对象"], answer: 0 },
  { id: 121, knowledge: "知识点 5：WPS 演示", text: "10、以下功能中，不能实现自动分节的是", options: ["(A)插入“封面页”", "(B)使用“插入页码”工具", "(C)插入“书签”", "(D)插入“目录页”"], answer: 2 },
  { id: 122, knowledge: "知识点 5：WPS 演示", text: "11、在 WPS 演示中，下列不属于辅助对齐的工具是", options: ["(A)参考线", "(B)智能图形", "(C)网格线", "(D)标尺"], answer: 1 },
  { id: 123, knowledge: "知识点 5：WPS 演示", text: "12、在演示文稿中绘制正圆图形，操作正确的是", options: ["(A)插入形状，选择椭圆，按住 Shift 键拖放鼠标进行绘制", "(B)插入形状，选择正圆，按住 Shift 键拖放鼠标进行绘制", "(C)插入形状，选择正圆，按住 Ctrl 键拖放鼠标进行绘制", "(D)插入形状，选择椭圆，按住 Ctrl 键拖放鼠标进行绘制"], answer: 0 },
  { id: 124, knowledge: "知识点 5：WPS 演示", text: "13、在 WPS 演示文稿中，设置超链接的目标对象可以是同一演示文稿中的", options: ["(A)某张幻灯片中的文本", "(B)某张幻灯片中的动画", "(C)某张幻灯片中的图片", "(D)某张幻灯片"], answer: 3 },
  { id: 125, knowledge: "知识点 5：WPS 演示", text: "14、下列不属于 WPS 演示文稿格式的扩展名是", options: ["(A).DPS", "(B).PPTX", "(C).PPT", "(D).MPEG"], answer: 3 },
  { id: 126, knowledge: "知识点 5：WPS 演示", text: "15、下列关于幻灯片母版的描述，错误的是", options: ["(A)每个演示文稿可以包含多个幻灯片母版", "(B)每个演示文稿至少包含 1 个幻灯片母版", "(C)幻灯片母版可以为整个演示文稿批量设置背景", "(D)每个演示文稿只能包含 1 个幻灯片母版"], answer: 3 },

  // --- 知识点 6：WPS 云文档 (127-139) ---
  { id: 127, knowledge: "知识点 6：WPS 云文档", text: "1、关于 WPS 云文档，描述错误的是", options: ["(A)云文档需要通过 WPS Office 客户端进行编辑", "(B)云文档可以通过链接分享给他人", "(C)云文档可以预览和恢复历史版本", "(D)云文档支持多人实时在线共同编辑"], answer: 0 },
  { id: 128, knowledge: "知识点 6：WPS 云文档", text: "2、下面关于云文档的说法中，错误的是", options: ["(A)云文档是 WPS 为用户提供的硬盘文档储存服务", "(B)用户可以将文档保存在其中，跨设备无缝同步和访问", "(C)云文档可以通过链接的形式分享给其他用户", "(D)在开启文档云同步后，可在所有登录了同一帐号的设备上无缝同步和访问打开过的文档"], answer: 0 },
  { id: 129, knowledge: "知识点 6：WPS 云文档", text: "3、下列关于 WPS 云办公服务说法错误的是", options: ["(A)可以实现文档的安全管理", "(B)可以实现多人实时在线协作编辑", "(C)可以打破终端、时间、地理和文档处理环节的限制", "(D)可以让电子文档实现同步更新，但必须是同一个终端"], answer: 3 },
  { id: 130, knowledge: "知识点 6：WPS 云文档", text: "4、下列关于 WPS“协同编辑”的叙述中，错误的是", options: ["(A)参与人可以随时收到更新的消息通知", "(B)只有“协同编辑”发起人可以查看当前文档的在线协作人员", "(C)参与人可以随时查看文档的协作记录", "(D)多人可以同时编辑同一文档"], answer: 1 },
  { id: 131, knowledge: "知识点 6：WPS 云文档", text: "5、WPS 云文档中若要将被他人误编辑的团队文档恢复到原始状态，正确的操作是", options: ["(A)通过分享链接找回", "(B)在回收站中找回", "(C)从最近访问列表找回", "(D)通过历史版本恢复"], answer: 3 },
  { id: 132, knowledge: "知识点 6：WPS 云文档", text: "6、若要编辑 WPS 云文档中的文件，下列说法错误的是", options: ["(A)云文档可以在网页中进行多人实时在线协作编辑", "(B)云文档无需下载到本地即可直接调用 WPS 客户端进行编辑", "(C)云文档必须下载到本地之后才能调用 WPS 客户端进行编辑", "(D)云文档无需依赖本地 WPS 客户端亦可网页端编辑"], answer: 2 },
  { id: 133, knowledge: "知识点 6：WPS 云文档", text: "7、在 WPS 云办公中，说法正确的是", options: ["(A)WPS 云文档一旦删除，就不能被找回", "(B)通过链接分享的文件，可以设置链接有效时间", "(C)WPS 云文档一旦保存，就不能查看既往的版本", "(D)通过链接分享的文件，不可以进行权限管控"], answer: 1 },
  { id: 134, knowledge: "知识点 6：WPS 云文档", text: "8、WPS 云办公关于设置分享权限层级的说法中，错误的是", options: ["(A)可以设置为任何人", "(B)可以设置为管理员", "(C)可以设置为仅指定人", "(D)可以设置为本企业成员"], answer: 1 },
  { id: 135, knowledge: "知识点 6：WPS 云文档", text: "9、下列关于 WPS 云办公的叙述中，错误的是", options: ["(A)用户注册 WPS 帐号，将自动获得个人专属云空间", "(B)电脑中处于编辑状态的文件，不可以通过“另存为”功能保存到云空间", "(C)登录帐号的个人用户，可在 WPS 首页查看帐号的云空间使用情况", "(D)存储在电脑上的文件可以上传至云空间"], answer: 1 },
  { id: 136, knowledge: "知识点 6：WPS 云文档", text: "10、在使用 WPS 云文档多人在线协作模式时，以下错误的是", options: ["(A)文档内容自动实时保存", "(B)可通过历史版本查看各个保存版本", "(C)可查看当前在线的编辑人员", "(D)在线协作界面功能和 WPS 客户端完全一致"], answer: 3 },
  { id: 137, knowledge: "知识点 6：WPS 云文档", text: "11、误删除了云文档中某个文件时，可以将其找回的功能是", options: ["(A)同步文件夹", "(B)云回收站", "(C)共享文件夹", "(D)历史版本"], answer: 1 },
  { id: 138, knowledge: "知识点 6：WPS 云文档", text: "12、下面关于 WPS 云办公的叙述中，错误的是", options: ["(A)WPS 提供的桌面云同步功能，可以使多台设备的桌面文件保持一致", "(B)WPS 的云服务可以实现文档云同步，但无法实现文件夹云同步", "(C)双击 WPS 网盘中的文件，文件将自动从云端下载到本地设备后打开", "(D)WPS 云提供了云回收站功能"], answer: 1 },
  { id: 139, knowledge: "知识点 6：WPS 云文档", text: "13、存储在云空间中的文档多次修改后，如果想找回某个版本，可以使用的功能是", options: ["(A)文档云同步", "(B)历史版本", "(C)最近访问", "(D)云回收站"], answer: 1 },

  // --- 知识点 7：WPS 网盘 (140) ---
  { id: 140, knowledge: "知识点 7：WPS 网盘", text: "1、下列关于 WPS 网盘的描述中，错误的是", options: ["(A)双击 WPS 网盘中的文件可将其打开，但此过程中该文件不会下载到本地设备", "(B)在 WPS 网盘中管理文件时，可以进行拖曳移动操作", "(C)WPS 网盘中存储的文件，不占用用户设备的磁盘空间", "(D)用户可以通过本机资源管理器中的“WPS 网盘”管理云空间中的文件"], answer: 0 }
];

const categories = [
  "全部题目",
  "知识点 1：WPS 软件相关",
  "知识点 2：PDF 组件",
  "知识点 3：WPS 文字",
  "知识点 4：WPS 表格",
  "知识点 5：WPS 演示",
  "知识点 6：WPS 云文档",
  "知识点 7：WPS 网盘"
];

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'quiz', 'mistakes', 'favorites'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [mistakes, setMistakes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("全部题目");
  const [showGrid, setShowGrid] = useState(false); // 题号网格面板状态

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedMistakes = JSON.parse(localStorage.getItem('wps_mistakes_v2') || '[]');
    const savedAnswers = JSON.parse(localStorage.getItem('wps_answers_v2') || '{}');
    const savedFavorites = JSON.parse(localStorage.getItem('wps_favorites_v2') || '[]');
    const savedRecords = JSON.parse(localStorage.getItem('wps_records_v2') || '[]');
    setMistakes(savedMistakes);
    setUserAnswers(savedAnswers);
    setFavorites(savedFavorites);
    setRecords(savedRecords);
  }, []);

  // 自动保存数据到 localStorage
  useEffect(() => {
    localStorage.setItem('wps_mistakes_v2', JSON.stringify(mistakes));
    localStorage.setItem('wps_answers_v2', JSON.stringify(userAnswers));
    localStorage.setItem('wps_favorites_v2', JSON.stringify(favorites));
    localStorage.setItem('wps_records_v2', JSON.stringify(records));
  }, [mistakes, userAnswers, favorites, records]);

  // 根据当前视图和分类过滤题目
  const getFilteredQuestions = () => {
    let list = questionBank;
    if (view === 'mistakes') {
      list = list.filter(q => mistakes.includes(q.id));
    } else if (view === 'favorites') {
      list = list.filter(q => favorites.includes(q.id));
    }
    
    if (selectedCategory !== "全部题目") {
      list = list.filter(q => q.knowledge === selectedCategory);
    }
    return list;
  };

  const currentQuestions = getFilteredQuestions();

  // 切换分类或视图时重置索引
  useEffect(() => {
    setCurrentIndex(0);
    setShowGrid(false);
  }, [selectedCategory, view]);

  const handleSelectOption = (questionId, optionIndex, isCorrect) => {
    if (userAnswers[questionId] !== undefined) return;

    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));

    if (!isCorrect) {
      if (!mistakes.includes(questionId)) {
        setMistakes(prev => [...prev, questionId]);
      }
    }
  };

  const toggleFavorite = (questionId) => {
    setFavorites(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  const removeMistake = (questionId) => {
    setMistakes(prev => prev.filter(id => id !== questionId));
    const newAnswers = { ...userAnswers };
    delete newAnswers[questionId];
    setUserAnswers(newAnswers);
    
    if (currentIndex >= mistakes.length - 1 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 交卷并保存刷题记录
  const submitAndSaveRecord = () => {
    const answeredKeys = Object.keys(userAnswers);
    if (answeredKeys.length === 0) {
      alert("您还没有做任何题目，无法交卷！");
      return;
    }

    let correctCount = 0;
    answeredKeys.forEach(qId => {
      const q = questionBank.find(q => q.id === parseInt(qId));
      if (q && userAnswers[qId] === q.answer) {
        correctCount++;
      }
    });

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleString('zh-CN', { hour12: false }),
      totalAnswered: answeredKeys.length,
      correct: correctCount,
      accuracy: Math.round((correctCount / answeredKeys.length) * 100),
      category: selectedCategory === "全部题目" ? "全套题库" : selectedCategory.split('：')[1]
    };

    if (window.confirm(`交卷成功！\n\n本次答题：${answeredKeys.length} 道\n正确：${correctCount} 道\n正确率：${newRecord.accuracy}%\n\n是否清空当前的答题状态，以便进行下一次刷题？（错题本和收藏夹不会被清空）`)) {
      setRecords(prev => [newRecord, ...prev]);
      setUserAnswers({});
      setCurrentIndex(0);
      setView('home');
      setSelectedCategory("全部题目");
    }
  };

  const resetAll = () => {
    if (window.confirm("确定要彻底清空所有做题记录、错题本、收藏夹和历史成绩吗？此操作不可恢复。")) {
      setUserAnswers({});
      setMistakes([]);
      setFavorites([]);
      setRecords([]);
      setCurrentIndex(0);
      setView('home');
      setSelectedCategory("全部题目");
    }
  };

  // UI Components
  const renderHome = () => {
    const answeredCount = Object.keys(userAnswers).length;
    const progress = Math.round((answeredCount / questionBank.length) * 100);

    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-800">计算机二级 WPS 终极题库</h1>
          <p className="text-gray-600">完整收录全部 140 道原题，带星标收藏与历史记录功能</p>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mt-6 bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-gray-500">当前答题进度 {answeredCount} / {questionBank.length} 题 ({progress}%)</p>
        </div>
        
        {/* 三大入口模块 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <button 
            onClick={() => { setView('quiz'); setSelectedCategory("全部题目"); }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-blue-200 rounded-2xl shadow-sm hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div className="bg-blue-100 p-3 rounded-full mb-3 group-hover:bg-blue-200 transition-colors">
              <BookOpen size={32} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">全部顺序刷题</h2>
            <p className="text-xs text-gray-500 text-center">从头到尾完整过一遍</p>
          </button>

          <button 
            onClick={() => { setView('mistakes'); setSelectedCategory("全部题目"); }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-red-200 rounded-2xl shadow-sm hover:border-red-500 hover:shadow-md transition-all group"
          >
            <div className="bg-red-100 p-3 rounded-full mb-3 group-hover:bg-red-200 transition-colors">
              <AlertCircle size={32} className="text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">错题本攻坚</h2>
            <p className="text-xs text-gray-500 text-center">当前收录 {mistakes.length} 道错题</p>
          </button>

          <button 
            onClick={() => { setView('favorites'); setSelectedCategory("全部题目"); }}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-yellow-200 rounded-2xl shadow-sm hover:border-yellow-500 hover:shadow-md transition-all group"
          >
            <div className="bg-yellow-100 p-3 rounded-full mb-3 group-hover:bg-yellow-200 transition-colors">
              <Star size={32} className="text-yellow-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">我的收藏夹</h2>
            <p className="text-xs text-gray-500 text-center">已收藏 {favorites.length} 道高频/易错题</p>
          </button>
        </div>

        {/* 专项分类选择 */}
        <div className="w-full max-w-4xl bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Filter size={16} className="text-blue-600" />
            按专项分类练习
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1).map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat);
                  setView('quiz');
                }}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {cat.split('：')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* 历史刷题记录 */}
        <div className="w-full max-w-4xl bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award size={16} className="text-blue-600" />
            我的历史成绩卡 (已完成 {records.length} 次模拟)
          </h3>
          {records.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              暂无成绩记录。去刷题并在完成后点击“交卷”即可生成成绩卡。
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {records.map(record => (
                <div key={record.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div>
                    <div className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" /> 
                      {record.date}
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded ml-2">{record.category}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      共答题 {record.totalAnswered} 道 | 答对 {record.correct} 道
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${record.accuracy >= 90 ? 'text-green-500' : record.accuracy >= 60 ? 'text-blue-500' : 'text-red-500'}`}>
                    {record.accuracy}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          onClick={resetAll}
          className="text-gray-400 hover:text-red-500 flex items-center gap-2 mt-2 text-xs transition-colors"
        >
          <RefreshCw size={14} />
          重置所有数据(清空一切记录)
        </button>
      </div>
    );
  };

  const renderQuestionGrid = () => {
    return (
      <div className="fixed inset-0 bg-gray-900/60 z-50 flex justify-end transition-opacity backdrop-blur-sm">
        <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <LayoutGrid size={18} className="text-blue-600" />
              答题卡 ({currentQuestions.length}题)
            </h3>
            <button onClick={() => setShowGrid(false)} className="text-gray-500 hover:bg-gray-200 p-1 rounded-md transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex gap-4 p-4 text-xs justify-center border-b border-gray-100 bg-white shadow-sm z-10">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm"></div>未做</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-500 rounded-sm"></div>正确</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-500 rounded-sm"></div>错误</span>
          </div>

          <div className="p-4 overflow-y-auto flex-grow bg-white">
            <div className="grid grid-cols-5 gap-2">
              {currentQuestions.map((q, idx) => {
                const hasAnswered = userAnswers[q.id] !== undefined;
                const isCorrect = userAnswers[q.id] === q.answer;
                
                let btnClass = "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"; // 默认未做
                if (hasAnswered) {
                  if (isCorrect) {
                    btnClass = "bg-green-100 border-green-500 text-green-700 font-bold";
                  } else {
                    btnClass = "bg-red-100 border-red-500 text-red-700 font-bold";
                  }
                }
                
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowGrid(false);
                    }}
                    className={`aspect-square rounded border flex items-center justify-center text-sm transition-all ${btnClass} ${isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 scale-110 shadow-sm' : ''}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (currentQuestions.length === 0) {
      return (
        <div className="text-center py-20">
          <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">太棒了！</h2>
          <p className="text-gray-600 mt-2">
            当前分类下没有题目，或者你的该列表里目前是空的！
          </p>
          <button 
            onClick={() => { setView('home'); setSelectedCategory("全部题目"); }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      );
    }

    const safeIndex = currentIndex >= currentQuestions.length ? 0 : currentIndex;
    const question = currentQuestions[safeIndex];
    const hasAnswered = userAnswers[question.id] !== undefined;
    const selectedAnswer = userAnswers[question.id];
    const isCorrectAnswerSelected = hasAnswered && userAnswers[question.id] === question.answer;
    const isFav = favorites.includes(question.id);

    return (
      <div className="max-w-3xl mx-auto py-6 flex flex-col h-full min-h-[80vh] relative">
        {showGrid && renderQuestionGrid()}

        {/* Header Tools */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('home')}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200"
            >
              <ChevronLeft size={18} /> 返回
            </button>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-200 text-sm rounded-lg px-2 py-1.5 outline-none focus:border-blue-500 shadow-sm"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowGrid(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <LayoutGrid size={16} />
              答题卡 ({safeIndex + 1}/{currentQuestions.length})
            </button>
            <button
              onClick={submitAndSaveRecord}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <FileSignature size={16} />
              交卷
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 flex-grow flex flex-col relative">
          
          {/* Top Info Bar inside Card */}
          <div className="flex justify-between items-start mb-4 pr-1">
            <span className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md">
              {question.knowledge}
            </span>
            <div className="flex items-center gap-2">
              {view === 'mistakes' && (
                <button 
                  onClick={() => removeMistake(question.id)}
                  className="text-xs text-red-600 hover:text-white border border-red-500 hover:bg-red-500 px-2.5 py-1 rounded-md transition-colors"
                >
                  移出错题本
                </button>
              )}
              <button 
                onClick={() => toggleFavorite(question.id)}
                className={`p-1.5 rounded-full transition-colors ${isFav ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'}`}
                title="收藏本题"
              >
                <Star size={24} fill={isFav ? "currentColor" : "none"} strokeWidth={isFav ? 0 : 2} />
              </button>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-8 leading-relaxed">
            {question.text}
          </h3>

          <div className="space-y-3 flex-grow">
            {question.options.map((option, index) => {
              const isCorrectOption = index === question.answer;
              const isSelectedOption = index === selectedAnswer;
              
              let buttonStyle = "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700";
              let icon = null;

              if (hasAnswered) {
                if (isCorrectOption) {
                  buttonStyle = "border-green-500 bg-green-50 text-green-800 font-medium ring-1 ring-green-500";
                  icon = <CheckCircle size={22} className="text-green-500" />;
                } else if (isSelectedOption) {
                  buttonStyle = "border-red-500 bg-red-50 text-red-800";
                  icon = <XCircle size={22} className="text-red-500" />;
                } else {
                  buttonStyle = "border-gray-100 bg-gray-50 opacity-50 text-gray-400";
                }
              }

              return (
                <button
                  key={index}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(question.id, index, isCorrectOption)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all flex items-start sm:items-center justify-between gap-4 ${buttonStyle}`}
                >
                  <span className="text-[15px] sm:text-[16px] leading-snug">{option}</span>
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">{icon}</div>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-100 gap-4">
            <button
              disabled={safeIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className={`w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                safeIndex === 0 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft size={20} />
              上一题
            </button>

            <div className="h-6 flex items-center justify-center">
              {hasAnswered && !isCorrectAnswerSelected && (
                <span className="text-red-500 font-medium text-sm px-4 py-1 bg-red-50 rounded-full animate-pulse">
                  答错了，已自动加入错题本
                </span>
              )}
              {hasAnswered && isCorrectAnswerSelected && (
                <span className="text-green-600 font-medium text-sm px-4 py-1 bg-green-50 rounded-full">
                  回答正确！
                </span>
              )}
            </div>

            <button
              disabled={safeIndex === currentQuestions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className={`w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${
                safeIndex === currentQuestions.length - 1 
                  ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                  : 'text-white bg-blue-600 hover:bg-blue-700 shadow-sm'
              }`}
            >
              下一题
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2 text-blue-800 cursor-pointer" onClick={() => setView('home')}>
          <List size={22} className="hidden sm:block" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">WPS 二级冲刺题库</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-5 text-sm font-medium">
          <button 
            onClick={() => setView('home')} 
            className={`px-2 py-1 ${view === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            首页
          </button>
          <button 
            onClick={() => { setView('quiz'); setCurrentIndex(0); }} 
            className={`px-2 py-1 ${view === 'quiz' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
          >
            题库
          </button>
          <button 
            onClick={() => { setView('favorites'); setCurrentIndex(0); }} 
            className={`px-2 py-1 ${view === 'favorites' ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-yellow-500'}`}
          >
            收藏
          </button>
          <button 
            onClick={() => { setView('mistakes'); setCurrentIndex(0); }} 
            className={`px-2 py-1 flex items-center gap-1 ${view === 'mistakes' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-500'}`}
          >
            错题本 
            {mistakes.length > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                {mistakes.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 h-full pb-10">
        {view === 'home' && renderHome()}
        {(view === 'quiz' || view === 'mistakes' || view === 'favorites') && renderQuiz()}
      </main>
    </div>
  );
}