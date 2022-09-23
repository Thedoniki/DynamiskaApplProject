var vm = new Vue({
    el: '#xxx',
    data: {
        userQuestion:{},
        currentLoggedInUser: {},
        users:[],
        messageToUser: ""
        

    },
    methods:{
        resetMessage(){
            this.messageToUser = "";
        },
        logOut(){
            this.currentLoggedInUser = [];
            this.messageToUser="";
            currentLoggedInUser = false;
            window.location.href='/api/logout/';
    
        },
        loginUser(){
            const user = {
                username: $("#loginUsername").val(),
                password: $("#loginPassword").val(),
            };
            $.ajax({

            url: '/api/login/',
            type: 'POST',
            data: user,
            success: (data) => {
                currentLoggedInUser = true;

                $.getJSON("/api/user/" + data.username, function(data){
                    JSON.parse(JSON.stringify(data));
                    self.currentLoggedInUser = data;
                })
                window.location.href='/api/home/';
                
            }
            });
        } 
    },
    computed: {

        isConsumerOrSuperAdmin(){
            if(this.currentLoggedInUser.role == "Super Admin" || this.currentLoggedInUser.role == "Consumer"){
                return true;
            }else {
                return false
            };
        },
        isContributorOrSuperAdmin(){
            if (this.currentLoggedInUser.role == "contributor"||this.currentLoggedInUser.role == "Super Admin"){
                return true
            }else {
                false
            };
        },
        userIsLoggedIn(){
            if(this.currentLoggedInUser == null){
                
                return false;
            }else{
                return true;
            };
        },
                       

              
              updateqQuestion() {
                  var question = {
                      qID: $('#updateModal #updateId').val(),
                      qTitle: $('#updateModal #updateTitle').val(),
                      qText: $('#updateModal #updateText').val(),
                      qCategory: $('#updateModal #updateCategory').val(),
                      qUsername: $('#updateModal #updateUsername').val()
                  }
                  $.ajax({
                      url: '/question/' + question.id,
                      type: 'PUT',
                      data: product,
                      success: () => {
                          var self = this;
                          $.getJSON("/questions/", function (jsondata) {
                              self.products = jsondata;
                          });
                      }
                  });
                  $('#updateModal').modal('hide');
              },
          },

          mounted() {
              var self = this;
              $.getJSON("/questions/", function (jsondata) {
                  console.log(JSON.stringify(jsondata));
                  self.questions = jsondata;
              });
          }
      });
      


  






// //checka om de funkar att ha root som new vue namn med då id har det när andra funktioner är med annars ändra namnet
// //här.
// var vm = new Vue({
//     el: '#app',
//     data: {
//         userQuestion:{},
//         currentLoggedInUser: {},
//         users:[],
//         messageToUser: ""
        

//     },
//     methods: {
//         resetMessage(){
//             this.messageToUser = "";
//         },
//         loginUser: function() {

//         const user = {
//             username: $("#loginUsername").val(),
//             password: $("#loginPassword").val(),
//         };

//         $.ajax({
//             url: '/api/login/',
//             type: 'POST',
//             data: user,
//             success: (data) => {
//                 if (data) {

//                     currentLoggedInUser = true;

//                     $.getJSON('/api/user/' + data.username , function (data) {
//                         self.currentLoggedInUser = data;
//                         window.location.href='/api/home/'

//                         // if (self.currentLoggedInUser.role == 'Super Admin' || self.currentLoggedInUser.role == 'Consumer') {
//                         //     $.getJSON('/api/questions/user/', function (data) {
//                         //         console.log('coming soon');
//                         //         self.userQuestion = data;
//                         //     });
//                         // };
//                         // if(self.currentLoggedInUser.role == "Contributor" || self.currentLoggedInUser.role == "Super Admin"){
//                         //     $.getJSON('/api/answers/contributor', function(data){
//                         //         self.contributorAnswers = data;
//                         //     });
//                         // };
//                     });
//                 }else{
//                     alert('Could not login')
//                 }
//             }
//         });
//     },
//     logOut(){
//         this.currentLoggedInUser = [];
//         this.messageToUser="";
//         currentLoggedInUser = false;
//         window.location.href='/api/logout/'

//     }, 
//     computed: {

//         isConsumerOrSuperAdmin(){
//             if(this.currentLoggedInUser.role == "Super Admin" || this.currentLoggedInUser.role == "Consumer"){
//                 return true;
//             }else {
//                 return false
//             };
//         },
//         isContributorOrSuperAdmin(){
//             if (this.currentLoggedInUser.role == "contributor"||this.currentLoggedInUser.role == "Super Admin"){
//                 return true
//             }else {
//                 false
//             };
//         },
//         userIsLoggedIn(){
//             if(this.currentLoggedInUser.username == null){
//                 return false;
//             }else{
//                 return true
//             };
//         }


//     },
//     mounted() {
//         var self = this;

//         $.getJSON('/api/users/', function (data) {
            
//             JSON.parse(JSON.stringify(data));
//             self.users = data;
//         });

//         $.getJSON('/api/user/' + self.currentLoggedInUser , function (data) {
//             JSON.parse(JSON.stringify(data));
//             console.log(data);
//             self.currentLoggedInUser = data;

//             //  if (self.currentLoggedInUser.role == 'Super Admin' || self.currentLoggedInUser.role == 'Consumer') {
//             //      $.getJSON('/api/questions/user/', function (data) {
//             //          console.log('coming soon');
//             //          self.userQuestion = data;
//             //      });
//             //  };
//             //  if(self.currentLoggedInUser.role == "Contributor" || self.currentLoggedInUser.role == "Super Admin"){
//             //      $.getJSON('/api/answers/contributor', function(data){
//             //          self.contributorAnswers = data;
//             //      });
//             //  };

//         });
//     }
//     }
// });


          
    

      
     
