# JWLibraryJs
javascript and jquery extensions

[How to Use]
1. JWLibrary.Proxy
~~~
var proxy = JWLibrary.Proxy('[controller]', '[action]', param, false);
proxy.WebMethod('GET', null('JsonData'), function(data){
    //get data and handle
});
~~~

2. JWLibrary.DataTable
~~~
//view html
<div class="row">
    <div class="x_panel">
        <div class="col-md-12">               
            <button class="col-md-1 btn btn-danger" onclick="javascript:fnRowRemove();">삭제</button>
        </div>
        <div class="x_content">
            <div class="table-responsive">                   
                <table class="table table-striped table-bordered bulk_action" id="tbListTemp"></table>                
            </div>
        </div>
    </div>
</div>

//view script (datatable init and remove function)
<script type="text/javascript">   
    var _datatable;
    $(document).ready(function () {
        _datatable = JWLibrary.DataTable('#tbListTemp');
        _datatable.init(
            ['No.', '상품종류', '상품명', '전체수량', '판매수량', '사용여부', '등록일', 'G_IDX'],
            ['S_NUM', 'PRODUCT_TYPE', 'TITLE', 'CNT1', 'CNT2', 'ISACTIVE', 'REG_DT', 'G_IDX'],
            [true, true, true, true, true, true, true, false],
            ['text-center', 'text-center', 'text-center', 'text-right', 'text-right', 'text-center', 'text-center', ''],
            ['text', 'text', 'text', 'text', 'text', 'text', 'text', ''],
            false,
            false,
            [],
            [],
            [false, false, false, true, true, false, false, false],
            [
                ['PRODUCT_TYPE', { '1': '[display name]', '2': '[display name]', '3': '[display name]', '4': '[display name]' }], //set col's mapping [column, {'data':'display text', ...}]
            ],
            [
                ['TITLE', '/Test/Detail?idx=#param1', 'G_IDX'] //set col's url link [column, url(ex:=#param1&...=#param2, mapping row data]
            ],
            ['remove']
        );     
    });
    
    function fnRowRemove() {
        var rowId = _datatable.selectedIndex();

        var proxy = JWLibrary.Proxy('Test', 'GetMembers', null);
        proxy.WebMethod('GET', null, function (data) {
            if (data.ResCd == '00') {
                _datatable.removeRow(rowId);                   
            }
        });           
    } 
</script>
~~~
