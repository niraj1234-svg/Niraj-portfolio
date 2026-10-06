import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Achievement } from '../models/Achievement.js';
import { Skill } from '../models/Skill.js';
import { SocialLink } from '../models/SocialLink.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { ENV } from '../config/env.js';

export async function seedDatabase(force = false) {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0 && !force) {
      console.log('Database already contains records. Skipping seed.');
      return;
    }

    if (force) {
      console.log('Force re-seeding database...');
      await Promise.all([
        User.deleteMany({}),
        Project.deleteMany({}),
        Experience.deleteMany({}),
        Education.deleteMany({}),
        Achievement.deleteMany({}),
        Skill.deleteMany({}),
        SocialLink.deleteMany({}),
        SiteSettings.deleteMany({}),
      ]);
    }

    // 1. Create Admin User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ENV.ADMIN_PASSWORD, salt);
    await User.create({
      name: ENV.ADMIN_NAME,
      email: ENV.ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
    });
    console.log(`Admin user initialized: ${ENV.ADMIN_EMAIL}`);

    // 2. Site Settings
    await SiteSettings.create({
      name: 'Niraj Dhore',
      role: 'Aspiring DevOps & Cloud Engineer',
      email: 'dhoreniraj83@gmail.com',
      location: 'Bilaspur, Chhattisgarh, India',
      availability: 'Open to internships & opportunities',
      bio: "I'm an Information Technology student focused on DevOps and cloud engineering, with a strong interest in Linux, networking, AWS, containerization, automation, CI/CD, and reliable deployments.\n\nI also co-founded KALA, a print-on-demand sportswear business, where I work across technology, website development, deployment, marketing, and business operations.\n\nMy journey has evolved from game development and web development into DevOps and cloud engineering, with a focus on learning by building, deploying, and documenting real systems.",
      profileImage: '/assets/profile.jpg',
      resumeUrl: '',
    });

    // 3. Projects
    await Project.create([
      {
        title: 'KALA — Production E-Commerce Platform',
        slug: 'kala-ecommerce-platform',
        category: 'Projects',
        description:
          'Production e-commerce platform for KALA, a print-on-demand sportswear business. Built and managed with React, TypeScript, Vite, Tailwind CSS, Node.js, Express and MongoDB, with product catalogue, search, filtering, cart, checkout, authentication, order placement, payment gateway and order management.',
        longDescription:
          'Production full-stack sportswear platform engineered for KALA. Features complete order lifecycle automation, Razorpay payment processing, inventory tracking, SSL/TLS security, and automated continuous deployment.',
        technologies: [
          'React',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Node.js',
          'Express',
          'MongoDB Atlas',
          'Vercel',
          'Render',
          'Hostinger',
        ],
        image: '/assets/portfolio-kala.svg',
        liveUrl: 'https://www.kalaofficial.store/',
        githubUrl: 'https://github.com/niraj1234-svg/Kala-Front',
        featured: true,
        status: 'completed',
        order: 1,
      },
      {
        title: 'SIH 2026 — AI-Powered Import Impact Simulator for Palm Oil Tariffs',
        slug: 'sih-palm-oil-tariff-simulator',
        category: 'Ongoing',
        description:
          'Ongoing initiative addressing edible oil tariff optimizations for the Department of Food and Public Distribution. Simulating import duty dynamics, domestic consumer prices, and revenue impacts.',
        longDescription:
          'Econometric and policy simulator engineered for the Smart India Hackathon. Models the sensitivity of domestic consumer prices against dynamic import tariff revisions on crude and refined palm oil.',
        technologies: ['Python', 'FastAPI', 'Statistical Modeling', 'Docker'],
        image: '/assets/portfolio-sih-palm-oil.svg',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        status: 'ongoing',
        order: 2,
      },
    ]);

    // 4. Experience & Leadership
    await Experience.create([
      {
        organization: 'KALA',
        role: 'Co-Founder & Tech Lead',
        location: 'Bilaspur, India (Remote/Hybrid)',
        startDate: '2024',
        current: true,
        description: [
          'Co-founded and engineered the production e-commerce platform for a print-on-demand sportswear brand.',
          'Built decoupled architecture with React/Vite frontend, Node/Express API backend, and MongoDB Atlas database cluster.',
          'Implemented end-to-end shopping experience: product catalog, search, filtering, cart, checkout, payment gateway integration, and order management.',
          'Managed operations, fulfillment, and customer delivery for 500+ total orders including ~60 direct web orders.',
        ],
        technologies: [
          'React',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Node.js',
          'Express',
          'MongoDB Atlas',
          'Vercel',
          'Render',
          'Hostinger',
        ],
        order: 1,
      },
      {
        organization: 'GeeksforGeeks Student Chapter (GFG)',
        role: 'Lead — Game Development Team',
        location: 'Bilaspur, India',
        startDate: 'Dec 2025',
        current: true,
        description: [
          'Leading game development team workshops, hackathons, and technical sessions.',
          'Mentoring students in 3D game physics, graphics programming, and collaborative Git workflows.',
        ],
        technologies: ['Unity', 'C#', 'Git', 'Game Engine Architecture'],
        order: 2,
      },
      {
        organization: 'Google Developer Groups On Campus (GDGC)',
        role: 'Game Development Co-Lead',
        location: 'Bilaspur, India',
        startDate: 'Dec 2025',
        current: true,
        description: [
          'Co-leading the game development track, organizing community build challenges and student developer outreach.',
        ],
        technologies: ['Unity', 'C#', 'Git', 'GitHub'],
        order: 3,
      },
      {
        organization: 'GeeksforGeeks Student Chapter (GFG)',
        role: 'Co-Lead — Game Development Team',
        location: 'Bilaspur, India',
        startDate: 'Dec 2024',
        endDate: 'Aug 2025',
        current: false,
        description: [
          'Assisted in technical game jam coordination and foundational game programming workshops for incoming students.',
        ],
        technologies: ['Unity', 'C#', 'Git'],
        order: 4,
      },
    ]);

    // 5. Education
    await Education.create([
      {
        institution: 'Guru Ghasidas Vishwavidyalaya',
        degree: 'B.Tech',
        field: 'Information Technology',
        startYear: 2024,
        endYear: 2027,
        grade: 'CGPA 8.52',
        description:
          'Pursuing B.Tech in IT with focus on systems engineering, computer networking, operating systems, and cloud computing.',
      },
    ]);

    // 6. Achievements
    await Achievement.create([
      {
        title: 'Smart India Hackathon 2025',
        organization: "Ministry of Education's Innovation Cell (MIC)",
        date: '2025',
        description:
          'National level hackathon participation solving complex challenges with full-stack architecture, deployment pipelines, and engineering teamwork.',
        category: 'Certifications',
        image: '/assets/portfolio-sih-2025.svg',
      },
      {
        title: 'SUSTAIN-A-THON 2024',
        organization: 'Sustainability Innovation Challenge',
        date: '2024',
        description:
          'Participation in sustainability hackathon focusing on scalable technology solutions, efficient resource models, and collaborative problem solving.',
        category: 'Certifications',
        image: '/assets/portfolio-sustainathon.svg',
      },
      {
        title: 'Unity Learn — 3D Beginner: Roll-a-Ball Game',
        organization: 'Unity Technologies',
        date: '2024',
        description:
          'Foundational 3D game development and physics simulation badge from Unity Learn, covering player controls, physics, and gameplay mechanics.',
        category: 'Certifications',
        image: '/assets/portfolio-unity.svg',
      },
    ]);

    // 7. Skills
    await Skill.create([
      { name: 'Linux', category: 'DevOps & Systems', level: 'Intermediate', order: 1 },
      { name: 'AWS (EC2, S3, IAM, VPC, Security Groups)', category: 'DevOps & Systems', level: 'Intermediate', order: 2 },
      { name: 'Docker', category: 'DevOps & Systems', level: 'Intermediate', order: 3 },
      { name: 'CI/CD & GitHub Actions', category: 'DevOps & Systems', level: 'Intermediate', order: 4 },
      { name: 'Computer Networking (TCP/IP, DNS, HTTP/S)', category: 'DevOps & Systems', level: 'Intermediate', order: 5 },
      { name: 'Bash Scripting', category: 'DevOps & Systems', level: 'Intermediate', order: 6 },
      { name: 'React', category: 'Web Development', level: 'Intermediate', order: 7 },
      { name: 'TypeScript', category: 'Web Development', level: 'Intermediate', order: 8 },
      { name: 'Node.js & Express', category: 'Web Development', level: 'Intermediate', order: 9 },
      { name: 'MongoDB & MongoDB Atlas', category: 'Databases', level: 'Intermediate', order: 10 },
      { name: 'Vercel & Render', category: 'Cloud Deployment', level: 'Intermediate', order: 11 },
      { name: 'Git & GitHub', category: 'Tools', level: 'Advanced', order: 12 },
    ]);

    // 8. Social Links
    await SocialLink.create([
      { platform: 'GitHub', url: 'https://github.com/niraj1234-svg', order: 1 },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/niraj-dhore-56538a416', order: 2 },
      { platform: 'LeetCode', url: 'https://leetcode.com/u/Niraj_009/', order: 3 },
      { platform: 'KALA Store', url: 'https://www.kalaofficial.store/', order: 4 },
      { platform: 'Email', url: 'mailto:dhoreniraj83@gmail.com', order: 5 },
    ]);

    console.log('Database successfully seeded with genuine Niraj Dhore information!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
