from flask import Flask, render_template, request, jsonify
import hashlib

app = Flask(__name__)

# ---------------- LOVE CALCULATOR LOGIC ---------------- #

def name_value(name):
    name = name.lower()
    total = 0

    for ch in name:
        if ch.isalpha():
            total += ord(ch) - 96

    return total


def common_letter_score(name1, name2):

    set1 = set(filter(str.isalpha, name1.lower()))
    set2 = set(filter(str.isalpha, name2.lower()))

    common = set1.intersection(set2)

    if len(set1.union(set2)) == 0:
        return 0

    return (len(common) / len(set1.union(set2))) * 100


def vowel_score(name1, name2):

    vowels = set("aeiou")

    v1 = len([ch for ch in name1.lower() if ch in vowels])
    v2 = len([ch for ch in name2.lower() if ch in vowels])

    if max(v1, v2) == 0:
        return 0

    return (min(v1, v2) / max(v1, v2)) * 100


def hash_factor(name1, name2):

    combined = ''.join(sorted([name1.lower(), name2.lower()]))

    hash_object = hashlib.md5(combined.encode())

    hash_value = int(hash_object.hexdigest(), 16)

    return hash_value % 100


def love_calculator(name1, name2):

    nv1 = name_value(name1)
    nv2 = name_value(name2)

    numerology_score = 100 - abs(nv1 - nv2) % 100

    letter_score = common_letter_score(name1, name2)

    vowel_harmony = vowel_score(name1, name2)

    hash_score = hash_factor(name1, name2)

    final_score = (
        0.3 * numerology_score +
        0.25 * letter_score +
        0.15 * vowel_harmony +
        0.3 * hash_score
    )

    return round(final_score, 2)

# ---------------- ROUTES ---------------- #

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/calculate", methods=["POST"])
def calculate():

    data = request.get_json()

    name1 = data["name1"].strip()
    name2 = data["name2"].strip()

    score = love_calculator(name1, name2)

    if score > 80:
        message = "Perfect Match 💍"

    elif score > 60:
        message = "Strong Connection 💕"

    elif score > 40:
        message = "Average Compatibility 🙂"

    else:
        message = "Needs Effort 😅"

    return jsonify({
        "score": score,
        "message": message
    })


if __name__ == "__main__":
    app.run(debug=True)