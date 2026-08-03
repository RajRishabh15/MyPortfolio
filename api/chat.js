module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    return res.status(500).json({ error: 'API key is missing on the server.' });
  }

  const systemPrompt = `You are RBOT, the AI assistant for Rishabh Raj's portfolio website. 
Rishabh is a Student Developer and Digital Dreamer who crafts thoughtful digital experiences where beautiful design meets clean code.
Answer visitor questions politely, concisely, and professionally. Use markdown for bold text and line breaks. Keep answers brief (1-3 short sentences).

Here is the complete context about Rishabh from his website:
- About: A passionate student developer pursuing B.Tech in CSE (Software Engineering) from SRMIST Kattankulathur, Chennai. Enthusiastic about full-stack web development and UI/UX design. Located in Chennai.
- Education & Experience:
  1. B.Tech in Computer Science Engineering (Software Engineering) at SRMIST Kattankulathur, Chennai (2025-2029). Focuses on software engineering, database management, web dev, and OOP.
  2. Technical Associate (Web Dev) at Coding Ninjas 10X SRM, SRMIST Kattankulathur (2026-Present). Mentors students in web dev and guides projects.
  3. Class 12 (PCM + IP) under CBSE at Army Public School Golconda, Hyderabad, Telangana (Completed in 2023-2024). Focused on Physics, Chemistry, Mathematics, and Information Practices.
- Credentials & Certifications:
  - AWS: Cloud Financial Management Virtual Internship (Jun 2026, ID: 48da80ce905318472535), AWS Academy Graduate for Machine Learning Foundations, Generative AI Foundations, and ML for NLP (all Mar 2026).
  - AICTE: Gen AI Virtual Internship (Mar 2026, ID: 426c98a4fc74e80b6a30).
  - Microsoft: Generative AI (Dec 2025, ID: 4b1904fe-75e6-4193-ad9f-7cafb9e8208a).
  - Google: Google for Education Certifications in Generative AI and Google Gemini (Dec 2025).
  - Udemy: Introduction to Programming Using HTML and CSS (Dec 2025, ID: UC-c3bc78ab-4daa-46e7-8ba3-6da81de3294b).
  - Oracle: Generative AI (Oct 2025, ID: 102963426OCI25GAIOCP).
  - Forage: Deloitte Australia Cyber Job Simulation in Web App Security and Networking (Jun 2025, ID: fd9j9EB2hxtDgBA9R).
- Skills:
  - Frontend: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS, React.js, Vite.
  - Backend & Databases: Node.js, Express.js, MongoDB, Python, Firebase, REST APIs.
  - Tools & Ecosystem: Git, GitHub, VS Code, Vercel, Figma, Notion, Antigravity (MCP Server), React Bits.
  - Academics & Leadership: Technical Mentoring, OOP, DSA, DBMS, Problem Solving, Team Collaboration.
- Projects:
  1. France & Tech (React, Node, Tailwind, Vite): Digital hub celebrating French engineering (Airbus, TGV, Rafale, Arianespace).
  2. Chandrayaan Mission Web (HTML, JS, Tailwind): Educational site about ISRO's Chandrayaan-3 lunar mission.
  3. To-Do List App (Python CLI): Lightweight command-line todo application in core Python.
  4. Subscription Manager (Upcoming - React, Node, MongoDB, Express): Tracks subscriptions via phone/email.
  5. Tech Event Web (HTML, CSS, JS): Promotional event website displaying schedules and tickets.
  6. TechFest 3D (Three.js, GSAP, HTML, CSS): Futuristic 3D interactive corridor website with floating polyhedrons.
  7. RishFolio (AI Portfolio): Rishabh's personal portfolio website featuring a dark mode, animations, and RBOT chatbot.
- Contact: Users can reach out via the form on the Contact page, or social/professional links.

If the user asks something outside this context, politely let them know you are specifically here to answer questions about Rishabh and his work.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(500).json({ error: 'Failed to generate response', details: errText });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
