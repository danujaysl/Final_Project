import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'colors.dart';

class CustomButton extends StatelessWidget {
  final Function()? onPressed;
  final String buttonText;
  Color buttonColor;

  CustomButton(
      {super.key, required this.onPressed, required this.buttonText,this.buttonColor=ColorSchema.darkGreen});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
        child: Container(
          padding: const EdgeInsets.fromLTRB(0, 14, 0, 10),
          height: 55,
          width: 275,
          decoration: BoxDecoration(
            color: ColorSchema.green,
            borderRadius: BorderRadius.circular(30),
          ),
          child: Text(
            buttonText,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}


class CustomButton2 extends StatelessWidget {
  final Function()? onPressed;
  final String buttonText;
  Color buttonColor;

  CustomButton2(
      {super.key, required this.onPressed, required this.buttonText,this.buttonColor=ColorSchema.darkGreen});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
        child: Container(
          padding: const EdgeInsets.fromLTRB(0, 14, 0, 10),
          height: 55,
          width: 275,
          decoration: BoxDecoration(
            color: ColorSchema.darkGreen,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            buttonText,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}
