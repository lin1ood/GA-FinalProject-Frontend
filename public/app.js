const app = angular.module('service_app', []);
app.controller('mainController', ['$http', function($http, $window) {

    this.message= "Hello from ANGULAR!"
    this.providers = [];
    this.user_data;
    this.editProvider = true;
    this.comments;

    // this.URL = 'http://localhost:3000' || process.env.HEROKU_LINK;
    this.URL = 'https://frozen-badlands-77854.herokuapp.com/';
    this.formData = {};
    const controller = this;
    const edit_form = false;
    this.services = ["Electrician","Plumber","Roofer","Child Care","Babby Sitter","HVAC","Carpenter","Building Contractor", "Handy Man"]

    // localStorage.clear('token');

    //Comment.where(:provider_id => 5)

      this.showComments = function(service_id) {
        console.log('comments.length : ', comments.length);
        console.log('showComments service_id : ', service_id);
        // for ( let i = 0; i < comments.length; i++) {
        //   console.log('ul-i : ', "ul-"+i);
        //   console.log(document.getElementById("#ul-"+i))
        //   // document.getElementById("ul-"+i).style.display = "none";
        // }

        $http({
          method: 'POST',
          url: this.URL + '/comments/providerId',
          data: {
            id: service_id
          },
        }).then(function(result) {
            this.comments = result.data;
        }.bind(this), function(error) {
            console.log(error);
        });
      }

      //GET index
      this.commentIndex = function() {
        $http({
          method: 'GET',
          url: this.URL + '/comments'
        }).then(function(result) {
            console.log('list of comments : ', result.data);
            this.comments = result.data;
        }.bind(this), function(error) {
            console.log(error);
        });
      }



    // POST   /comments
    this.comment = function(service, userComment){
      console.log('service.id = ', service.id);
      console.log('comment = ', this.userComment);

      // if empty or blank comment
      // don't store it
      if (this.userComment != undefined && this.userComment != "") {
        console.log('in the if');
        $http({
          method: 'POST',
          url: this.URL + '/comments',
          data: {
            provider_id: service.id,
            review: this.userComment,
            rank: 5
          },
        }).then(function(result) {
            console.log('comment result : ', result);
            this.userComment = "";
        }, function(error) {
            console.log(error);
        });
      }
    }

    // Render Provider records by user_id that is logged in
    // This will allow only the users that created the Provider
    // records to update or delete them.
    this.servicesByOwner = function(user_id) {
      console.log('--- services ByOwner --- userid = ', user_id)
      this.providers.empty;
      $http({
        method: 'POST',
        url: this.URL + '/providers/userId',
        data: {
          id: user_id
        },
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
      }).then(function(result) {
          console.log('providers from : ', result);
          this.providers = result.data;
          this.editProvider = false;
      }.bind(this), function(error) {
          console.log(error);
      });
    }


    this.servicesIndex = function() {
      // console.log('--- ownerServices --- userid = ', this.user_data.user.id)
      $http({
        method: 'GET',
        url: this.URL + '/providers'
      }).then(function(result) {
          this.providers = result.data;
          this.editProvider = false;
      }.bind(this), function(error) {
          console.log(error);
      });
    }

    this.delService = function(service) {
      console.log('service_id', service.id);
      $http({
        method: 'DELETE',
        url: this.URL + '/providers/' + service.id,
        data: {
          id: this.user_data.user.id,
          item: service.id
        },
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(
        function(response){
          console.log('delete response ', response);
          // controller.getBlogs();
          this.servicesByOwner(this.user_data.user.id);
        }.bind(this),
        function (error){
          console.log(error);
        }
      );
    }

    this.providerEdit = function (service) {
      console.log('Edit Service called!')
      console.log('service.id ', service.id)
      $http({
        method: 'PUT',
        url: this.URL + '/providers/' + service.id,
        data: service,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response){
          console.log(response.data)
          // this.blogs = response.data;
          this.servicesByOwner(this.user_data.user.id);
        }, function(error) {
            console.log(error);
        });

      // hide the form
      controller.edit_form = false;
    };


    // Login User to get JWT Token for
    // post - update - delete
    this.login = function(userLogin) {
      console.log('The userLogin.username & userLogin.password ' + userLogin.username + ' : ' + userLogin.password)
      this.userLogin = userLogin;
      $http({
          method: 'POST',
          url: this.URL + '/users/login',
          data: { username: userLogin.username, password: userLogin.password },
        }).then(function(response) {
          console.log(response);
          this.user_data = response.data;
          localStorage.setItem('token', JSON.stringify(response.data.token));
          this.servicesByOwner(response.data.user.id)
        }.bind(this), function(error) {
        console.log(error);
        });
    }

    //Logout current user and delete JWT Token
    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    }

    this.providerReg = function(providerData) {
      console.log('ProviderReg called with : ', providerData);
      console.log('user_data = ', this.user_data.user.id);
      $http({
          method: 'POST',
          url: this.URL + '/providers',
          data: {
            name: providerData.name,
            category: providerData.category,
            cell_phone: providerData.cell_phone,
            company: providerData.company,
            address: providerData.address,
            url: providerData.url,
            user_id: this.user_data.user.id,
            vetted: false,
            available: false
          },
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
        }).then(function(response) {
          console.log(response);
        }.bind(this));
    }

    this.register = function(userRegister) {
      console.log('The userRegister.username & userRegister.password & userRegister.email ' + userRegister.username + ' : ' + userRegister.password + ' : ' + userRegister.email)
      this.userRegister = userRegister;
      $http({
          method: 'POST',
          url: this.URL + '/users',
          data: {
            username: userRegister.username,
            password: userRegister.password,
            email: userRegister.email
          },
        }).then(function(response) {
          console.log(response);
          // console.log('response.data.id = ', response.data.id);
          // this.user_data = response.data;
          // console.log('user_ = ', this.user_data.id);
          // localStorage.setItem('token', JSON.stringify(response.data.token));
          this.login(userRegister);
        }.bind(this));
        var form = document.getElementById("registration");
        form.reset();
    }

    // this.providerReg = function(providerData){
    //   console.log('This is the providerData: ', providerData);
    // }

//     //read all the Blogs -- /blogs GET index
//     //anyone can do this!!!
//     this.getBlogs = function (){
//       $http({
//         method: 'GET',
//         url: this.URL + '/blogs'
//         // url: this.herokuURL
//       }).then(function(result) {
//           console.log('blogs from api: ', result);
//           this.blogs = result.data;
//           // this.logout();
//       }.bind(this), function(error) {
//           console.log(error);
//       });
//     }
//
//
//
//     // List the users as an Index
//     // only logged in users see the users index
//     // this.users = function() {
//     //   console.log('/USERS called')
//     //   $http({
//     //     method: 'GET',
//     //     url: this.URL + '/users',
//     //     headers: {
//     //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//     //     }
//     //   }).then(function(response) {
//     //       console.log('users from api: ', response);
//     //       if (response.data.status == 401) {
//     //         this.error = "Unauthorized";
//     //       } else {
//     //         this.users = response.data.user;
//     //       }
//     //   }.bind(this), function(error) {
//     //       console.log('GET /users ERROR ' + error);
//     //   }.bind(this));
//     // }
//
//
//     this.processForm = () => {
//       console.log('process form is running');
//       console.log('here is the form data: ', this.formData);
//       $http({
//         method: 'POST',
//         url: this.URL + '/blogs',
//         data: this.formData,
//         headers: {
//           Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//         }
//       }).then(function(response){
//         console.log(response);
//         this.blogs.unshift(response.data);
//       }.bind(this), function(error) {
//         console.log(error);
//     });
//
//     }
//
//     this.deleteBlog = function(blog){
//       console.log('this is my blog id', blog.id);
//       $http({
//         method: 'DELETE',
//         url: this.URL + '/blogs/' + blog.id,
//         headers: {
//           Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//         }
//       }).then(
//         function(response){
//           controller.getBlogs();
//         },
//         function (){
//         }
//
//       );
//       // this.controller.getBlogs();
//     }
//
//     this.showBlogger = function (user_id) {
//         console.log("showBlogger clicked for user ", user_id);
//         $http({
//           method: 'GET',
//           url: this.URL + '/blogs/' + user_id,
//           headers: {
//             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//           }
//         }).then(function(response){
//             console.log(response.data)
//             this.blogs = response.data;
//           }.bind(this), function(error) {
//               console.log(error);
//           });
//     };
//
//     this.editBlog = function (blog) {
//       console.log('Edit Blog called!')
//       console.log('blog.id ', blog.id)
//       // console.log('blog.author ', blog.author)
//       // console.log('blog.subject ', blog.subject)
//       // console.log('blog.content ', blog.content)
//       // console.log('blog.user_id ', blog.user_id)
//       //
//       // console.log('this.editForm.author ', this.editForm.author)
//       // console.log('this.editForm.subject ', this.editForm.subject)
//       // console.log('this.editForm.author ', this.editForm.content)
//
//       $http({
//         method: 'PUT',
//         url: this.URL + '/blogs/' + blog.id,
//         data: this.editForm,
//         headers: {
//           Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
//         }
//       }).then(function(response){
//           console.log(response.data)
//           // this.blogs = response.data;
//           controller.getBlogs();
//         }, function(error) {
//             console.log(error);
//         });
//
//       // hide the form
//       controller.edit_form = false;
//     };
//
//
//     // show the index of all the blogs on the initial page
    this.servicesIndex();
    this.commentIndex();
  }]);
