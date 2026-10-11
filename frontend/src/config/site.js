/**
 * Centralized Site and Brand Configuration for HL Stack.
 * Easily update brand names, contact info, WhatsApp number, and social links here.
 */

export const siteConfig = {
  name: "HL Stack",
  shortName: "HL Stack",
  tagline: "Build Real Skills. Create Your Future.",
  description:
    "Learn practical technology skills through live online classes, hands-on projects, and mentor-led guidance.",
  url: "https://hlstack.edu",
  
  // WhatsApp Configuration
  // Official HL Stack WhatsApp Channel
  whatsapp: {
    channelUrl: "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916",
    url: "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916",
    number: "919876543210", 
    defaultMessage:
      "Hi HL Stack! I would like to learn more about your live online IT training courses and upcoming batch schedules.",
    isConfigured: true,
  },

  // Contact Information
  contact: {
    email: "admissions@hlstack.edu",
    supportEmail: "support@hlstack.edu",
    phone: "+91 98765 43210",
    phoneDisplay: "+91 (0) 98765-43210",
    address: {
      line1: "Knowledge Hub, Tech Park Corridor",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560100",
      country: "India",
      mode: "100% Live Online Instruction across India & Worldwide",
    },
    workingHours: "Monday to Saturday: 9:00 AM – 7:30 PM IST",
    doubtSolvingHours: "Daily Doubt Rooms: 6:00 PM – 9:00 PM IST",
  },

  // Social Links
  socialLinks: {
    whatsapp: "https://whatsapp.com/channel/0029VbDpAjNFMqrYPjEV2916",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
  },

  // Business pillars
  pillars: [
    {
      title: "Interactive Live Classes",
      description: "Direct real-time engagement with experienced industry mentors. Ask questions in live sessions.",
    },
    {
      title: "Practical Assignments",
      description: "Code and analyze weekly problem sets designed around real workplace scenarios.",
    },
    {
      title: "Real-World Capstone Projects",
      description: "Build portfolio-ready applications and analytics pipelines that impress hiring managers.",
    },
    {
      title: "Daily Doubt-Solving Support",
      description: "Never stay stuck. Dedicated mentor doubt rooms and peer forums ensure conceptual clarity.",
    },
    {
      title: "Career & Interview Preparation",
      description: "Resume optimization, GitHub reviews, technical mock interviews, and hiring strategy.",
    },
  ],

  // Target audience groups
  targetAudience: [
    {
      role: "College Students",
      pitch: "Build industrial-level practical competencies alongside university degrees to secure campus placements.",
    },
    {
      role: "Fresh Graduates",
      pitch: "Bridge the academic-to-industry gap with modern tech stacks, live codebases, and portfolio artifacts.",
    },
    {
      role: "Beginners to Coding",
      pitch: "Structured zero-to-hero curriculum with gentle learning curves and patient guidance.",
    },
    {
      role: "Working Professionals",
      pitch: "Upskill into high-growth Data, AI, and Software Engineering tracks with evening and weekend batches.",
    },
  ],

  // Note on pricing & credentials
  transparencyNotice: {
    pricingNotice: "All fees displayed are proposed introductory tuition fees. Final schedule and batch dates are confirmed upon enrollment counselling.",
    cohortNotice: "HL Stack is currently onboarding upcoming cohorts. Detailed placement records and graduate case studies will be published as cohorts graduate.",
    demoNotice: "Admissions demo inquiry submissions are processed directly through WhatsApp or demo preview without silent discarding.",
  },
};
