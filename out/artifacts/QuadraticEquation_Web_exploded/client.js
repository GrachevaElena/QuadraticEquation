function CreateObjData(){
    var A = $("#a");
    var B = $("#b");
    var C = $("#c");
    var data={a:A, b:B, c:C};
    var coef=CheckData(data);
    if (coef!=undefined) SayError(coef);
    else SendRequest(data);
}

function CheckData(data) {
    data.a = parseFloat(data.a.val());
    data.b = parseFloat(data.b.val());
    data.c = parseFloat(data.c.val());
    if (isNaN(data.a)) {
        return "a";
    }
    if (isNaN(data.b)) {
        return "b";
    }
    if (isNaN(data.c)) {
        return "c";
    }
    return undefined;
}

function SayError(coef){
    var str="Ошибка: коеффициент \""+coef+"\" должен быть числом";
    ShowFormRes(str);
}

function ShowFormRes(str){
    var form =  document.getElementById("resForm");
    var lastText=document.getElementById("resText");
    if (lastText!=undefined) form.removeChild(lastText);
    var res=document.createElement("p");
    res.id="resText"
    res.innerHTML=str;
    form.insertBefore(res,undefined);
}

function SendRequest(data){
    alert(JSON.stringify(data));
    var url="/server?json="+JSON.stringify(data);
    var ajaxReq=new XMLHttpRequest();
    ajaxReq.onreadystatechange=function(){
        ShowRes(ajaxReq,data);
    };
    ajaxReq.open("GET", url, true);
    ajaxReq.send("");
}

function ShowRes(ajaxReq,data){
    if (ajaxReq.readyState==4)
        if (ajaxReq.status==200){
            var arr=ajaxReq.responseText.split(' ');
            ShowFormRes("Ответ:".italics()+" x"+"1".sub()+"="+arr[0]+", x"+"2".sub()+"="+arr[1]);
            ShowTable(data,arr);
        }
        else ShowFormRes("Ошибка соединения с сервером");
}

var nRows=0;
function ShowTable(data,res){
    var table=document.getElementById("mainTable");
    var row=document.createElement("tr");
    var td=[];
    for (i=0; i<5; i++){
        td[i]=document.createElement("td");
        row.appendChild(td[i]);
    }
    td[0].innerHTML=data.a;
    td[1].innerHTML=data.b;
    td[2].innerHTML=data.c;
    td[3].innerHTML=res[0];
    td[4].innerHTML=res[1];

    row.id=nRows;

    if (nRows%2===0)
        row.classList.add("lightRow");
    nRows++;

    row.onclick=function(){
        table.removeChild(row);
        nRows--;
        var list=table.getElementsByTagName("tr");
        for(i=0; i<list.length; i+=2) {
            list[i].classList.add("lightRow");
        }
        for(i=1; i<list.length; i+=2) {
            list[i].classList.remove("lightRow");
        }
    }

    table.appendChild(row);
}

