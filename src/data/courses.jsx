import uuid from "react-uuid";

const courseData = [
  {
    id: uuid(),
    name: "Web Development Basics",
    summary: "Learn the fundamentals of web development.",
    category_id: "cat-1234",
    chapters: [
      {
        id: uuid(),
        name: "Introduction to HTML",
        summary: "Understanding the basics of HTML.",
        lessons: [
          {
            id: uuid(),
            name: "HTML Structure",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          {
            id: uuid(),
            name: "HTML Tags",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          // Add more lessons as needed
        ],
      },
      {
        id: uuid(),
        name: "Introduction to CSS",
        summary: "Styling web pages with CSS.",
        lessons: [
          {
            id: uuid(),
            name: "CSS Selectors",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          {
            id: uuid(),
            name: "CSS Box Model",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          // Add more lessons as needed
        ],
      },
      // Add more chapters as needed
    ],
  },
  {
    id: uuid(),
    name: "JavaScript Fundamentals",
    summary: "Introduction to programming with JavaScript.",
    category_id: "cat-2234",
    chapters: [
      {
        id: uuid(),
        name: "Basic JavaScript Syntax",
        summary: "Understanding the basics of JavaScript syntax.",
        lessons: [
          {
            id: uuid(),
            name: "Variables and Data Types",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          {
            id: uuid(),
            name: "Control Flow",
            content:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sint neque id rem magnam, alias optio temporibus quos vel quis esse similique asperiores obcaecati. Labore nobis temporibus exercitationem ut dicta!",
          },
          // Add more lessons as needed
        ],
      },
      // Add more chapters as needed
    ],
  },
  // Add more courses as needed
];

export default courseData;
