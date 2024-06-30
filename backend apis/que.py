from flask import Flask, request, jsonify
import requests
import json
import google.generativeai as genai

app = Flask(__name__)


genai.configure(api_key="XX")
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


rapid_key = "XX"
rapid_host = "youtube-scraper-2023.p.rapidapi.com"
api_url = "https://youtube-scraper-2023.p.rapidapi.com/video_transcript"


def fetch_trans(vid):
    payload = {"videoId": vid}
    headers = {
        "x-rapidapi-key": rapid_key,
        "x-rapidapi-host": rapid_host,
        "Content-Type": "application/json",
    }
    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        if "transcript" in data:
            return " ".join([i["snippet"] for i in data["transcript"] if i["snippet"]])
        return ""
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching transcript: {e}")
        return None

@app.route('/summarize/<vid>', methods=['GET'])
def summarize(vid):
    trans = fetch_trans(vid)
    if not trans:
        return jsonify({"error": "Transcript not found"}), 404

    try:
        summary = model.generate_content(["Summarize this paragraph", trans])
        return jsonify({"summary": summary.text})
    except Exception as e:
        app.logger.error(f"Error generating summary: {e}")
        return jsonify({"error": "Failed to generate summary"}), 500
    


@app.route('/gen_mcq/<vid>', methods=['POST', 'GET'])
def gen_mcq(vid):
    trans = fetch_trans(vid)
    if not trans:
        return jsonify({"error": "Transcript not found"}), 404

    try:
        prompt = (
            "Design 3 multiple choice questions from the given paragraph. "
            "Each MCQ should have 4 options labeled a, b, c, and d. "
            "Also display the correct option. "
            "Give the output in the form of a structured JSON with the following format: "
            "[{\"q\": \"...\", \"opts\": {\"a\": \"...\", \"b\": \"...\", \"c\": \"...\", \"d\": \"...\"}, \"ans\": \"...\"}]"
        )
        mcq = model.generate_content([prompt, trans])

        mcq_text = mcq.text
        mcq_text = mcq_text.strip('```json').strip('```')

        if mcq_text.strip():
            try:
                mcq_json = json.loads(mcq_text)
                return jsonify(mcq_json), 200
            
            except json.JSONDecodeError as e:
                return jsonify({'error': f'Failed to decode JSON: {e}'}), 500
        else:

            return jsonify({'error': 'The MCQ response text is empty or invalid.'}), 500

    except requests.exceptions.RequestException as e:
        
        return jsonify({'error': f'Request to YouTube API failed: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
