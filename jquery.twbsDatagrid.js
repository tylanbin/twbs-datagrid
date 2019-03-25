(function($) {

	$.fn.twbsDatagrid = function(options, param) {
		// invoke the method (load, reload)
		if (typeof options == 'string') {
			return $.fn.twbsDatagrid.methods[options](this, param);
		}
		// only have options object, init the datagrid
		options = options || {};
		return this.each(function() {
			// check the binding data
			var state = $.data(this, 'twbsDatagrid');
			if (state) {
				// reinit the datagrid
				$.extend(state.options, options);
			} else {
				// init the datagrid
				$.data(this, 'twbsDatagrid', {
					options : $.extend({}, $.fn.twbsDatagrid.defaults, options)
				});
				$.fn.twbsDatagrid.initData(this);
			}
		});
	};
	
	// use default options to request data
	$.fn.twbsDatagrid.initData = function(target) {
		// get options from the datagrid
		var opts = $.data(target, 'twbsDatagrid').options;
		// send request
		$.ajax({
			type : opts.method,
			url : opts.url,
			data : {
				page : opts.current,
				rows : opts.pageSize,
				params : JSON.stringify(opts.params)
			},
			dataType : 'json',
			success : function(data) {
				// use data to generate html
				$.fn.twbsDatagrid.initHtml(target, data, opts.columns);
				// calculate total pages
				var total = 0;
				if (data.total % opts.pageSize == 0) {
					total = data.total / opts.pageSize;
				} else {
					total = parseInt(data.total / opts.pageSize) + 1;
				}
				if (total > 0) {
					// use twbs-pagination
					$(opts.pagination).twbsPagination({
						startPage : opts.current,
						totalPages : total,
						visiblePages : 5,
						first : opts.language.first,
						prev : opts.language.prev,
						next : opts.language.next,
						last : opts.language.last,
						onPageClick : function(event, page) {
							// set current page
							$.extend(opts, {
								current : page
							});
							// set pagination ajax action
							$.ajax({
								type : opts.method,
								url : opts.url,
								data : {
									page : page,
									rows : opts.pageSize,
									params : JSON.stringify(opts.params)
								},
								dataType : 'json',
								success : function(data) {
									$.fn.twbsDatagrid.initHtml(target, data, opts.columns);
								}
							});
						}
					});
				} else {
					// init a static twbs-pagination
					$(opts.pagination).twbsPagination({
						startPage : 1,
						totalPages : 1,
						visiblePages : 5,
						first : opts.language.first,
						prev : opts.language.prev,
						next : opts.language.next,
						last : opts.language.last
					});
				}
			}
		});
	};

	$.fn.twbsDatagrid.initHtml = function(target, data, columns) {
		// parse if defines columns
		if (columns && columns.length > 0) {
			// init table head
			var thead = '<thead><tr>';
			for (var i = 0; i < columns.length; i++) {
				if (columns[i].hidden && columns[i].hidden == true) {
					// if hidden attr is true, hide the column
				} else {
					var style = columns[i].thStyle ? columns[i].thStyle : '';
					thead += '<th style="' + style + '">' + columns[i].title + '</th>';
				}
			}
			thead += '</tr></thead>';
			// init table body
			var tbody = '<tbody>';
			if (data && data.datas.length > 0) {
				// parse if has data
				for (var i = 0; i < data.datas.length; i++) {
					var obj = data.datas[i];
					tbody += '<tr>';
					for (var j = 0; j < columns.length; j++) {
						if (columns[j].hidden && columns[j].hidden == true) {
							// if hidden attr is true, hide the column
						} else {
							// get column attrs
							var field = columns[j].field;
							var style = columns[j].tdStyle ? columns[j].tdStyle : '';
							// get column formatter method
							var formatter = columns[j].formatter;
							// handle column data
							var val = '';
							var row = {};
							if (obj) {
								row = obj;
								if (obj[field] && obj[field] != 'null' && obj[field] != 'undefined') {
									val = obj[field];
								}
							}
							if (formatter) {
								tbody += '<td style="' + style + '">' + formatter(val, row) + '</td>';
							} else {
								tbody += '<td style="' + style + '">' + val + '</td>';
							}
						}
					}
					tbody += '</tr>';
				}
			}
			tbody += '</tbody>';
			$(target).html(thead + tbody);
		}
	};

	$.fn.twbsDatagrid.methods = {
		reload : function(jq, param) {
			return jq.each(function() {
				var opts = $.data(this, 'twbsDatagrid').options;
				// destroy old pagination
				$(opts.pagination).empty();
				$(opts.pagination).removeData('twbs-pagination');
				$(opts.pagination).off('page');
				// return to the first page
				opts.current = 1;
				// add param and reinit
				$.extend(opts.params, param);
				$.fn.twbsDatagrid.initData(this);
			});
		},
		options : function(jq) {
			// get dg's config
			return $.data(jq[0], 'twbsDatagrid').options;
		}
	};

	$.fn.twbsDatagrid.defaults = {
		pagination : '#dg-pagination',
		current : 1,
		pageSize : 10,
		params : {},
		method : 'post',
		language : {
			first : 'First',
			prev : 'Prev',
			next : 'Next',
			last : 'Last'
		}
	};

})(jQuery);