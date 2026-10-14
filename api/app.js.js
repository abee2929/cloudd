
from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/')
def home():
    return "RESTful API is running successfully!"
students = [
    {"id": 1, "name": "Arun"},
    {"id": 2, "name": "Priya"}
]

# GET: Display all students
@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)

# POST: Add a student
@app.route('/students', methods=['POST'])
def add_student():
    student = request.get_json()
    students.append(student)
    return jsonify(student), 201

# PUT: Update a student
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    for student in students:
        if student['id'] == id:
            data = request.get_json()
            student['name'] = data['name']
            return jsonify(student)
    return jsonify({"error": "Student not found"}), 404

# DELETE: Delete a student
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    for student in students:
        if student['id'] == id:
            students.remove(student)
            return jsonify({"message": "Student deleted"})
    return jsonify({"error": "Student not found"}), 404

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
