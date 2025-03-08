const axios = require('axios');

// The URL of the API endpoint
const apiUrl = 'https://instagram-clone-api.fly.dev/users';

// Sample users to be created
const usersData = [
    {
      "username": "elon_musk",
      "password": "password123",
      "email": "elon.musk@example.com",
      "phonenumber": "+1234567890",
      "image": "https://example.com/images/elon_musk.jpg",
      "bio": "CEO of SpaceX, Tesla, and various groundbreaking ventures. Innovator in space exploration, sustainable energy, and AI.",
      "name": "Elon Musk"
    },
    {
      "username": "rihanna",
      "password": "password123",
      "email": "rihanna@example.com",
      "phonenumber": "+1234567891",
      "image": "https://example.com/images/rihanna.jpg",
      "bio": "Global superstar, business mogul, and philanthropist. Founder of Fenty Beauty and recognized for her music and activism.",
      "name": "Rihanna"
    },
    {
      "username": "instagram",
      "password": "password123",
      "email": "contact@instagram.com",
      "phonenumber": "+1234567892",
      "image": "https://example.com/images/instagram.jpg",
      "bio": "A leading social media platform where users can share photos, videos, and stories with the world.",
      "name": "Instagram"
    },
    {
      "username": "natgeo",
      "password": "password123",
      "email": "info@natgeo.com",
      "phonenumber": "+1234567893",
      "image": "https://example.com/images/natgeo.jpg",
      "bio": "National Geographic covers the world’s science, exploration, and adventure. We inspire people to care about the planet.",
      "name": "National Geographic"
    },
    {
      "username": "tech_guru",
      "password": "password123",
      "email": "tech.guru@example.com",
      "phonenumber": "+1234567894",
      "image": "https://example.com/images/tech_guru.jpg",
      "bio": "A tech enthusiast, exploring the latest in gadgets, coding, and technology trends. Always on the cutting edge.",
      "name": "Tech Guru"
    },
    {
      "username": "john_smith",
      "password": "password123",
      "email": "john.smith@example.com",
      "phonenumber": "+1234567895",
      "image": "https://example.com/images/john_smith.jpg",
      "bio": "Tech professional working in software development. Passionate about coding and building solutions for everyday problems.",
      "name": "John Smith"
    },
    {
      "username": "jane_doe",
      "password": "password123",
      "email": "jane.doe@example.com",
      "phonenumber": "+1234567896",
      "image": "https://example.com/images/jane_doe.jpg",
      "bio": "A passionate traveler and photographer, capturing the beauty of the world one picture at a time.",
      "name": "Jane Doe"
    },
    {
      "username": "michael_jones",
      "password": "password123",
      "email": "michael.jones@example.com",
      "phonenumber": "+1234567897",
      "image": "https://example.com/images/michael_jones.jpg",
      "bio": "Entrepreneur and a creative problem solver. Always striving to improve systems and processes in business and tech.",
      "name": "Michael Jones"
    },
    {
      "username": "lucy_brown",
      "password": "password123",
      "email": "lucy.brown@example.com",
      "phonenumber": "+1234567898",
      "image": "https://example.com/images/lucy_brown.jpg",
      "bio": "Marketing professional with a love for creative storytelling and brand building. Focused on digital marketing strategies.",
      "name": "Lucy Brown"
    },
    {
      "username": "david_white",
      "password": "password123",
      "email": "david.white@example.com",
      "phonenumber": "+1234567899",
      "image": "https://example.com/images/david_white.jpg",
      "bio": "Passionate about photography, hiking, and capturing the beauty of nature through a lens. Outdoors is where I feel alive.",
      "name": "David White"
    },
    {
      "username": "sarah_lee",
      "password": "password123",
      "email": "sarah.lee@example.com",
      "phonenumber": "+1234567810",
      "image": "https://example.com/images/sarah_lee.jpg",
      "bio": "Aspiring artist with a love for painting and sculpting. Always experimenting with new mediums and creative expressions.",
      "name": "Sarah Lee"
    },
    {
      "username": "tom_williams",
      "password": "password123",
      "email": "tom.williams@example.com",
      "phonenumber": "+1234567811",
      "image": "https://example.com/images/tom_williams.jpg",
      "bio": "Avid reader, writer, and history buff. Passionate about storytelling and the power of knowledge.",
      "name": "Tom Williams"
    },
    {
      "username": "emma_jones",
      "password": "password123",
      "email": "emma.jones@example.com",
      "phonenumber": "+1234567812",
      "image": "https://example.com/images/emma_jones.jpg",
      "bio": "A curious mind exploring new subjects every day. Whether it's science, technology, or literature, there's always something to learn.",
      "name": "Emma Jones"
    }
  ]
  
// Function to send POST request and create multiple users
const createUsers = async () => {
  try {
    const response = await axios.post(apiUrl, { users: usersData });
    console.log('Users created successfully:', response.data);
  } catch (error) {
    console.error('Error creating users:', error.response ? error.response.data : error.message);
  }
};

// Call the function to seed the users
createUsers();
