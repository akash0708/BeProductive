import cv2
import mediapipe as mp
import numpy as np
from flask import Flask, request, jsonify
import base64
from io import BytesIO
from PIL import Image
import re

app = Flask(__name__)

def initialize_face_mesh():
    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    return face_mesh, mp_face_mesh

def get_drawing_spec():
    mp_drawing = mp.solutions.drawing_utils
    drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
    return drawing_spec, mp_drawing

def process_frame(face_mesh, img):
    img_rgb = cv2.cvtColor(cv2.flip(img, 1), cv2.COLOR_BGR2RGB)
    res = face_mesh.process(img_rgb)
    img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
    return res, img_bgr

def calculate_head_pose(res, h, w):
    three_mat = []
    two_mat = []
    key_landmarks = [33, 263, 1, 61, 291, 199]

    if res.multi_face_landmarks:
        for face_landmarks in res.multi_face_landmarks:
            for idx, land_marks in enumerate(face_landmarks.landmark):
                if idx in key_landmarks:
                    x, y = int(land_marks.x * w), int(land_marks.y * h)
                    z = land_marks.z
                    two_mat.append([x, y])
                    three_mat.append([x, y, z])

            two_mat = np.array(two_mat, dtype=np.float64)
            three_mat = np.array(three_mat, dtype=np.float64)

            focal_length = 1 * w
            cam_mat = np.array([[focal_length, 0, w / 2],
                                [0, focal_length, h / 2],
                                [0, 0, 1]])

            distort = np.zeros((4, 1), dtype=np.float64)
            success, rot_vec, trans_vec = cv2.solvePnP(three_mat, two_mat, cam_mat, distort)

            if success:
                rmat, _ = cv2.Rodrigues(rot_vec)
                angles, _, _, _, _, _ = cv2.RQDecomp3x3(rmat)
                x_angle = angles[0] * 360
                y_angle = angles[1] * 360
                z_angle = angles[2] * 360
                return x_angle, y_angle, z_angle, face_landmarks
    return None, None, None, None

def determine_head_position(x_angle, y_angle):
    if y_angle < -11:
        return "Left"
    elif y_angle > 11:
        return "Right"
    elif x_angle < -15:
        return "Down"
    elif x_angle > 13:
        return "Up"
    else:
        return "Forward"
    
def distraction(x_angle, y_angle):
    if determine_head_position(x_angle, y_angle) == "Forward":
        return "No Distraction"
    else:
        return "Distraction"

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']
        image_data = re.sub('^data:image/.+;base64,', '', image_data)
        image = Image.open(BytesIO(base64.b64decode(image_data)))
        img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        face_mesh, mp_face_mesh = initialize_face_mesh()
        drawing_spec, mp_drawing = get_drawing_spec()

        h, w, _ = img.shape
        res, img_bgr = process_frame(face_mesh, img)
        x_angle, y_angle, z_angle, face_landmarks = calculate_head_pose(res, h, w)

        if x_angle is not None and y_angle is not None and z_angle is not None:
            text = distraction(x_angle, y_angle)
            return jsonify({'distraction_status': text})

        return jsonify({'distraction_status': 'No Face Detected'})
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': 'Error processing image'}), 500

if __name__ == '__main__':
    app.run(debug=True)
