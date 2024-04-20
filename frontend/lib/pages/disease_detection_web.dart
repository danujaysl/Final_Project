import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;


class ImageUpload extends StatefulWidget {

  const ImageUpload({Key? key}) : super(key: key);

  @override
  _ImageUploadState createState() => _ImageUploadState();
}

class _ImageUploadState extends State<ImageUpload> {
  XFile? _pickedImage;


  Future<void> uploadImage(XFile image, String url) async {
    if (Platform.isIOS || Platform.isAndroid) {
      // Use DioImageUploadService (assuming you have a mobile implementation)

    } else {
      // Use http package for web
      final request = http.MultipartRequest('POST', Uri.parse(url));
      request.files.add(await http.MultipartFile.fromPath('image', image.path));
      // ... rest of the upload logic using http
    }
  }

  Future<void> pickAndUploadImage() async {
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() => _pickedImage = image);
      await uploadImage(image, 'your_backend_url/upload');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Image Upload'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: pickAndUploadImage,
              child: Text('Pick and Upload Image'),
            ),
          ],
        ),
      ),
    );
  }
}
