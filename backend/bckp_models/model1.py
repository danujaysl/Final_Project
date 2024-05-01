import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import cv2
from keras.models import load_model
from keras.utils import load_img, img_to_array
import numpy as np

class_labels = ['Tomato Bacterial Spot', 'Tomato Early Blight', 'Tomato Late Blight', 'Tomato Leaf Mold',
                  'Tomato Septoria Leaf Spot', 'Tomato Spider Mites Two Spotted Spider Mite',
                  'Tomato Target Spot', 'Tomato YellowLeaf Curl Virus', 'Tomato_Mosaic_Virus',
                  'Tomato Healthy']

#loads the model
def LoadModel():
    model = load_model(r'tomato_diseaseORG.h5')
    return model

# predicts the image by its path
def predict_image_by_img_path(img_path, model):

    img = load_img(img_path, target_size=(256, 256))

    # Convert image into array
    img_arr = img_to_array(img)

    # Leaf detection
    leaf_detected = detect_leaf(img_arr)

    if leaf_detected:
        # Normalize pixel values to [0, 1]
        img = img_arr / 255

        # Add batch dimension
        img = np.expand_dims(img, axis=0)

        prediction = model.predict(img)

        pred_index = np.argmax(prediction)
        confidence = prediction[0][pred_index]

        predicted_class = class_labels[pred_index]

        print(f"Predicted class: {predicted_class}")
        print(f"Confidence: {confidence:.2%}")

        return predicted_class, confidence
    else:
        print("No tomato leaf detected. Cannot make prediction.")
        return None, None

# predicts the raw image
def predict_image(img, model):

    # Leaf detection
    leaf_detected = detect_leaf(img)

    if leaf_detected:
        # Normalize pixel values to [0, 1]
        img = img / 255

        # Add batch dimension
        img = np.expand_dims(img, axis=0)

        prediction = model.predict(img)

        pred_index = np.argmax(prediction)
        confidence = prediction[0][pred_index]

        predicted_class = class_labels[pred_index]

        print(f"Predicted class: {predicted_class}")
        print(f"Confidence: {confidence:.2%}")

        return predicted_class, confidence
    else:
        print("No tomato leaf detected. Cannot make prediction.")
        return None, None

# Function to detect tomato leaf
def detect_leaf(img):
    # Example: Convert to HSV color space and threshold for green color
    hsv_image = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    lower_green = (25, 40, 40)
    upper_green = (85, 255, 255)
    mask = cv2.inRange(hsv_image, lower_green, upper_green)

    # Find contours of detected regions
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Check if any significant leaf region is detected
    return len(contours) > 0
