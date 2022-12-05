// class Login {
//     constructor(form, fields) {
//         this.form = form;
//         this.fields = fields;
//         this.validateonSubmit();
//     }

//     validateonSubmit() {
//         let self = this; // setup calls to the "this" values of the class described in the constructor
    
//         // add a "submit" event listener to the form
//         this.form.addEventListener("submit", (e) => {
//             // remove default functionality 
//             e.preventDefault();
//             var error = 0;
//             // loop through the fields and check them against a function for validation
//             self.fields.forEach((field) => {
//                 const input = document.querySelector(`#${field}`);
//                 if (self.validateFields(input) == false) {
//                     // if a field does not validate, auto-increment our error integer
//                     error++;
//                 }
//             });
//             // if everything validates, error will be 0 and can continue
//             if (error == 0) {
//                 //do login api here or in this case, just submit the form and set a localStorage item
//                 localStorage.setItem("auth", 1);
//                 this.form.submit();
//             }
//         });
//     }

//     validateFields(field) {
//         // remove any whitespace and check to see if the field is blank, if so return false
//         if (field.value.trim() === "") {
//             // set the status based on the field, the field label, and if it is an error message
//             this.setStatus(
//                 field,
//                 `${field.previousElementSibling.innerText} cannot be blank`,
//                 "error"
//             );
//             return false;
//         } else {
//             // if the field is not blank, check to see if it is password
//             if (field.type == "password") {
//                 // if it is a password, check to see if it meets our minimum character requirement
//                 if (field.value.length < 6) {
//                     // set the status based on the field, the field label, and if it is an error message
//                     this.setStatus(
//                         field,
//                         `${field.previousElementSibling.innerText} must be at least 8 characters`,
//                         "error"
//                     );
//                     return false;
//                 } else {
//                     // set the status based on the field without text and return a success message
//                     this.setStatus(field, null, "success");
//                     return true;
//                 }
//             } else {
//                 // set the status based on the field without text and return a success message
//                 this.setStatus(field, null, "success");
//                 window.location.href = 'http://www.google.com';
//                 return true;
//             }
//         }
//     }

//     setStatus(field, message, status) {
//         // create variable to hold message
//         const errorMessage = field.parentElement.querySelector(".error-message");

//         // if success, remove messages and error classes
//         if (status == "success") {
//             if (errorMessage) {
//                 errorMessage.innerText = "";
//             }
//             field.classList.remove("input-error");
//         }
//         // if error, add messages and add error classes
//         if (status == "error") {
//             errorMessage.innerText = message;
//             field.classList.add("input-error");
//         }
// }
// }

// const form = document.querySelector(".loginForm");
// // if the form exists, run the class
// if (form) {
//     // setup the fields we want to validate, we only have two but you can add others
//     const fields = ["username", "password"];
//     // run the class
//     const validator = new Login(form, fields);
// }

function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};  

    if (strDados) {
        objDados = JSON.parse (strDados);

    }

    else {
        objDados = { Cadastros: [   {Nome: "João", Sobrenome: "da Silva", CPF: "14858996256", Email: "matheueis@yahoo.com.br",Senha: "1234", Telefone: "(32) 991313865", Endereço: "Rua Maria do Carmo", Deficiência: "Tenho 30% da visão", Descrição: "Tenho somente 30% da visão, e por isso tenho bastante dificuldade de conseguir mexer em um site web por enxergar muito pouco."},
                                    {Nome: "Joana", Sobrenome: "Camargo", CPF: "14858974596", Email: "joanacamargo@yahoo.com.br",Senha: "12345", Telefone: "(32) 991374598", Endereço: "Rua Maria do Santos", Deficiência: "Não tenho o olho direito", Descrição: "Tenho somente o olho esquedo, porém isso nao me prejudica muito pois o outro olho enxerga 100%"}]                               
                    }
    }

    return objDados;
}

var attempt = 10; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

let objDados = leDados ();
if ( username == "admin" && password == "admin"){
    alert ("Login successfully");
    window.location.href = '../../modules/crudadmin/index.html';

    return false;
}

for (i=0; i<objDados.Cadastros.length; i++){
    if(username == objDados.Cadastros[i].Email && password == objDados.Cadastros[i].Senha ){
        alert ("Login successfully");
        window.location.href = '../../modules/home-page/index.html';
        return false;
        
    }
    
}

if(username != objDados.Cadastros[i].Email || password != objDados.Cadastros[i].Senha ){
    attempt --;// Decrementing by one.
    alert("You have left "+attempt+" attempt;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
return false;
}
}
}


// var objPeople = [
// 	{ // Object @ 0 index
// 		username: "turtlecode",
// 		password: "codechannel"
// 	},
// 	{ // Object @ 1 index
// 		username: "monkeycode",
// 		password: "codechannel"
// 	}
// ]

// function getInfo() {
// 	var username = document.getElementById('username').value
// 	var password = document.getElementById('password').value

// 	for(var i = 0; i < objPeople.length; i++) {
// 		// check is user input matches username and password of a current index of the objPeople array
// 		if(username == objPeople[i].username && password == objPeople[i].password) {
// 			console.log(username + " is logged in!!!")
// 			// stop the function if this is found to be true
//             window.location.href = 'http://www.google.com';
// 			return
            
// 		}
// 	}
// 	console.log("incorrect username or password")
// }

// async function basiclogin (email, password) {
//     const response = await zlFetch.post(loginEndpoint, {
//       auth: {
//         username: email,
//         password: password
//       },
//       body: { /*...*/ }
//     })
//   }