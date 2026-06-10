import React from "react";
import "./Skills.css";
import { 
  Code, 
  Server, 
  Terminal, 
  Wrench,
  Globe,
  Palette,
  Zap,
  Layers,
  Wind,
  Database,
  Coffee,
  FileCode,
  Cpu,
  GitBranch,
  Send
} from "lucide-react";

const Skills = () => {
  return (
    <div className="skills-container">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-grid">
        
        {/* Frontend */}
        <div className="skill-box">
          <h3><Globe size={20}/> Frontend Development</h3>
          <ul>
            <li><FileCode size={16}/> HTML</li>
            <li><Palette size={16}/> CSS</li>
            <li><Zap size={16}/> JavaScript</li>
            <li><Layers size={16}/> React</li>
            <li><Wind size={16}/> Tailwind CSS</li>
          </ul>
        </div>

        {/* Backend */}
        <div className="skill-box">
          <h3><Server size={20}/> Backend Development</h3>
          <ul>
            <li><Coffee size={16}/> Node.js</li>
            <li><Server size={16}/> Express.js</li>
            <li><Database size={16}/> MongoDB</li>
          </ul>
        </div>

        {/* Programming */}
        <div className="skill-box">
          <h3><Code size={20}/> Programming Languages</h3>
          <ul>
            <li><Cpu size={16}/> C</li>
            <li><Cpu size={16}/> C++</li>
            <li><Coffee size={16}/> Java</li>
            <li><Terminal size={16}/> Python</li>
          </ul>
        </div>

        {/* Tools */}
        <div className="skill-box">
          <h3><Wrench size={20}/> Tools & Technologies</h3>
          <ul>
            <li><GitBranch size={16}/> Git & GitHub</li>
            <li><Code size={16}/> VS Code</li>
            <li><Send size={16}/> Postman</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Skills;
