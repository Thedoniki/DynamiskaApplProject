var vm = new Vue({
    el: '#app',
    data: {
        userQuestion: {},
        users: [],
        currentLoggedInUser: {},
        messageToUser: "",
        questions: [],



    },
    methods: {
        resetMessage() {
            this.messageToUser = "";
        },
        logOut() {
            this.currentLoggedInUser = [];
            this.messageToUser = "";
            currentLoggedInUser = false;
            window.location.href = '/api/logout/';

        },
        loginUser() {
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

                    $.getJSON("/api/user/" + data.username, function (data) {
                        JSON.parse(JSON.stringify(data));
                        self.currentLoggedInUser = data;
                    })
                    window.location.href = '/api/home/';

                }
            });
        }
    },
    showQuestionInUpdateForm(id) {
        $.ajax({
            url: 'question/' + id,
            type: 'GET',
            success: (question) => {
                $('#updateID').val(question.qID);
                $('#updateTitle').val(question.qTitle);
                $('#updateText').val(question.Text);
                $('#updateCategory').val(question.qCategory);
                $('#updateUsername').val(question.qUsername);
            }
        });
        $('#updateModal').modal('show');
    },
    //Add Question
    addQuestion() {
        var question = {

            "qTitle": $('#addModal #addTitle').val(),
            "qText": $('#addModal #addText').val(),
            "qCategory": $('#addModal #addCategory').val(),
            "username": $('#addModal #addUsername').val()
        }
        $.ajax({
            url: '/question/:username',
            type: 'POST',
            data: question,
            success: (data) => {
                var self = this;
                $.getJSON("/questions", function (jsondata) {
                    self.questions = jsondata;
                    $('#addModal').modal('hide');
                });
            }
        });


    },
    //Delete questions
    deleteQuestion() {
        var question = {
            id: $('#updateModal #updateId').val()
        }
        $.ajax({
            url: '/question/' + question.id,
            type: 'DELETE',
            success: () => {
                var self = this;
                $.getJSON("/questions/", function (jsondata) {
                    console.log(JSON.stringify(jsondata));
                    self.questions = jsondata;
                });
            }
        });
    },
    updateQuestion() {
        var question = {
            qID: $('#updateModal #updateId').val(),
            qTitle: $('#updateModal #updateTitle').val(),
            qText: $('#updateModal #updateText').val(),
            qCategory: $('#updateModal #updateCategory').val(),
            qUsername: $('#updateModal #updateUsername').val()
        }
        $.ajax({
            url: '/question/' + question.qID,
            type: 'PUT',
            data: question,
            success: () => {
                var self = this;
                $.getJSON("/questions/", function (jsondata) {
                    // console.log(JSON.stringify(jsondata));
                    self.questions = jsondata;
                });
            }
        });
        $('#updateModal').modal('hide');
    },
    computed: {

        isConsumerOrSuperAdmin() {
            if (this.currentLoggedInUser.role == "Super Admin" || this.currentLoggedInUser.role == "Consumer") {
                return true;
            } else {
                return false
            };
        },
        isContributorOrSuperAdmin() {
            if (this.currentLoggedInUser.role == "contributor" || this.currentLoggedInUser.role == "Super Admin") {
                return true
            } else {
                false
            };
        },
        userIsLoggedIn() {
            if (this.currentLoggedInUser == null) {

                return false;
            } else {
                return true;
            };
        }


    },
    mounted() {


        var self = this;


        $.getJSON("/questions/", function (jsondata) {
            JSON.stringify(jsondata);
            self.questions = jsondata;
        });

        $.getJSON('/api/users/', function (data) {

            JSON.parse(JSON.stringify(data));
            self.users = data;
        });


        $.getJSON('/api/user/', function (data) {
            JSON.stringify(data);
            self.currentLoggedInUser = data;

            if (self.currentLoggedInUser.role == 'Super Admin' || self.currentLoggedInUser.role == 'Consumer') {
                $.getJSON('/questions/', function (data) { //fixa tbx till hur det ska va nedan, se kod längst ner
                    console.log('coming soon');
                    self.userQuestion = data;
                });
            };
            // if (self.currentLoggedInUser.role == "Contributor" || self.currentLoggedInUser.role == "Super Admin") {
            //     $.getJSON('/answers/contributor', function (data) {
            //         self.contributorAnswers = data;
            //     });
            // };

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