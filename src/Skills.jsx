import { useState, useEffect } from "react";

const API = "https://my-first-api-s0ly.onrender.com/skills";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  };
}

function Skills(props) {
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

  function handle(data) {
    if (Array.isArray(data)) {
      setSkills(data);
    } else {
      alert(data.error);
    }
  }

  function addSkill() {
    if (newSkill === "") {
      return;
    }
    fetch(API, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name: newSkill })
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        handle(data);
        setNewSkill("");
      });
  }

  function deleteSkill(id) {
    fetch(API + "/" + id, { method: "DELETE", headers: authHeaders() })
      .then(function (response) { return response.json(); })
      .then(handle);
  }

  function editSkill(skill) {
    let name = prompt("New name:", skill.name);
    if (name === null || name === "") {
      return;
    }
    fetch(API + "/" + skill.id, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ name: name })
    })
      .then(function (response) { return response.json(); })
      .then(handle);
  }

  return (
    <div>
      <h2>My Skills</h2>
      <ul>
        {skills.map(function (skill) {
          return (
            <li key={skill.id}>
              {skill.name}
              {props.loggedIn && (
                <span>
                  {" "}
                  <button onClick={function () { editSkill(skill); }}>Edit</button>
                  <button onClick={function () { deleteSkill(skill.id); }}>Delete</button>
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {props.loggedIn && (
        <div>
          <input
            type="text"
            value={newSkill}
            onChange={function (event) { setNewSkill(event.target.value); }}
            placeholder="New skill"
          />
          <button onClick={addSkill}>Add Skill</button>
        </div>
      )}
    </div>
  );
}

export default Skills;