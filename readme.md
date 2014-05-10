# generate dist
```shell
npm install
grunt
```
# other
请求方式：get
参数：style
    classic: url?page=pagenum
    rest: url/pagenum

内部状态：
    最多主动触发多少次
    是不是已经没有数据

回调：
    同jquery
    加一个更新内部状态的回调

样式：
    位置
    loading
    more button