const url = 'https://ancient-basin-21118.herokuapp.com'
function start() {
    renderHtml();
    saveAndEditStudent();
}

//Need a function to handle pagination
function renderHtml() {
    let no = 1;
    fetch(`${url}/students?pageNo=0&pageSize=100`)
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                var name = json[i].name
                document.querySelector("#student").innerHTML +=
                    `<tr>
                        <td>${no}</td>
                       <td>${name}</td> 
                       <td><a id="delete" class= ${json[i].id}>X</a></td>
                        ` + "   " + `
                       <td><a id = "edit" class=${json[i].id}>Edit</a></td>
                     </tr>`;
                //Handle delete action
                document.querySelectorAll("#delete").forEach((x) => {
                    x.addEventListener('click', function () {
                        deleteFunction(this.className);
                    })
                })

                //Handle Edit Action
                document.querySelectorAll("#edit").forEach((x) => {
                    x.addEventListener('click', function () {
                        document.querySelector("#id").value = this.className;
                    })
                })
                no++;
            }
        })
}

function rerender() {
    document.querySelector("#student").innerHTML = "";
    document.querySelector("#id").value = "";
    document.querySelector("#name").value = "";
    setTimeout(() => {
        renderHtml();
    }, 300);
}

function deleteFunction(id) {
    var durl = `${url}/students/${id}`
    fetch(durl, {
        method: "delete"
    }).then().catch()
    rerender();
}

function saveAndEditStudent() {
    document.querySelector("#btnSave").onclick = function () {
        let name = document.querySelector('#name').value
        let id = document.querySelector("#id").value
        console.log({id: id, name: name})
        if (name !== "") {
            postdata(id, name);
            rerender();
        }
    }
}

//Need a function to handle post data
function postdata(id, name) {
    fetch(`${url}/students`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, name: name})
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        });
}

start();