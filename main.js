"use strict"

function getData(method, url) {
    return new Promise((resolve, reject)=>{
        var xhr= new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload=function(){
            if (this.status>=200 && this.status<300){
                resolve(xhr.response);
            }else{
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
        };

        xhr.onerror=()=>{
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });

}

getData('GET','http://jsonplaceholder.typicode.com/todos').then((data)=>{
    let todos=JSON.parse(data);
    let output='';
    for(let todo of todos){
        output +=`
            <li><h3>${todo.title}</h3></li>
            <p>Completed: ${todo.completed}</p>
        `;
    }

    document.getElementById('template').innerHTML=output;
}).catch((err)=>{
    console.log(err);
});