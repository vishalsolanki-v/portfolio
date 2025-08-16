export const PRIMARY_COLOR_CODE = '#ff7000';
export const NAV_LINKS = [
  { name: "Articles", href: "/" },
  { name: "Skills", href: "/" },
  { name: "Contact", href: "/" },
  { name: "My Resume", href: process.env.NEXT_PUBLIC_RESUME_URL }
];;
export const VISHAL_TECH_SKILLS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Frontend Performance Optimization",
  "Node.js",
  "REST API Integration",
  "Clerk Authentication",
  "JWT Authentication",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "npm",
  "yarn"
];

export const PROJECTS = [
  {
    name: "Next.js / React.js Full-Stack Application",
    date: "2024",
    role: "Personal Project",
    description:
      "Developed a full-stack application similar to Stack Overflow, featuring user interactions such as posting questions, providing answers, and voting. Implemented a tagging system for improved content discoverability, built responsive UI components using ShadCN/UI and Tailwind CSS, and optimized performance with Zod validation.",
    tags: ["Next.js", "React.js", "Full-Stack", "Tailwind CSS", "ShadCN/UI", "Zod"]
  },
  {
    name: "Commercial Business Application",
    date: "2024",
    role: "Frontend Developer",
    description:
      "Developed business application functionalities including authentication, dynamic page rendering, and server-side API calls, improving load speed by 30%. Implemented real-time updates with Redux and collaborated with stakeholders to capture business requirements accurately.",
    tags: ["React.js", "Next.js", "Redux", "API Integration", "Performance Optimization"]
  },
  {
    name: "H R Management System",
    date: "2023–2024",
    role: "Frontend Developer",
    description:
      "Designed a user-friendly HR system interface that streamlined employee management processes. Enhanced responsiveness by 55% through efficient state management using Redux and Context API. Collaborated with backend teams for real-time updates and system performance improvements.",
    tags: ["React.js", "Redux", "Context API", "Responsive Design", "Real-Time Updates"]
  },
  {
    name: "Influencer Marketing Platform",
    date: "2025",
    role: "Frontend Developer",
    description:
      "Built scalable, pixel-perfect UIs for a platform connecting brands with social media influencers. Implemented real-time messaging with WebSockets, advanced AI-powered search, and robust state management using Redux Toolkit and RTK Query. Ensured type safety with TypeScript for better maintainability.",
    tags: ["React.js", "TypeScript", "Redux Toolkit", "RTK Query", "WebSockets", "AI Search"]
  }
];
