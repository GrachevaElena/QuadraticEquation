function CheckData() {
    var a = $("#a");
    var b = $("#b");
    var c = $("#c");
    a = parseFloat(a.val());
    b = parseFloat(b.val());
    c = parseFloat(c.val());
    if (isNaN(a)) {
        SayError("a");
        return;
    }
    if (isNaN(b)) {
        SayError("b");
        return;
    }
    if (isNaN(c)) {
        SayError("c");
        return;
    }
    SendRequest(a,b,c);
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

function SendRequest(a,b,c){
    var url="/server?a="+a+"&b="+b+"&c="+c;
    var ajaxReq=new XMLHttpRequest();
    ajaxReq.onreadystatechange=function(){
        ShowRes(ajaxReq,a,b,c);
    };
    ajaxReq.open("GET", url, true);
    ajaxReq.send("");
}

function ShowRes(ajaxReq,a,b,c){
    if (ajaxReq.readyState==4)
        if (ajaxReq.status==200){
            var arr=ajaxReq.responseText.split(' ');
            ShowFormRes("Ответ:".italics()+" x"+"1".sub()+"="+arr[0]+", x"+"2".sub()+"="+arr[1]);
            ShowTable(a,b,c,arr[0],arr[1]);
        }
        else ShowFormRes("Ошибка соединения с сервером");
}

var nRows=0;
function ShowTable(a,b,c,x1,x2){
    var table=document.getElementById("mainTable");
    var row=document.createElement("tr");
    var td=[];
    for (i=0; i<5; i++){
        td[i]=document.createElement("td");
        row.appendChild(td[i]);
    }
    td[0].innerHTML=a;
    td[1].innerHTML=b;
    td[2].innerHTML=c;
    td[3].innerHTML=x1;
    td[4].innerHTML=x2;

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

