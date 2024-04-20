import 'package:flutter/material.dart';

class NotificationCenter{

  static void DisplayMessage({context,String Message="Included No message",bool success=false}){

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        width: 200,
        duration: Duration(seconds: 1),
        backgroundColor: !success?Colors.red:Colors.green,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        behavior: SnackBarBehavior.floating,
        content: Center( child:Text(Message,textAlign: TextAlign.center,)),
      ),
    );

  }


}