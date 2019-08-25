//保存事件
document.onkeydown = function(e){
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if(e.ctrlKey && keycode== 83){
        e.preventDefault();
        window.event.returnValue= false;
        //alert("as");
        btnSave_click();
    }
    if(keycode == 113){
        //保存操作
        btnSave_click()
        var t=$("#txtPath").val(); 
        $("#txtPath").focus()//.val(t)
        // console.log(t.length)
        $("#txtPath")[0].setSelectionRange(0,t.length);
    }
}

pathKeyDown = ()=>{
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if(keycode == 13){
        jump()
        return false
    }
    return true
}

var  jump = ()=>{
    //不进行保存操作
    btnSave_click = function(){}
    window.location.href = "/"+ $("#txtPath").val()
    return false
}

//todo load
var orginText=""
//保存按钮事件
var btnSave_click = function(){
                var text = $('#txtMain').val();
                if(orginText == text){
                    return;
                }
                orginText = text;
                var path =  "/"+ $("#txtPath").val();
                $.ajax({
                    type: 'post',
                    url: '/save' ,
                    data: {path:path,text:text} ,
                    success: function(data){
                        //alert(data.success);
                        //alert('saved');
                    } ,
                    dataType:'json',
                    error:function(err){
                        //alert('err:'+JSON.stringify(err));
                        console.log('err:'+JSON.stringify(err))
                    }
                });
                return false;
            }

function getUrlRelativePath()
　　{
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");


        // only support pnote as subDir
　　　　var start = arrUrl[1].indexOf("/");
        if(arrUrl[1].indexOf("/pnote/") > -1){
            start+=6
        }
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
　　}

//focus
$('#txtMain').focus()


$(document).ready(function(){ 
    var rPath = getUrlRelativePath()
    $("#txtPath").val(rPath)
}); 
