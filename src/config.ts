export const siteConfig = {
  name: "Chris Joel Yesudhas",
  title: "Software Developer",
  description: "Portfolio website of Chris Joel Yesudhas",
  accentColor: "#1d4ed8",
  social: {
    email: "chrisjoel68157@gmail.com",
    linkedin: "https://www.linkedin.com/in/chris-joel-406aaa1b4/",
    // twitter: "https://x.com/rfitzio",
    github: "https://github.com/ChrisJoel10",
  },
  aboutMe:
    "Software Developer and AI Researcher with 3+ years of experience at GEP, Siemens Canada, and UNB, with experience in Software Development, Generative AI, AI agents, RAG, and LLM integration with enterprise systems. Earned a Master’s in Computer Science with a perfect 4.3 GPA",
  skills: ["Javascript", "AngularJs", "C#", ".net", "React", "Node.js", "Python", "C/C++", "Azure", "CI/CD Automation", "Full-Stack", "Docker", "AI/ML", "Cybersecurity"],
  projects: [
    {
      name: "Canadian Law Benchmark Dataset",
      description:
        "Built AI agents with LangGraph to automate parsing of Canadian legal documents, generating a benchmark dataset for evaluating LLM performance",
      link: "https://github.com/ChrisJoel10/Canada-Law-Benchmark-Generation",
      skills: ["Python", "Gemini", "GPT-4o", "Selenium", "Webdriver", "LangGraph"],
    },
    {
      name: "Student Task Manager",
      description:
        "A responsive web app that helps Students and Teachers manage, assign and keep track of their daily tasks, including role-based authentication system with three access levels: Teacher, Student, and Admin",
      link: "https://github.com/ChrisJoel10/Student-Task-Manager",
      skills: ["ReactJs", "ExpressJs", "MySql"],
    },
    {
      name: "Hypernym Generation using generative LLM",
      description:
        "Applied advanced natural language processing techniques, leveraging AI models such as XLNet and employing deep learning algorithms to tackle the SemEval-2018 Task 9 Hypernym Discovery",
      // link: "https://extensionkit.io/?ref=devportfolio",
      skills: ["Python", "Pytorch", "HuggingFace"],
    },
    {
      name: "Retinal Vessel and Foveal Avascular Zone Segmentation Of 3D Images Using Deep Learning Techniques",
      description: "A Neural Network built using Pytorch that converts the 3D images into 2D projection maps to help doctors visualize the retinal vessel of the retina. The segmented 2D image helps doctors easily visualize the density and diagnose the health of the retinal vessel.This project advanced to the final round for the best project during my undergraduate final year",
      skills: ["Python", "Pytorch"]
    },
    {
      name: "Vehicle Detection Using Densenet", 
      description: "An application built using Python and Deep learning frameworks like TensorFlow and Keras that detects from an input video and adds bounding boxes over detected vehicles",
      skills: ["Python", "Tensorflow", "keras"]
    }
  ],
  experience: [
    {
      company: "University of New Brunswick, Fredericton, Canada",
      title: "Graduate Research Assistant",
      dateRange: "January 2025 - April 2025",
      bullets: [
        "Used Python and Google’s Tesseract OCR engine to extract and curate datasets from MIT OpenCourseWare PDFs for training language models.",
        "Applied prompt engineering and fine-tuning techniques to evaluate LLMs (e.g., GPT-4o, Gemini) and benchmark performance",
      ],
    },
    {
      company: "Seimens, Fredericton, Canada",
      title: "AI and Cybersecurity Research Intern",
      dateRange: "May 2024 - Dec 2024",
      bullets: [
        "Conducted R&D on language models (OpenAI GPT-4o, LLAMA, Mistral), including prompt engineering and fine-tuning custom models for cybersecurity applications",
        "Built and deployed a chat-based web application implementing Retrieval-Augmented Generation (RAG) with LangChain, using a React.js front-end and Flask API back-end, hosted on Microsoft Azure",
        "Achieved the highest possible rating of 'Outstanding' in employer evaluations for both co-op terms",
      ],
    },
    {
      company: "GEP Worldwide, Mumbai, India",
      title: "Software Engineer",
      dateRange: "June 2021 - Aug 2023",
      bullets: [
        "Delivered enterprise-grade software solutions for clients including Bank of America, Roche, Dupont, and Lenovo, supporting high-availability systems in regulated industries",
        "Built and deployed full stack web applications (AngularJS, ReactJs, C#, .NET Framework, MySQL, MongoDB) with RESTful microservices, reducing system integration time by ~20%",
        "Optimized databases with millions of records, improving query performance and cutting data retrieval time by up to 40%",
        "Implemented authentication and authorization workflows (SSO and non-SSO) with Azure Active Directory, strengthening security and role-based access across applications",
        "Achieved WCAG 2.1 compliance for client-facing applications, improving accessibility for 10,000+ users",
        "Containerized applications with Docker and orchestrated deployments with Kubernetes, ensuring scalable and reliable delivery in Azure Cloud environments",
        "Automated build, test, and deployment workflows with Azure DevOps CI/CD, reducing manual release effort by ~70% and increasing deployment reliability",

      ],
    },
  ],
  education: [
    {
      school: "University of New Brunswick",
      degree: "Masters in Computer Science",
      dateRange: "Sep 2023 - May 2025",
      achievements: [
        "Graduated with a perfect GPA of 4.3/4.3",
        "Course List: Software Requirement Analysis, Natural Language Processing, Applied Graph Algorithmics, Artificial Intelligence, Machine Learning and Data Mining, Software and Network Security"
      ],
    },
    {
      school: "Mepco Schlenk Engineering College",
      degree: "Bachelor of Engineering, Computer Science",
      dateRange: "June 2017 - April 2021",
      achievements: [
        "Top 5% National Level Topper For ’Problem Solving Through Programming In C’ course conducted by Indian Institute of Technology (IIT)",
        "Academic Excellence Scholarship Award for the academic year 2017 and 2020",
        "Finalist – Best Capstone Project Award, Bachelor’s Degree"
      ],
    },
  ],
};
