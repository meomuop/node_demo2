function remove_confirm(controller,id){
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height: "auto",
        width: 350,
        modal: true,
        buttons: {
        "Xóa": function() {
            window.location.href = controller+"/delete/"+id;
        },
        "Hủy": function() {
            $( this ).dialog( "close" );
        }
        }
    });
}

function delete_confirmation(url) {
    if(window.confirm('Bạn có chắc muốn xóa?')) window.location.assign(url);
}

function redirect(url) {
    window.location.assign(url);
}

function set_display(id, status){
    document.getElementById(id).style.display = status;
}