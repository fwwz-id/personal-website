interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
}

const projects: Project[] = [
  {
    title: "Artopologi",
    description:
      "A curated art marketplace enabling artists to showcase and sell their work locally. Each artwork is backed by an NFT-based Certificate of Authenticity for provenance and security.",
    tech: ["Next.js", "Node.js", "NFT", "Web3"],
    image: "/showcase/artopologi-thumb.png",
    github: "https://github.com/Artopologi",
    live: "https://artopologi.com",
  },
  {
    title: "KDEI Taipei Chatbot",
    description:
      "Chatbot for KDEI Taipei (Unofficial Indonesia Taiwan embassy) using Retrieval Augmented Generation (RAG) from WhatsApp hotline data.",
    tech: ["TypeScript", "Python", "Qdrant", "OpenAI"],
    image: "/showcase/kdei-taipei-chatbot.png",
    github: "https://github.com/fwwz-id/ict-rag-ui",
    live: "https://chatbot-kdei.vercel.app/",
  },
  {
    title: "React Coinbase",
    description:
      "Simple demo on how do implement Websocket on ReactJs",
    tech: ["React.js", "Coinbase", "Websocket"],
    image: "/showcase/react-coinbase.png",
    github: "https://github.com/fwwz-id/react-websocket-coinbase",
    live: "https://react-websocket-coinbase.vercel.app/",
  },
];

export default projects;
