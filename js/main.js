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



    $("#add").click(function () {

        $.post("https://jsonplaceholder.typicode.com/users", { name: $("#name").val(), username: $("#userName").val(), email: $("#email").val() }, function (data) {

            console.log(data);
            users.push(data);

            renderizar(users);

        });

    });

});


function renderizar(data) {


    let html = `<table class="table table-bordered">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>UserName</td>
                        <td>Email</td>
                        <td>Opciones</td>
                    </tr>
                </thead>`;

    $.each(data, function (key, value) {
        html +=
            `<tr>
                <td>${value.name}</td>
                <td>${value.username}</td>
                <td>${value.email}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#exampleModal2" onclick="editar(${value.id})">Editar</button>
                    <button class="btn btn-danger delete" id="delete" onclick="eliminar(${value.id})">Eliminar</button>
                </td>
            </tr>`;
    });
    html += `</table>`;
    $("#render").html(html);

}

function editar(id) {

    let index;

    for (let value of users) {
        if (value.id == id) {
            index = users.indexOf(value);
            $("#name2").val(value.name);
            $("#userName2").val(value.username);
            $("#email2").val(value.email);




        }

    }
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
