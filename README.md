# Methodology & technology used:  
1. Methodology:  
      Agile method of software development.  
3. Tools:  
      VS code, Node JS runtime environment, Postman, mongoDB atlas, Github and Gitbash.  
4. Technologies:  
      ReactJS, ExpressJS, mongoose ORM, NodeJS.  
5. Frontend libraries:  
      React, React-scripts, react-dom, react-router-dom, bootstrap, axios, react-toastify.  
6. Server side libraries:  
      express, cors, nodemon, mongoose, bcryptjs, jsonwebtokens, multer, uuid, path  


# Important points:
1. This website has three dashboards.  
	1.1. Public  
	1.2. NGO  
	1.3. Admin  

2. It has two Registration and Login interface. Via first Interface, Public and NGO entity can register on the website. By second interface, Admin entity can register and manage both NGO and public entity.  
4. Routes and dashboards for each entities are made private with the help of localStorage.  
5. When public user login to the website, they can register for a particular training which is further handled by admin of the website.  
6. When NGO login, they can register their NGO to the website which is further handled by admins.  
7. After, Registration for training / registration for NGO, users can see a pending status in front of their registration form which is dynamically updated after admin accept/rejects the form.  
8. Form validation is applied to all the forms on both client and server side.
Image upload feature is implemented via which user can upload image through his local computer.  





# future scope: 
1. I have not made server side routes private. Although, data is properly validated on server side.
2. There is no direct relation between USERS and NGOs. This is something that can be implemented.



# Project Walk through:

1. We have 3 Dashboards:  
   Public,
   NGO,
   Admin.  
   (a). Respective routes are kept private until user is loggedIn.    
   (b). Each Dashboard and its details persists on page reload.  
   (c). One-to-many relation is established between user and training program form and NGO and its NGO registration form as well.  
   (d). One-to-one relation between admin-user.
   (e). User/admin/NGOs login as well as their dashboard persists.
   (f). tried to maintain ACID properties with the help of transactions while writing database queries.


   
   1.1 User Dashboard:
   ![Screenshot (151)](https://github.com/rohan8789/capstone/assets/74501400/fc4c6e8f-e2b8-41d1-a084-cccd85ebb6a6)


  
   1.2. NGO Dashboard:
   ![Screenshot (153)](https://github.com/rohan8789/capstone/assets/74501400/b1f4d1d7-1e19-45b6-9892-da3dc652257f)


  
   1.3. Admin Dashboard:
   ![Screenshot (152)](https://github.com/rohan8789/capstone/assets/74501400/8a85b7bd-7632-41fb-8dad-157ad5f95a1c)

   



3. User Login and Signup page with Validation:  
   2.1. Proper custom validation to restrict invalid input.
   2.2. Women/Girls less than 16 cannot register.  
   2.3. Data is sent to backend and further saved to database.  
   2.4. Used transactions to maintain consistency and atomicity of data in case when multipe query statements are involved.
   ![Screenshot (154)](https://github.com/rohan8789/capstone/assets/74501400/744c38ce-f837-4bf9-9bde-da0be6b8aae5)
   




4. lets first see user functionalities.  
   3.1. Once user is loggedIn. he can explore user related private routes but cannot see admin routes. He can explore training and internship programs provided by NGOs and government. They are redirected to a Trainee/Internship registration form when they explore.  
   3.2. Again proper custom validation is applied.  
   3.3. Here user can upload their documents in image(jpg/jpeg/png) format. maximum size of 500kb is allowed.  
   3.4. After registration. the form details is sent to admin and user is redirected to "STATUS" page to see the status of their application.  
   3.5. The status remains pending until admin accepts the user form. Once, accepted it is dynamically updated.    
   (a). After user login    
   ![Screenshot (155)](https://github.com/rohan8789/capstone/assets/74501400/1c4076f6-777a-4101-b742-ebf8012633e8)
   (b). Registration form.    
   ![Screenshot (156)](https://github.com/rohan8789/capstone/assets/74501400/c6d050de-c5b5-44cf-82e5-86e1a79e3084)
   (c). After registration, redirected to status page. Here, details are present. Here status is pending which will remain pending until admin acccpts the request.  
   ![Screenshot (158)](https://github.com/rohan8789/capstone/assets/74501400/6406c406-42c6-4679-917e-6098e48da6b4)
   (d). On clicking on view, you can see form details. You will not see image because to upload image on render, it is required to give credit card details and payment to upload documents or image. Although, it works on localhost.
   
![Screenshot (159)](https://github.com/rohan8789/capstone/assets/74501400/274b6d7f-c3f5-4d52-a1e3-0691565352e1)

![Screenshot (160)](https://github.com/rohan8789/capstone/assets/74501400/cbe25ced-ab1b-405e-8a59-43f11a971846)  









4. Lets see NGO functionalities:  
   4.1. Any NGO can register themselves on the website via unique NGO registration number.  
   4.2. Again proper validation is done.  
   4.3. NGO details, After registration is sent to admin.  
   4.4. If rejected by admin, details is no longer in database.  
   4.5. If accepted, they are listed in NGO list.  
    

(a). Validation:  
![Screenshot (161)](https://github.com/rohan8789/capstone/assets/74501400/c947121b-a1fb-469c-9bc9-c09c90b25374)
(b). After registration, redirected to status page.  
![Screenshot (163)](https://github.com/rohan8789/capstone/assets/74501400/8881969d-a467-406f-8d67-ab85b36cc793)
(c). view
![Screenshot (164)](https://github.com/rohan8789/capstone/assets/74501400/92c18846-77f9-43e0-b242-fb01d184c4d9)





5. Admin Dashboard and functionalities:  
   5.1. access to accept or reject NGO form request.  
   5.2. access to accept or reject user request for registration.  
(a). Registered NGOs
![Screenshot (165)](https://github.com/rohan8789/capstone/assets/74501400/857d2272-4465-4d10-8ddf-d45abcedd0ea)
(b). Registered Users and accepting their request.
![Screenshot (166)](https://github.com/rohan8789/capstone/assets/74501400/6aaceac9-9628-4d5b-a3d8-d9ad28572975)

(c). After rejecting/accepting users:  
![Screenshot (167)](https://github.com/rohan8789/capstone/assets/74501400/c1fd4993-8081-4cf1-af50-09ab5900eeb2)
