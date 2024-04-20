import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:plant_disease_frontend/controllers/notification.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';



class DiseaseDetectionScreen extends StatefulWidget {

  //flags
  List<CameraDescription> cameras= [];
  bool isCameraInitialized = false;

  DiseaseDetectionScreen({super.key});

  @override
  State<DiseaseDetectionScreen> createState() => _DiseaseDetectionScreenState();

}

class _DiseaseDetectionScreenState extends State<DiseaseDetectionScreen> {

  // flags
  late CameraController _controller;
  late BuildContext _context;
  File? _imageFile;

  @override
  void initState() {

    super.initState();
    _intiateCamera();

  }

  //initiate the camera of the device
  Future<void> _intiateCamera() async{

    try{
      widget.cameras = await availableCameras();
    }
    catch(e){
      NotificationCenter.DisplayMessage(Message: "No available cameras",context: _context);
    }

    // if found cameras then set the cameras
    if(widget.cameras.length>0){
      _controller = CameraController(widget.cameras[0], ResolutionPreset.medium);
      _controller!.initialize().then((_) {

        if (!mounted) {
          //message which displays the dialog if the camera is not initialized
          NotificationCenter.DisplayMessage(Message: "Camera is not Initialized Correctly Try Again",context: _context);

          return;
        }
        setState(() {

          NotificationCenter.DisplayMessage(Message: "Camera is Initialized",context: _context,success: true);
          widget.isCameraInitialized = true;

        });
      });
    }
    else{
      NotificationCenter.DisplayMessage(Message: "Unable to Initialize the camera",context: _context);
    }

  }


  Future<void> _uploadImage(File imageFile) async {
    // Replace 'YOUR_BACKEND_URL' with your actual backend URL
    final url = Uri.parse('http://127.0.0.1:5000/upload');

    // Create a multipart request
    var request = http.MultipartRequest('POST', url);

    // Add the image file to the request
    request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));

    // Send the request
    var response = await request.send();

    // Check if the request was successful
    if (response.statusCode == 200) {
      print('Image uploaded successfully');
    } else {
      print('Failed to upload image. Status code: ${response.statusCode}');
    }
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        _imageFile = File(pickedFile.path);
      });
    } else {
      print('No image selected.');
    }
  }


  @override
  Widget build(BuildContext context) {
    _context = context;

    return Scaffold(

      appBar: AppBar(
        title: Text('Image Upload'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _imageFile == null
                ? Text('No image selected.')
                : Image.file(
              _imageFile!,
              height: 200,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _pickImage,
              child: Text('Pick Image'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                if (_imageFile != null) {
                  _uploadImage(_imageFile!);
                } else {
                  print('Please select an image first.');
                }
              },
              child: Text('Upload Image'),
            ),
          ],
        ),
      ),
    );

  }

  @override
  void dispose() {

    if(_controller!=null){
      _controller!.dispose();
    }

    super.dispose();

  }

  }




