var JWLibrary = [];
 
JWLibrary.TokenProxy = function (controller, action, param, isProgress) {
    var loc = parent.location.href;
 
    var _I = this;
    var protocol = loc.indexOf('https://') == 0 ? 'https' : 'http';
    var host = window.location.host;
 
    var _I = this;
 
    var url = '';
 
    if(param == null)
        url = protocol + "://" + host + "/" + controller + "/" + action;
    else if(param == '')
        url = protocol + "://" + host + "/" + controller + "/" + action;
    else
        url = protocol + "://" + host + "/" + controller + "/" + action + "?" + param;
 
    if(isProgress){}
 
    this.WebMethod = function (type, json, token, successFn, errorFn) {
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json; charset=UTF-8",
            data: json,
            dataType: "json",
            headers : {
                "__Token": token
            },
            async: true,
            success: function (data, textStatus, xhr) {
                if(isProgress){}
 
                if (data.ResCd == "00") {
                    successFn(data);
                }
                else if (data.ResCd == "01") {
                    alert('Nothing Data.');
                    successFn(data);
                }
                else if (data.ResCd == "99") {
                    alert(data.ResMsg);
                    successFn(data);
                }
                else if (data.ResCd == "-1") {
                    alert('Error Message : ' + data.ResMsg);
                }
                else {
                    if (typeof data.ResCd == "undefined") {
                        var json = JSON.parse(data);
                        console.log("Error Code : " + json.ResCd + ", Error Message : " + json.ResMsg);
                    }
                    else {
                        console.log("Error Code : " + data.ResCd + ", Error Message : " + data.ResMsg);
                    }
 
                    return;
                }
            },
            error: function (xhr, textStatus) {
                if(isProgress) {}
 
                if (xhr.status == 0) {
                    return;
                }
            }
 
        })
    };
 
    return this;
}
 
JWLibrary.Proxy = function (controller, action, param, isProgress) {
    var loc = parent.location.href;
 
    var _I = this;
    var protocol = loc.indexOf('https://') == 0 ? 'https' : 'http';
    var host = window.location.host;
 
    var _I = this;
 
    var url = protocol + "://" + host + "/" + controller + "/" + action + "?" + param;
 
    if(isProgress) {}
 
    this.WebMethod = function (type, json, successFn, errorFn) {
        $.ajax({
            type: type,
            url: url,
            contentType: false,
            processData: false,
            data: json,
            dataType: "json",
            async: true,
            success: function (data, textStatus, xhr) {
                if(isProgress) {}                   
 
                if (data.ResCd == "00") {
                    successFn(data);
                }
                else if (data.ResCd == "01") {
                    successFn(data);
                    alert('Nothing Data.');
                }
                else if (data.ResCd == "99") {
                    alert(data.ResMsg);
                    successFn(data);
                }
                else if (data.ResCd == "-1") {
                    alert('Error Message : ' + data.ResMsg);
                }
                else {
                    console.log("Error Code : " + data.ResCd + ", Error Message : " + data.ResMsg);
                    return;
                }
            },
            error: function (xhr, textStatus) {
                if(isProgress){ }
 
                if (xhr.status == 0) return;
            }
 
        })
    };
 
    return this;
}
 
JWLibrary.NPTokenProxy = function (controller, action, param) {
    var loc = parent.location.href;
 
    var _I = this;
    var protocol = "http";
    var host = window.location.host;
 
    var _I = this;
 
    var url = protocol + "://" + host + "/" + controller + "/" + action + "?" + param;
 
    this.WebMethod = function (type, json, token, successFn, errorFn) {
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json; charset=UTF-8",
            data: json,
            dataType: "json",
            headers: {
                "RequestVerificationToken": token
            },
            async: true,
            success: function (data, textStatus, xhr) {
                if (data.ResCd == "00") {
                    successFn(data);
                    return;
                }
                else if (data.ResCd == "01") {
                    successFn(data);
                    alert('Nothing Data.');
                    return;
                }
                else if (data.ResCd == "99") {
                    alert(data.ResMsg);
                    successFn(data);
                }
                else if (data.ResCd == "-1") {
                    alert('Error Message : ' + data.ResMsg);
                    return;
                }
                else {                    
                    successFn(data);
                    return;
                }
            }
        })
    };
 
    return this;
}
 
JWLibrary.DataTable = function (tableId) {
    var _headerNames = [];
    var _colNames = [];
    var _inputTypes = [];
    var _colVisibles = [];
    var _colAligns = [];
    var _indexVisible = true;
    var _rowCnt = 0;
    var _selectedIndex = 0;
    var _footerVisible = false;
    var _footerColSumAllows = [];
    var _colWidths = [];
    var _colCommas = [];
    var _colCases = [];
    var _colUrls = [];
    var _colfunctions = [];
    var _colCheckbox = false;
 
    var _I = this;
 
    this.init = function (
        headerNames,        //col header name
        colNames,           //col data key name
        colVisibles,        //col visible
        colAligns,          //col text align
        inputTypes,         //col types (support text, input)
        indexVisible,       //index column visible
        colCheckbox,           //add checkbox col
        footerVisible,      //footer visible
        footerColSumAllows, //footer column summary yn
        colWidths,          //col width by bootstrap
        colCommas,          //col comma for decimal
        colCases,           //set col case
        colUrls,            //set col link url
        colfunctions       
    ) {
        _headerNames  = headerNames;
        _colNames  = colNames;
        _inputTypes   = inputTypes;
        _colVisibles     = colVisibles;
        _indexVisible = indexVisible;
        _colAligns   = colAligns;
        _footerVisible    = footerVisible;
        _footerColSumAllows   = footerColSumAllows;
        _colWidths    = colWidths;
        _colCommas    = colCommas;
        _colCases = colCases;
        _colUrls = colUrls;
        _colfunctions = colfunctions;
        _colCheckbox = colCheckbox;
 
        fnRenderHeader();
    }
 
    //header set
    function fnRenderHeader() {
        var $table = $(tableId);
 
        $table.prepend('<thead id="DEF_tbHead" class="text-center"><tr></tr></thead>');
        $thead = $table.find('thead > tr:first');
 
        if (_colCheckbox == true) {
            $thead.append('<th style="width:50px;">#</th>');
        }
 
        if (_indexVisible == true)
            $thead.append('<th style="width:50px;">IDX</th>');
        else
            $thead.append('<th class="hidden">IDX</th>');
 
        for (var i = 0; i < _headerNames.length; i++) {
            if (_colVisibles[i] == false) {
                $thead.append('<th class="text-center ' + _colWidths[i] + ' hidden">' + _headerNames[i] + '</th>');
            }
            else {
                $thead.append('<th class="text-center ' + _colWidths[i] + '">' + _headerNames[i] + '</th>');
            }
        }
 
        $thead.append('<th class="hidden">EDIT_FLAG</th>');
 
        $.each(_colfunctions, function (key, value) {
            if (key == 'removeRow') {
                $thead.append('<th class="text-center" style="width:50px;">삭제</th>');
                var $editFlag = $tbody.find('.DEF_EDIT_FLAG_ROW_' + _I.selectedIndex());
                $component.off();
                $component.on('change', function () {                    
                    var v = $(this).val();
                    $(this).val(v.setComma());
                    fnRenderFooter(tableId);                   
                    $editFlag.text(true);                   
                    return false;
                });
            }
        }
 
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var $trs = $tbody.find('tr');
 
        $trs.each(function (row) {
            //$(this).find('td .DEF_EDIT_FLAG').on('change';
 
            //$(cells).each(function (i) {
 
            //});
        });
    }
 
    //body set
    function fnRenderBody(data) {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
 
        if ($tbody.length > 0) {
            $tbody.empty();
        }
        else {
            $table.append('<tbody id="DEF_tbBody" class="text-center"></tbody>');
        }
 
        for (var row = 0; row < data.length; row++) {
            //var rowData = $.map(data[row], function (el) { return el });
            fnRenderRow(row, data[row]);           
        }
    }
 
    //row set
    function fnRenderRow(row, rowData) {
        var $table = $(tableId);
        $tbody = $table.find('tbody:last');
 
        $tbody.append($('<tr class="clickable-row DEF_ROW_' + (row) + '">'));
        var $tr = $tbody.find('.DEF_ROW_' + row);
 
        if (_colCheckbox == true) {
            $tr.append('<td class="DEF_CHK"><input type="checkbox" class="DEF_CHECKBOX"/></td>');
        }
 
        if (_indexVisible == true) {
            $tr.append('<td class="DEF_IDX">' + (row + 1) + '</td>');
        }
        else {
            $tr.append('<td class="DEF_IDX" style="display:none;">' + (row + 1) + '</td>');
        }
 
        //set td
        for (var i = 0; i < _colNames.length; i++) {
            $tr.append('<td class="hidden">' + _colNames[i] + '</td>');
            var val = lookup(rowData, _colNames[i]);
            $tr.append('<td class="DEF_' + _colNames[i] + '">' + val + '</td>');           
        }
        $tr.append('<td class="DEF_EDIT_FLAG" style="display:none;">EDIT_FLAG</td>');
        $tr.append('<td class="DEF_EDIT_FLAG_ROW_' + row + '" style="display:none;">False</td>');
 
        //set col's case
        for (var i = 0; i < _colCases.length; i++) {
            if (_colNames.indexOf(_colCases[i][0]) >= 0) {
                var $td = $tr.find('.DEF_' + _colCases[i][0]);
 
                var v = lookup(_colCases[i][1], $td.text());
                $td.text(v);
            }
        }
 
        //set col's url
        for (var i = 0; i < _colUrls.length; i++) {
            if (_colNames.indexOf(_colUrls[i][0]) >= 0) {
                var $td = $tr.find('.DEF_' + _colUrls[i][0]);
                var url = _colUrls[i][1];
 
                for (var j = 2; j < _colUrls[i].length; j++) {
                    url = url.replace('#param' + ((j - 1) + ''), lookup(rowData, _colUrls[i][j]));
                }
 
                var aTag = $('<a>', { href: url });
                aTag.css('text-decoration', 'underline');
                aTag.text($td.text());
                $td.text('').append(aTag);
            }
        }
 
        //set col's visible
        for (var i = 0; i < _colNames.length; i++) {
            if (_colVisibles[i] == false) {
                var $td = $tr.find('.DEF_' + _colNames[i]);
                $td.css('display', 'none');
            }
        }
 
        $table.off();
        $tr.on('click', function () {
            _selectedIndex = parseInt($(this).find('.DEF_IDX').text()) - 1;
 
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            else {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
 
        $.each(_colfunctions, function (key, value) {
            if (key == 'removeRow') {
                $tr.append('<td class="DEF_REMOVE"><button class="btn btn-sm btn-danger DEF_BTN_REMOVE" style="padding:0px 10px;">삭제</button></td>');
 
                var $removeBtn = $tr.find('.DEF_BTN_REMOVE');
                $removeBtn.on('click', function () {
                    var $func = lookup(_colfunctions, 'removeRow');
                    $func.call('', _I.selectedIndex());                   
                });
            }
        });
 
        $tr.each(function (row) {
            var $cells = $(this).find('td');
            var index = -1;
 
            $cells.each(function (j) {
                if ($(this).attr('class') != 'DEF_IDX' &&
                    $(this).attr('class') != 'hidden' &&
                    $(this).attr('class') != 'DEF_CHECKBOX') {
                    var $d = $('option:selected', this).val() || $(this).text() || $(this).val();
 
                    if (_colCommas[index] == true) {
                        $(this).text($d.setComma());
                    }
 
                    if (_inputTypes[index] == 'input') {
                        $(this).html('<input type="text" class="' + _colAligns[index] + '" value="' + $(this).text() + '"  />');
                    }
                    else {
                        $(this).attr('class', _colAligns[index]);
                    }
 
                    index++;
                }
            });
        });
    }
 
    this.getBody = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
 
        return $tbody;
    }
 
    this.getTableElement = function () {
        return $(tableId);       
    }
 
    this.getCheckRowData = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var dummayArr = new Array();
 
        $tbody.find('tr').each(function (row) {
            var $checkbox = $(this).find('.DEF_CHECKBOX');
            if ($checkbox.is(':checked') == true) {
                var cells = $(this).find('td');
 
                $(cells).each(function (i) {
                    if (
                        $(this).attr('class') != 'DEF_IDX' &&
                        $(this).attr('class') != 'DEF_REMOVE' &&
                        $(this).attr('class') != 'DEF_CHK'
                       ) {
                        var $d = $('option:selected', this).val() || $(this).text() || $(this).val();
 
                        if ($d == '') {
                            $d = $(this).find('input').val();
                        }
 
                        dummayArr.push($d);
                    }
                });
            }
        });
 
 
        var obj = [];
        var retObj = new Array();
        var divLength = dummayArr.length / 2;
 
        for (var i = 0; i <= dummayArr.length; i = i + 2) {
            var keyValuePair = new Object();
            keyValuePair.Key = dummayArr[i];
            keyValuePair.Value = dummayArr[i + 1];
            obj.push(keyValuePair);
 
            if (i == 0) continue;
            if (dummayArr[i + 2] == _colNames[0]) {
                retObj.push(obj);
                obj = [];
            }
            else if (dummayArr.length == i + 2) {
                retObj.push(obj);
                obj = [];
            }
        }
 
        return retObj;
    }
 
    //keyvalue pair
    function lookup(obj, key) {
        var type = typeof key;
        if (type == 'string' || type == 'number') key = ('' + key).replace(/\[(.*?)\]/, function (m, key) {
            return '.' + key;
        }).split('.');
 
        for (var i = 0, l = key.length, currentKey; i < l; i++) {
            if (obj.hasOwnProperty(key[i])) obj = obj[key[i]];
            else return undefined;
        }
 
        return obj;
    }
       
    //binding
    this.dataSource = function (data) {       
        fnRenderBody(data);       
        fnRenderFooter();       
        fnRegEvent();
 
        _rowCnt = data.length;
    }
 
    //add
    this.addRow = function (array) {
        fnRenderRow(_rowCnt, array);       
        fnRenderFooter();
        fnRegEvent();
        _rowCnt++;
    }
 
    //remove
    this.removeRow = function (rowId) {
        var $table = $(tableId);
        var $row = $table.find('.DEF_ROW_' + rowId);
        $row.remove();
    }
 
    //all clear
    this.clearAll = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var $tfoot = $table.find('tfoot');
        $tbody.empty();
        $tfoot.empty();
    }
 
    //get all data (signed col's only)
    this.getAllData = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var dummayArr = new Array();
 
        $tbody.find('tr').each(function (row) {
            var cells = $(this).find('td');
            $(cells).each(function (i) {
                if (i > 0) {
                    if (
                        $(this).attr('class') != 'DEF_IDX' &&
                        $(this).attr('class') != 'DEF_REMOVE'
                       )
                    {
                        var $d = $('option:selected', this).val() || $(this).text() || $(this).val();
 
                        if ($d == '') {
                            $d = $(this).find('input').val();
                        }
 
                        dummayArr.push($d);
                    }
                }
            });
        });
 
       
        var obj = [];
        var retObj = new Array();
        var divLength = dummayArr.length / 2;
 
        for (var i = 0; i <= dummayArr.length; i = i + 2) {
            var keyValuePair = new Object();
            keyValuePair.Key = dummayArr[i];
            keyValuePair.Value = dummayArr[i + 1];
            obj.push(keyValuePair);
 
            if (i == 0) continue;
            if (dummayArr[i  +  2] == _colNames[0]) {
                retObj.push(obj);
                obj = [];
            }
            else if (dummayArr.length == i + 2) {
                retObj.push(obj);
                obj = [];
            }
        }
 
        return retObj;
    }
 
    //get row data (signed col's only)
    this.getRowData = function (rowId) {       
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var dummayArr = new Array();
 
        $tbody.find('.DEF_ROW_' + rowId).each(function () {
            var cells = $(this).find('td');
 
            $(cells).each(function (i) {
                if (i > 0) {
                    var $d = $('option:selected', this).val() || $(this).text() || $(this).val();
 
                    if ($d == '') {
                        $d = $(this).find('input').val();
                    }
 
                    dummayArr.push($d);
                }
            });
        });
       
        var retObj = new Array();
        for (var i = 0; i < dummayArr.length; i += 2) {
            var keyValuePair = new Object();
            keyValuePair.Key = dummayArr[i];
            keyValuePair.Value = dummayArr[i + 1];
            retObj.push(keyValuePair);
        }
       
        return retObj;
    }
 
    //get row number
    this.selectedIndex = function () {
        return _selectedIndex;
    }
 
    //set row data (signed col's only)
    this.setRowData = function (rowId, colName, val) {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var dummayArr = new Array();
 
        $tbody.find('.DEF_ROW_' + rowId).each(function () {
            var cells = $(this).find('td');
           
            $(cells).each(function (i) {
                if ($(this).attr('class') == "DEF_" + colName) {
                    var $d = $(this).find('input').val(val);
 
                    if ($d.attr('type') != 'text') {
                        $(this).text(val);
                    }
                }
            });
        });
    }
 
    return this;
}
 
 
///*****************************************************************
//string extensions
Number.prototype.setComma = function () {
    return String(this).setComma();
}

String.prototype.setComma = function () {
    return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

Number.prototype.unComma = function () {
    return String(this).unComma();
}

String.prototype.unComma = function () {
    return this.replace(/[^\d]+/g, '');
}
//*****************************************************************/
