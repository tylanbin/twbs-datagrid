Bootstrap DataGrid
======
Bootstrap DataGrid is a simple tool used to display data with Bootstrap. It is easy tou use, just like jQuery EasyUI Datagrid, but only have some simple params.

## Required
* jQuery
* Bootstrap v3
* [jQuery pagination plugin](https://github.com/esimakin/twbs-pagination)

## How to
* Use simple HTML at your html (jsp, php) page (you can change styles as you want).

```html
<div class="row">
    <div class="col-md-12">
        <table id="datagrid" class="table table-striped table-bordered bootstrap-datatable datatable responsive"></table>
    </div>
</div>
<div class="row">
    <div class="col-md-12" style="text-align: right;">
        <ul id="dg-pagination" class="pagination"></ul>
    </div>
</div>
```
* Use js code to init it.

```javascript
$('#datagrid').twbsDatagrid({
    url : 'data.json',// request url
    columns : [{
        field : 'username',// json object key
        title : 'Username'// datagrid column name
    }, {
        field : 'role',
        title : 'Role'
    }]
});
```
* data.json just like this.

```javascript
{
    "total" : 18,
    "datas" : [
        { "userName" : "zhangsan", "regDate" : "", "role" : "Admin" },
        { "userName" : "lisi", "regDate" : "", "role" : "Staff" },
        { "userName" : "wangwu", "regDate" : "", "role" : "Staff" },
        { "userName" : "zhaoliu", "regDate" : "", "role" : "Staff" },
        { "userName" : "sunqi", "regDate" : "", "role" : "Staff" }
    ]
}
```
* You can change the pagination ul id, if it changes, you must config it when datagrid init

```html
<ul id="pag" class="pagination"></ul>
```
* It will send 3 default params: `page`, `rows`, `params`.
	* `page`: integer, means current page number.
	* `rows`: integer, means current page size.
	* `params`: string, like this `{ "testParam" : "test" }`.
* Java example:

```java
@ResponseBody
@RequestMapping(value = "/data")
public String data(int page, int rows, String params) {
    try {
        ObjectMapper om = new ObjectMapper();
        if (!StringUtils.isEmpty(params)) {
            // use jackson to deserialize string to map
            Map<String, Object> map = om.readValue(params, new TypeReference<Map<String, Object>>() {});
            pm = fooService.pagingQuery(page, rows, map);
        } else {
            pm = fooService.pagingQuery(page, rows);
        }
        // serialize result
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("total", pm.getTotal());
        result.put("datas", pm.getDatas());
        return om.writeValueAsString(result);
    } catch (Exception e) {
        e.printStackTrace();
        return "{ \"total\" : 0, \"datas\" : [] }";
    }
}
```

## Options
```javascript
$('#datagrid').twbsDatagrid({
    url : 'data.json',                  // request url (*nessesary)
    pagination : '#dg-pagination',      // pagination plugin id (default: '#dg-pagination')
    pageSize : 10,                      // page size (default: 10)
    params : {},                        // custom params (it will convert to string when send request)
    method : 'post',                    // ajax method, post/get (default: 'post')
    language : {                        // pagination plugin button language
        first : 'First',
        prev : 'Prev',
        next : 'Next',
        last : 'Last'
    },
    columns : [{                        // datagrid columns (*nessesary)
        field : 'username',             // json object key
        title : 'Username',             // datagrid column name
        hidden : true,                  // hide/show this column
        thStyle : 'text-align:center;', // use this into th's style
        tdStyle : 'text-align:center;'  // use this into td's style
    }, {
        field : 'role',
        title : 'Role'
    }, {
        field : 'regDate',
        title : 'Date registered',
        formatter : function(val, row) {
            // this is the custom formatter method
            // val: column value at this row
            // row: object at this row
            alert(new Date(val)); // use column value
            alert(row.toSource()); // use row object
            // you can use this method to return anything you want
            return 'null';
        }
    }]
});
```

## Methods
* reload

```javascript
$('#datagrid').twbsDatagrid('reload', {
    param_1 : 'val',
    param_2 : 111,
    param_3 : 10.08
});
```

* options

```javascript
var opts = $('#datagrid').twbsDatagrid('options');
console.log(JSON.stringify(opts));
```