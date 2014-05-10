# generate dist
```
npm install
grunt
```
# 说明
## Ajax
```
method: get
dataType: json
```
### 请求参数
```
option style
classic: url?page=pagenum
rest: url/pagenum
```

## 内部状态
```
active: 最多主动触发多少次
hasMore: 是不是已经没有数据
```

## 回调
### jquery ajax event
```
onSuccess
onError
onComplete
```
### 其他
```
onLoading: ajax请求之前回调
onUpdate: 更新内部状态的回调
```

## 样式
```
位置: append to element
```
```json
option more: {
    // 一直存在还是不主动触发以后再显示
    every: true,
    class: "scrollpaging",
    loading: "正在加载...",
    finish: "没有数据了",
    element: "<a class=\"more\" href=\"javascript:;\"></a>",
    content: "更多"
}
```