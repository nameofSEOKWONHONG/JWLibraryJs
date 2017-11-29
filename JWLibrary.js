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
 
    if(isProgress)
        fnProgressShow();
 
    this.WebMethod = function (type, json, token, successFn, errorFn) {
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json; charset=UTF-8",
            data: json,
            dataType: "json",
            headers : {
                "RequestVerificationToken": token
            },
            async: true,
            success: function (data, textStatus, xhr) {
                if(isProgress)
                    fnProgressClose();
 
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
                if(isProgress)
                    fnProgressClose();
 
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
 
    if(isProgress)
        fnProgressShow();
 
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
                if(isProgress)
                    fnProgressClose();
 
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
                if(isProgress)
                    fnProgressClose();
 
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
 
    this.init = function (
        headerNames,        //col header name
        colNames,           //col data key name
        colVisibles,        //col visible
        colAligns,          //col text align
        inputTypes,         //col types (support text, input)
        indexVisible,       //index column visible
        footerVisible,      //footer visible
        footerColSumAllows, //footer column summary yn
        colWidths,          //col width by bootstrap
        colCommas           //col comma for decimal
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
 
        fnSetHeader();
        //fnSetFooter(tableId);
        fnRegEvent();
    }
 
    function fnSetHeader() {
        var $table = $(tableId);
 
        $table.prepend('<thead id="DEF_tbHead" class="text-center"><tr></tr></thead>');
        $thead = $table.find('thead > tr:first');
 
        if (_indexVisible == true)
            $thead.append('<th style="width:50px;">IDX</th>');
        else
            $thead.append('<th style="display:none;">IDX</th>');
 
        for (var i = 0; i < _headerNames.length; i++) {
            $thead.append('<th class="text-center ' + _colWidths[i] + '">' + _headerNames[i] + '</th>');
       }
    }
 
    function fnRegEvent() {
        var $table = $(tableId);
        $table.on('click', 'tr', function () {
            //$(this).data('isSelected', true);
            //$(this).siblings().data('isSelected', false);
            //_selectedIndex = $tbody.find('tr').index(this);
 
            _selectedIndex = parseInt($(this).find('.DEF_IDX').text()) - 1;
        });
 
        $table.on('click', '.clickable-row', function (event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            else {
                $(this).addClass('active').siblings().removeClass('active');
            }
        });
    }
 
    function fnSetFooter() {
        var $table = $(tableId);       
 
        if (_footerVisible == true) {
            $tfoot = $table.find('tfoot');
 
            if ($tfoot.length > 0) {
                $tfoot.empty();
            }
            else {
                $table.append('<tfoot id="DEF_tbFoot" class="text-center"><tr></tr></tfoot>');
            }
 
            var $tbody = $table.find('tbody');
            var dummayArr = new Array();
 
            var summaries = [];
            for (var i = 0; i < 4; i++) {
                summaries[i] = 0;
            }
 
            $tbody.find('tr').each(function (row) {
                for (var i = 0; i < _colNames.length; i++) {
                    var row = $(this).find('.DEF_' + _colNames[i]);
                    var d = $('option:selected', row).val() || row.text().unComma() || row.val();                   
 
                    if (d == '') {
                        d = $(this).find('input').val().unComma();
                    }
 
                    if ($.isNumeric(d)) {
                        summaries[i] = summaries[i] + parseInt(d);
                    }
                    else {
                        summaries[i] = summaries[i] + 0;
                    }
 
                    console.log('i:' + i);
                    console.log('summaries[i]:' + summaries[i]);
                }
            });
 
            $tfoot = $table.find('tfoot:last');
            $tfoot.empty();
 
            var footHtml = '';
            footHtml += '<tr>';
            footHtml += '<th>합계</th>';
            for (var i = 0; i < _colNames.length; i++) {
                if (_footerColSumAllows[i] == true) {
                    footHtml += '<th class="' + _colAligns[i] + '">' + summaries[i] + '</th>';
                }
                else {
                    footHtml += '<th class="' + _colAligns[i] + '">0</th>';
                }
            }
            footHtml += '</tr>'
 
            $tfoot.html(footHtml);
        }
    }
 
    this.dataSource = function (data) {
        fnBodyRender(data);
        fnSetFooter();
 
        for (var i = 0; i < _colNames.length; i++) {
            if (_inputTypes[i] == "input") {
                var $table = $(tableId);
                var $tbody = $table.find('tbody');
 
                var $component = $tbody.find('.DEF_' + _colNames[i]).find('input');
 
                $component.on('change', function () {
                    var v = $(this).val();
                    $(this).val(v.setComma());
                    fnSetFooter(tableId);
                    //alert('t');
                });
            }
        }
    }
 
    function fnBodyRender(data) {
        var $table = $(tableId);
        $tbody = $table.find('tbody');
 
        if ($tbody.length > 0) {
            $tbody.empty();
        }
        else {
            $table.append('<tbody id="DEF_tbBody" class="text-center"><tr></tr></tbody>');
        }
 
        $tbody = $table.find('tbody:last');
 
        _rowCnt = data.length;
 
        var bodyHtml = '';
        for (var row = 0; row < data.length; row++) {
            var rowData = $.map(data[row], function (el) { return el });
 
            bodyHtml = '<tr class="clickable-row DEF_ROW_' + (row) + '">';
            if (_indexVisible == true) {
                bodyHtml += '<td class="DEF_IDX">' + (row + 1) + '</td>';
            }
 
            for (var col = 0; col < rowData.length; col++) {
                if (_inputTypes.length <= 0) {
                    bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                    if (_colCommas[col] == true) {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col].setComma() + '</td>';
                    }
                    else {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col] + '</td>';
                    }
                }
                else {
                    if (_inputTypes[col] == 'text') {
                        bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                        if (_colCommas[col] == true) {
                            bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col].setComma() + '</td>';
                        }
                        else {
                            bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col] + '</td>';
                        }
                    }
                    else if (_inputTypes[col] == 'input') {
                        bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                        if (_colCommas[col] == true) {
                            bodyHtml += '<td class="DEF_' + _colNames[col] + '"><input type="text" value="' + rowData[col].setComma() + '" class="' + _colAligns[col] + '"/></td>';
                        }
                        else {
                            bodyHtml += '<td class="DEF_' + _colNames[col] + '"><input type="text" value="' + rowData[col] + '" class="' + _colAligns[col] + '"/></td>';
                        }
                    }
                }
            }
 
            bodyHtml += '</tr>';
            $tbody.append(bodyHtml);
        }
    }
 
    this.addRow = function (rowData) {
        var $table = $(tableId);
        $tbody = $table.find('tbody:last');
 
        var bodyHtml = '';
        bodyHtml = '<tr class="clickable-row DEF_ROW_' + (_rowCnt) + '">';
 
        if (_indexVisible == true) {
            bodyHtml += '<td class="DEF_IDX">' + (_rowCnt + 1) + '</td>';
        }       
 
        for (var col = 0; col < rowData.length; col++) {
            if (_inputTypes.length <= 0) {
                bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                if (_colCommas[col] == true) {
                    bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col].setComma() + '</td>';
                }
                else {
                    bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col] + '</td>';
                }
            }
            else {
                if (_inputTypes[col] == 'text') {
                    bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                    if (_colCommas[col] == true) {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col].setComma() + '</td>';
                    }
                    else {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + ' ' + _colAligns[col] + '">' + rowData[col] + '</td>';
                    }
                }
                else if (_inputTypes[col] == 'input') {
                    bodyHtml += '<td class="hidden">' + _colNames[col] + '</td>';
 
                    if (_colCommas[col] == true) {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + '"><input type="text" value="' + rowData[col].setComma() + '" class="' + _colAligns[col] + '"/></td>';
                    }
                    else {
                        bodyHtml += '<td class="DEF_' + _colNames[col] + '"><input type="text" value="' + rowData[col] + '" class="' + _colAligns[col] + '"/></td>';
                    }
                }
            }
        }
 
        bodyHtml += '</tr>';
        $tbody.append(bodyHtml);
 
        _rowCnt++;
 
        for (var i = 0; i < _colNames.length; i++) {
            if (_inputTypes[i] == "input") {
                var $table = $(tableId);
                var $tbody = $table.find('tbody');
 
                var $component = $tbody.find('.DEF_' + _colNames[i]).find('input');
 
                $component.on('change', function () {
                    var v = $(this).val();
                    $(this).val(v.setComma());
                    fnSetFooter(tableId);
                    //alert('t');
                });
            }
        }
    }
 
    this.removeRow = function (rowId) {
        var $table = $(tableId);
        var $row = $table.find('.DEF_ROW_' + rowId);
        $row.remove();
    }
 
    this.clearAll = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        $tbody.empty();
 
        fnSetFooter();
    }
 
    this.getAllData = function () {
        var $table = $(tableId);
        var $tbody = $table.find('tbody');
        var dummayArr = new Array();
 
        $tbody.each(function () {
            var cells = $(this).find('td');
 
            $(cells).each(function (i) {
                if ($(this).attr('class') != 'DEF_IDX') {
                    var $d = $('option:selected', this).val() || $(this).text() || $(this).val();
 
                    if ($d == '') {
                        $d = $(this).find('input').val();
                    }
 
                    dummayArr.push($d);
                }
            });
        });
 
        var retObj = new Array();
        var obj = [];
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
 
    this.selectedIndex = function () {
        return _selectedIndex;
    }
 
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
    return this;
}
