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
    window.location.href =  $("#txtPath").val().indexOf('/')==0 ? $("#txtPath").val() : ("/"+$("#txtPath").val())
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
                var path = $("#txtPath").val();
                if(path.indexOf('/')!=0){
                    path = '/' + path
                }
                var data= {}
                data.value = text
                $.ajax({
                    type: text ? 'put' : 'delete',
                    url: '/data?node=' + path ,
                    data:  data,
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

function getHomePath(){
    var url = document.location.toString();
    var arrUrl = url.split("//");
// only support pnote as subDir
　　　　var start = arrUrl[1].indexOf("/");
    var path = arrUrl[0]
        path += arrUrl[1].substring(0,start || null)
        
        if(arrUrl[1].indexOf("/pnote/") > -1){
            path +="/pnote/"
        }
　　　　return path
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
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// markdown
var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    marked.setOptions({
        highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

var isNeedRender=true
var render = ()=>{
    document.getElementById('view').innerHTML = marked($('#txtMain').val());
}
setInterval(() => {
    if(isNeedRender){
        isNeedRender=false
        render()
    }
}, 100);
var setRender=()=>{
    isNeedRender=true
}

//变更模式
var changeMode=()=>{
    if($('.edit').is(":visible")){
        $('#view').css({
            "width" : "100%",
            "height":"100%",
            "background":"#F0FFEE",
            "position" : "absolute"
        })
        $('.edit').hide()
    }else{
        $('.edit').show()
        $('#view').css({
            "width" : "100%",
            "height":"",
            "background":"",
            "position" : ""
        })
    }
   
}

//focus
$('#txtMain').focus()


$(document).ready(function(){ 
    var rPath = getUrlRelativePath()
    $("#txtPath").val(rPath)

    //loading
    $.ajax({
        type: 'get',
        url: '/data?node=' + rPath ,
        success: function(data){
            //alert(data.value);
            //alert('saved');
            if(data&& data.value){
                $("#txtMain").val(data.value)
                setRender()
            }
        } ,
        dataType:'json',
        error:function(err){
            //alert('err:'+JSON.stringify(err));
            console.log('err:'+JSON.stringify(err))
        }
    });

    // loading list
    $.ajax({
        type: 'get',
        url: '/data',
        success: function(data){
            //alert(data.value);
            //alert('saved');
            
            //<li class="uk-active"><a href="#">Active</a></li>
            // <li><a href="#">Item</a></li>
            // <li><a href="#">Item</a></li>
            // <li><a href="#">Item</a></li>
            // <li><a href="#">Item</a></li>
            for(var key in data){//遍历json数组时，这么写p为索引，0,1
                $("#navList").append($('<li><a href="' + key+ '">' + key+'</a></li>'));    
             }
              
        } ,
        dataType:'json',
        error:function(err){
            //alert('err:'+JSON.stringify(err));
            console.log('err:'+JSON.stringify(err))
        }
    });

    // view mode
    if(getQueryVariable('mode') == "view"){
        changeMode()
    }else{
        //edit support double click

        tippy('#view', {
            arrow: true,
            arrowType: 'round', // or 'sharp' (default)
            animation: 'fade',
            placement: 'top', // or 'left', 'right', ...
            content: 'try double click'
          })
        
          $("#view").bind("dblclick", changeMode)
    }

}); 




//tip

tippy('#txtMain', {
    arrow: true,
    arrowType: 'round', // or 'sharp' (default)
    animation: 'fade',
    placement: 'bottom', // or 'left', 'right', ...
    trigger: 'click', // or 'focus'
    content: 'here support markdown, try it'
  })


