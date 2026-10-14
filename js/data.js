/*
 * Hope Connect Foundation: content data (WEDE5020 Part 3)
 * The Services and Projects pages build their cards from this data with js/dynamic.js.
 * Costs and availability are SAMPLE figures for the assignment. Edit them to match the organisation.
 */
window.HCF_DATA = {
  services: [
    {
      id: "educational-workshops",
      title: "Educational Workshops",
      category: "Education",
      icon: "fa-chalkboard-teacher",
      description: "Interactive sessions and seminars that build leadership skills and educate community members on social equity, sustainable practices and civic engagement.",
      cost: "Free for community groups; R350 per session for companies",
      availability: "Weekdays 09:00 to 18:00 and Saturdays 10:00 to 16:00, by booking"
    },
    {
      id: "environmental-consulting",
      title: "Environmental Consulting",
      category: "Environment",
      icon: "fa-seedling",
      description: "Volunteer-led support for neighbourhoods and local government to plan greener spaces, improve waste management and run clean-ups, gardens and tree planting.",
      cost: "Free for schools and neighbourhood groups",
      availability: "Booked up to two weeks ahead"
    },
    {
      id: "community-organizing-support",
      title: "Community Organizing Support",
      category: "Community",
      icon: "fa-users-cog",
      description: "Mentorship and logistical support for community leaders who want to start movements, organise events or build alliances.",
      cost: "Free",
      availability: "Weekday appointments, confirmed within two working days"
    },
    {
      id: "fundraising-assistance",
      title: "Fundraising Assistance",
      category: "Funding",
      icon: "fa-hand-holding-usd",
      description: "Help for grassroots initiatives with crowdfunding strategies, grant writing and donor outreach to build sustainable funding models.",
      cost: "Free for registered non-profit groups",
      availability: "Limited places each month"
    }
  ],
  projects: [
    {
      id: "education-for-all",
      title: "Education for All",
      category: "Education",
      icon: "fa-book-open",
      description: "Free workshops, literacy classes and tutoring for children and adults to bridge the education gap and build skills for brighter futures.",
      cost: "Free to attend",
      availability: "Weekly sessions; places are limited"
    },
    {
      id: "green-future",
      title: "Green Future",
      category: "Environment",
      icon: "fa-tree",
      description: "Tree planting campaigns, recycling initiatives and community clean-ups that inspire environmental stewardship and greener neighbourhoods.",
      cost: "Free; volunteers bring gloves and water",
      availability: "One activity day each month"
    },
    {
      id: "youth-mentorship",
      title: "Youth Mentorship",
      category: "Youth",
      icon: "fa-hands-helping",
      description: "A mentorship programme that connects young people with positive role models to develop leadership, career readiness and life skills.",
      cost: "Free",
      availability: "Applications open all year"
    },
    {
      id: "feeding-hope",
      title: "Feeding Hope",
      category: "Food support",
      icon: "fa-utensils",
      description: "Food drives, community kitchens and meal delivery services so that families have access to nutritious meals year-round.",
      cost: "Free",
      availability: "Weekly distribution; volunteers needed"
    },
    {
      id: "health-and-wellness",
      title: "Health & Wellness",
      category: "Health",
      icon: "fa-heartbeat",
      description: "Medical check-up days, mental health awareness events and community fitness programmes that support whole-person well-being.",
      cost: "Free",
      availability: "Scheduled events announced on the Contact page"
    }
  ]
};
