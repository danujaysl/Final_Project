import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from keras.models import load_model
from keras.utils import load_img, img_to_array
import numpy as np


class_labels = ['Tomato Bacterial Spot', 'Tomato Early Blight', 'Tomato Late Blight', 'Tomato Leaf Mold',
                  'Tomato Septoria Leaf Spot', 'Tomato Spider Mites Two Spotted Spider Mite',
                  'Tomato Target Spot', 'Tomato YellowLeaf Curl Virus', 'Tomato Mosaic Virus',
                  'Tomato Healthy']

#loads the model
def LoadModel():
    model = load_model(r'tomato_diseaseORG.h5')
    return model

#predicts the image by its path
def predict_image_by_img_path(img_path,model):

    img = load_img(img_path, target_size=(256, 256))

    #convert image into areay
    img_arr = img_to_array(img)

    #Normalize pixel values to [0, 1]
    img = img_arr/255

    #Add batch dimension
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)

    pred_index = np.argmax(prediction)
    confidence = prediction[0][pred_index]

    predicted_class = class_labels[pred_index]

    print(f"Predicted class: {predicted_class}")
    print(f"Confidence: {confidence:.2%}")

    return (predicted_class,confidence)

#predicts the raw image
def predict_image(img,model):
    #convert image into areay
    img_arr = img_to_array(img)

    #Normalize pixel values to [0, 1]
    img = img_arr/255

    #Add batch dimension
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)

    pred_index = np.argmax(prediction)
    confidence = prediction[0][pred_index]

    predicted_class = class_labels[pred_index]

    print(f"Predicted class: {predicted_class}")
    print(f"Confidence: {confidence:.2%}")

    return (predicted_class,confidence)


