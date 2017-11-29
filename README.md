# JWLibraryJs
javascript and jquery extensions

[How to Use]
1. JWLibrary.Proxy
var proxy = JWLibrary.Proxy('[controller]', '[action]', param, false);
proxy.WebMethod('GET', null('JsonData'), function(data){
    //get data and handle
});

2. JWLibrary.DataTable
<script type="text/javascript">   
    var _datatable;
    $(document).ready(function () {
        _datatable = JWLibrary.DataTable('#tbList');
        _datatable.init(
            ['Id', '이름', '부서', '이메일', '비용'],  //col header name
            ['Id', 'Name', 'Dept', 'Email', 'Cost'], //col name
            [true, true, true, true, true], //col visible
            [],//['text-center', 'text-center', 'text-center', 'text-center', 'text-right'], //col text align
            [],//['text', 'text', 'text', 'text', 'text'], //col type
            false, //index col visible
            false, //footer visible
            [],//[true, true, true, true, false], //footer col summary yn
            ['col-md-1', 'col-md-1', 'col-md-1' , 'col-md-1', 'col-md-1'], //col width by bootstrap
            [false, false, false, false, true] //col comma for decimal
        );
    });
 
    function fnLoad() {
        var proxy = JWLibrary.Proxy('Test', 'GetMembers', null, false);
        proxy.WebMethod('GET', null, function(data){
            if(data.ResCd == '00'){
                _datatable.dataSource(JSON.parse(data.ResData.Table));
            }
        });
    }
 
    function fnAdd() {
        _datatable.addRow([10, 'test4', 'test4 dept', 'test4@gmail.com', 20000]);
    }
 
    function fnRemove() {
        var selectedIndex = _datatable.selectedIndex();
        _datatable.removeRow(selectedIndex);
    }
 
    function fnGetRowData() {
        var selectedIndex = _datatable.selectedIndex();
        console.log(_datatable.getRowData(selectedIndex));
    }
 
    function fnClear() {
        _datatable.clearAll();
    }
 
    function fnGetAllData() {
        console.log(_datatable.getAllData());
    }
 
    function fnGetRowCount() {
        var rowCnt = _datatable.getAllData();
        alert(rowCnt.length);
    }
 
    function fnSetRowData() {
        var selectedIndex = _datatable.selectedIndex();
        _datatable.setRowData(selectedIndex, 'Cost', 20);
    }
 
</script>
