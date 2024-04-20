import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class UserController{

  UserController(){

  }

//register the user
  Future <Map<String,dynamic>> RegisterUser(String username,String password,String email)async{
    final URL = Uri.parse('http://127.0.0.1:5000/users');
    final headers = {
      'Content-Type':'application/json'
    };

    final data={
      'username':username,
      'password':password,
      'email':email,
    };

    final client = http.Client();

    final response = await client.post(URL,headers: headers,body: jsonEncode(data));


    if(response.statusCode==201){
      return jsonDecode(response.body);
    }
    else{
      print(response);
      return jsonDecode(response.body);
    }

  }

  //loggs in the user
  Future<Map<String,dynamic>> LoginUser(String userName,
      String password
      ) async{

    //setting the url and json body
    final url = Uri.parse('http://127.0.0.1:5000/login');
    final headers = {
      'Content-Type':'application/json',
      'method':'POST'
    };

    final data ={
      'username':userName,
      'password': password,

    };

    final client = http.Client();


    final response = await client.post(
      url,
      headers: headers,
      body: jsonEncode(data),
    );


    //respons handling
    if (response.statusCode == 200) {

      Map<String, dynamic> data = jsonDecode(response.body);

      print(data);

      SharedPreferences prefs = await SharedPreferences.getInstance();


      await prefs.setString('username', data['user']??'');



      return jsonDecode(response.body);

    } else {

      print(response);
      return jsonDecode(response.body);

    }


  }

}