Bootstrap DataGrid
======
Bootstrap DataGrid is a simple tool used to display data with Bootstrap. It is easy tou use, just like jQuery EasyUI Datagrid, but only have some simple params.

## Required
* jQuery
* Bootstrap v3
* [jQuery pagination plugin](https://github.com/esimakin/twbs-pagination)

## How to
* 

## Options
```javascript
$('#datagrid').twbsDatagrid({
	url : 'data.json',				// request url (*nessesary)
	pagination : '#dg-pagination',			// pagination plugin id (default: '#dg-pagination')
	pageSize : 10,					// page size (default: 10)
	params : {},					// custom params (it will convert to string when send request)
	method : 'post',				// ajax method, post/get (default: 'post')
	language : {					// pagination plugin button language
		first : 'First',
		prev : 'Prev',
		next : 'Next',
		last : 'Last'
	}
	columns : [{					// datagrid columns (*nessesary)
		field : 'username',			// json object key
		title : 'Username'			// datagrid column name
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
```javascript
$('#datagrid').twbsDatagrid('reload', {
	param_1 : 'val',
	param_2 : 111,
	param_3 : 10.08
});
```