from flask import Flask, send_file
from flask_socketio import SocketIO, emit
import cv2
import mediapipe as mp
import numpy as np
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

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

@app.route('/')
def index():
    return send_file('index.html')

@socketio.on('connect')
def connect():
    print('Client connected')

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')

@socketio.on('video-frame')
def handle_video_frame(image):
    img = cv2.imdecode(np.frombuffer(base64.b64decode(image.split(",")[1]), np.uint8), cv2.IMREAD_COLOR)
    h, w, _ = img.shape
    res, img_bgr = process_frame(face_mesh, img)
    x_angle, y_angle, z_angle, face_landmarks = calculate_head_pose(res, h, w)

    if x_angle is not None and y_angle is not None and z_angle is not None:
        text = distraction(x_angle, y_angle)
        _, buffer = cv2.imencode('.jpg', img_bgr)
        frame = base64.b64encode(buffer).decode('utf-8')
        emit('distraction-status', {'status': text, 'frame': frame})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000)
