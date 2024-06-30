from flask import Flask, request, jsonify
import requests
import google.generativeai as genai
import json

app = Flask(__name__)


genai.configure(api_key="XX")
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


rapidapi_key = "XX"
rapidapi_host = "youtube-scraper-2023.p.rapidapi.com"
url = "https://youtube-scraper-2023.p.rapidapi.com/video_transcript"


def get_transcript(video_id):
    payload = {"videoId": video_id}
    headers = {
        "x-rapidapi-key": rapidapi_key,
        "x-rapidapi-host": rapidapi_host,
        "Content-Type": "application/json",
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        transcript_data = response.json()
        if "transcript" in transcript_data:
            return " ".join([i["snippet"] for i in transcript_data["transcript"] if i["snippet"]])
        return ""
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error fetching transcript: {e}")
        return None


@app.route('/summarize/<video_id>', methods=['GET'])
def summarize(video_id):
    transcript = get_transcript(video_id)
    if not transcript:
        return jsonify({"error": "Transcript not found"}), 404

    try:
        summary_response = model.generate_content(["Summarize this paragraph", transcript])
        return jsonify({"summary": summary_response.text})
    except Exception as e:
        app.logger.error(f"Error generating summary: {e}")
        return jsonify({"error": "Failed to generate summary"}), 500
    


if __name__ == '__main__':
    app.run(debug=True)
