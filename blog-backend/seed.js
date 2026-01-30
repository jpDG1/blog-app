require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const posts = [
  {
    "title": "Post 1",
    "content": "Baza danych przechowuje informacje w strukturalny sposób.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 2",
    "content": "Sieć komputerowa umożliwia przesyłanie danych między urządzeniami.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 3",
    "content": "Systemy operacyjne zarządzają zasobami komputera i umożliwiają działanie aplikacji.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 4",
    "content": "Cyberbezpieczeństwo jest ważne w dzisiejszej erze cyfrowej.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 5",
    "content": "Algorytmy są podstawą rozwiązywania problemów informatycznych.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 6",
    "content": "Chmura obliczeniowa umożliwia przechowywanie danych online.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 7",
    "content": "Aplikacja mobilna ułatwia korzystanie z usług na smartfonie.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 8",
    "content": "Sztuczna inteligencja rewolucjonizuje wiele dziedzin, w tym medycynę i transport.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 9",
    "content": "Programowanie to sztuka tworzenia oprogramowania.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  },
  {
    "title": "Post 10",
    "content": "Kryptografia zajmuje się zabezpieczaniem danych przed nieautoryzowanym dostępem.",
    "image": "https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg",
    "author": null
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z MongoDB');

    const User = require('./models/User');
    let author = await User.findOne();
    
    if (!author) {
      author = new User({
        name: 'Admin',
        email: 'admin@blog.com',
        password: 'admin123'
      });
      await author.save();
      console.log('Utworzono testowego użytkownika');
    }

    await Post.deleteMany({});
    console.log('Usunięto stare posty');

    const postsWithAuthor = posts.map(post => ({
      ...post,
      author: author._id
    }));

    await Post.insertMany(postsWithAuthor);
    console.log(`Dodano ${posts.length} postów`);

    console.log('Baza danych zaseedowana pomyślnie!');
    process.exit(0);
  } catch (error) {
    console.error('Błąd:', error);
    process.exit(1);
  }
}

seedDatabase();