import { useState, useEffect } from "react";

const API = "https://my-first-api-s0ly.onrender.com/skills";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(function () {
    fetch(API)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setSkills(data);
      });
  }, []);

  function addSkill() {
    if (newSkill === "") {
      return;
    }

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkill })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setSkills(data);
        setNewSkill("");
      });
  }

  function deleteSkill(id) {
    fetch(API + "/" + id, { method: "DELETE" })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setSkills(data);
      });
  }

  function editSkill(skill) {
    let name = prompt("New name:", skill.name);

    if (name === null || name === "") {
      return;
    }

    fetch(API + "/" + skill.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setSkills(data);
      });
  }

  return (
    <div>
      <h2>My Skills</h2>
      <ul>
        {skills.map(function (skill) {
          return (
            <li key={skill.id}>
              {skill.name}{" "}
              <button onClick={function () { editSkill(skill); }}>
                Edit
              </button>{" "}
              <button onClick={function () { deleteSkill(skill.id); }}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <input
        type="text"
        value={newSkill}
        onChange={function (event) {
          setNewSkill(event.target.value);
        }}
        placeholder="New skill"
      />
      <button onClick={addSkill}>Add Skill</button>
    </div>
  );
}

export default Skills;