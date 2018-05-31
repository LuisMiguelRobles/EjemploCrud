let users = [];
$(function () {


    /**
     * Peticion Get al Servidor
     */
    $.ajax({

        "url": "https://jsonplaceholder.typicode.com/users",
        "type": "GET",
        "data": {},
        "dataType": "JSON"


    }).done(function (data) {
        users = data;
        if (data) {
            renderizar(data);
        }
    });

});



function agregar(){
    let data ={};
    data={name: "",username:""}
    $.post("https://jsonplaceholder.typicode.com/users", data, function(data){

        users.slice(0,0,data);

    } );
}


function renderizar(data) {


    let html = `<table class="table table-bordered">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>UserName</td>
                        <td>Email</td>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.name}</td>
                <td>${value.username}</td>
                <td>${value.email}</td>
                <td>
                    <button class="btn btn-info">Editar</button>
                    <button class="btn btn-danger delete" id="delete" onclick="eliminar(${value.id})">Eliminar</button>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#render").html(html);

}


function eliminar(id) {
    let index;

    for (let value of users) {
        if (value.id == id) {
            index = users.indexOf(value);
            users.splice(index, 1);
            console.log(users);

            renderizar(users);


        }

    }
}
