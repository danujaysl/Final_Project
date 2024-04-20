import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:plant_disease_frontend/components/custom_button.dart';
import 'package:plant_disease_frontend/controllers/notification.dart';
import '../components/colors.dart';
import '../controllers/user_controller.dart';
import 'login_page.dart';


class SignupPageWidget extends StatefulWidget {
  const SignupPageWidget({super.key});

  @override
  State<SignupPageWidget> createState() => _SignupPageWidgetState();
}

class _SignupPageWidgetState extends State<SignupPageWidget> {


  final scaffoldKey = GlobalKey<ScaffoldState>();

  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final emailController = TextEditingController();
  final usernameFocusNode  = FocusNode();
  final passwordFocusNode  = FocusNode();
  final emailFocusNode  = FocusNode();
  final unfocusNode = FocusNode();

  bool passwordVisibility = false;
  BuildContext? _context;

  Future<bool> SignupUser(String username,String password,String email) async {


    try{
      Map<String,dynamic> result = await UserController().RegisterUser(username, password,email);


      if(result['message']=="user exists"){
        NotificationCenter.DisplayMessage(Message: "User Exists",context:_context );
        return false;
      }
      else if(result['message']=="success"){

        NotificationCenter.DisplayMessage(Message: "User Registered Successfully ",context:_context,success: true );
        return true;
      }
      else{
        NotificationCenter.DisplayMessage(Message: "Registration Failed",context:_context );
        return false;
      }
    }
    catch(e){
      NotificationCenter.DisplayMessage(Message: "Connection Failed",context:_context );
      print(e);
      return false;
    }

  }



  @override
  void initState() {
    super.initState();

  }

  @override
  void dispose() {

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    if(_context==null){
      _context = context;
    }

    return GestureDetector(
      onTap: () => unfocusNode.canRequestFocus
          ? FocusScope.of(context).requestFocus(unfocusNode)
          : FocusScope.of(context).unfocus(),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: ColorSchema.darkGreen ,
        body: Container(
          height: double.infinity,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                ColorSchema.darkGreen,
                ColorSchema.midGreen
              ],
              stops: [0, 1],
              begin: AlignmentDirectional(0.90, -1),
              end: AlignmentDirectional(-0.90, 1),
            ),
          ),
          alignment: AlignmentDirectional(0, -1),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(0, 60, 0, 32),
                  child: Container(
                    width: 150,
                    height: 150,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    alignment: AlignmentDirectional(0, 0),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.network(
                        'https://picsum.photos/seed/979/600',
                        width: 300,
                        height: 200,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                Padding(
                    padding: EdgeInsets.all(16),
                    child: Container(
                      width: double.infinity,
                      constraints: BoxConstraints(
                        maxWidth: 570,
                      ),
                      decoration: BoxDecoration(
                        color: ColorSchema.white,
                        boxShadow: [
                          BoxShadow(
                            blurRadius: 4,
                            color: Color(0x33000000),
                            offset: Offset(
                              0,
                              2,
                            ),
                          )
                        ],
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Align(
                        alignment: AlignmentDirectional(0, 0),
                        child: Padding(
                          padding: EdgeInsets.all(32),
                          child: Column(
                            mainAxisSize: MainAxisSize.max,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(
                                'Lets Get Started!',
                                textAlign: TextAlign.center,
                                style: GoogleFonts.poppins(
                                  color: Colors.grey,
                                  fontSize: 40,
                                  fontWeight: FontWeight.w600,
                                ),

                              ),
                              Padding(
                                padding:
                                EdgeInsetsDirectional.fromSTEB(0, 12, 0, 24),
                                child: Text(
                                  'Fill out the information below in order to sign up.',
                                  textAlign: TextAlign.center,
                                  style:GoogleFonts.poppins(
                                    color: Colors.grey,
                                    fontSize: 14,
                                    fontWeight: FontWeight.normal,
                                  ),

                                ),
                              ),

                              // text fields
                              Padding(
                                padding:
                                EdgeInsetsDirectional.fromSTEB(0, 0, 0, 16),
                                child: Container(
                                  width: double.infinity,
                                  child: TextFormField(
                                    controller: usernameController,
                                    focusNode: usernameFocusNode,
                                    autofocus: true,
                                    cursorColor: Colors.black,
                                    obscureText: false,
                                    decoration: InputDecoration(
                                      labelText: 'UserName',
                                      labelStyle: GoogleFonts.poppins(
                                        color: Colors.grey,
                                        fontSize: 14,
                                        fontWeight: FontWeight.normal,
                                      ),

                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color:ColorSchema.lightBrown,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: Colors.grey,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      errorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.red,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedErrorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.white,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      filled: true,
                                      fillColor: ColorSchema.lightBrown,
                                    ),

                                    minLines: null,
                                    keyboardType: TextInputType.emailAddress,

                                  ),
                                ),
                              ),
                              Padding(
                                padding:
                                EdgeInsetsDirectional.fromSTEB(0, 0, 0, 16),
                                child: Container(
                                  width: double.infinity,
                                  child: TextFormField(
                                    controller: passwordController,
                                    focusNode: passwordFocusNode,
                                    cursorColor: Colors.black,
                                    autofocus: true,
                                    autofillHints: [AutofillHints.password],
                                    obscureText: !passwordVisibility,
                                    decoration: InputDecoration(
                                      labelText: 'Password',
                                      labelStyle: GoogleFonts.poppins(
                                        color: Colors.grey,
                                        fontSize: 14,
                                        fontWeight: FontWeight.normal,
                                      ),

                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color:ColorSchema.lightBrown,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color:Colors.grey,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      errorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.white,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedErrorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.white,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      filled: true,
                                      fillColor:ColorSchema.lightBrown,
                                      suffixIcon: InkWell(
                                        onTap: () => setState(
                                              () => passwordVisibility =
                                          !passwordVisibility,
                                        ),
                                        focusNode: FocusNode(skipTraversal: true),
                                        child: Icon(
                                          passwordVisibility
                                              ? Icons.visibility_outlined
                                              : Icons.visibility_off_outlined,
                                          color:Colors.grey,
                                          size: 24,
                                        ),
                                      ),
                                    ),

                                    minLines: null,

                                  ),
                                ),
                              ),
                              Padding(
                                padding:
                                EdgeInsetsDirectional.fromSTEB(0, 0, 0, 16),
                                child: Container(
                                  width: double.infinity,
                                  child: TextFormField(
                                    controller: emailController,
                                    focusNode: emailFocusNode,
                                    autofocus: true,
                                    cursorColor: Colors.black,
                                    autofillHints: [AutofillHints.email],
                                    obscureText: false,
                                    decoration: InputDecoration(
                                      labelText: 'Email',
                                      labelStyle: GoogleFonts.poppins(
                                        color: Colors.grey,
                                        fontSize: 14,
                                        fontWeight: FontWeight.normal,
                                      ),

                                      enabledBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color:ColorSchema.lightBrown,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: Colors.grey,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      errorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.red,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      focusedErrorBorder: OutlineInputBorder(
                                        borderSide: BorderSide(
                                          color: ColorSchema.white,
                                          width: 2,
                                        ),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      filled: true,
                                      fillColor: ColorSchema.lightBrown,
                                    ),

                                    minLines: null,
                                    keyboardType: TextInputType.emailAddress,

                                  ),
                                ),
                              ),
                              Padding(

                                  padding:EdgeInsetsDirectional.fromSTEB(0, 0, 0, 16),
                                  child:CustomButton2(onPressed: () async{

                                    await SignupUser(usernameController.text,passwordController.text,emailController.text);

                                  },buttonText:"Sign Up",)

                              ),

                              // You will have to add an action on this rich text to go to your login page.
                              Padding(
                                padding:
                                EdgeInsetsDirectional.fromSTEB(0, 12, 0, 12),
                                child: RichText(
                                  text: TextSpan(
                                    children: [
                                      TextSpan(
                                        text: 'Or Already have an account?  ',
                                        style: GoogleFonts.poppins(
                                          color: Colors.grey,
                                          fontSize: 13,
                                          fontWeight: FontWeight.normal,
                                        ),
                                      ),
                                      TextSpan(
                                        text: 'Login here',
                                        style: GoogleFonts.poppins(
                                          color: ColorSchema.darkGreen,
                                          fontSize: 13,
                                          fontWeight: FontWeight.normal,
                                        ),
                                        onEnter: (e){
                                          Navigator.push(context,   MaterialPageRoute(
                                            builder: (context) =>
                                                LoginPageWidget(),
                                          ));
                                        }
                                      )
                                    ],

                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    )
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
