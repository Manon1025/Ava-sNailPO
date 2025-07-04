const listeEmployee = [
  {
    fname: "Alice",
    lname: "Martin",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    birth_date: "1990-03-12",
    email: "alice.martin@example.com",
    password: "hashedpassword123",
    adresse: {
      adress: "12 rue de Paris",
      cp: 75001,
      city: "Paris"
    },
    documents: {
      url: "https://example.com/docs/alice-martin.pdf"
    },
    role: "user",
    isActive: true,
    created_at: "2023-11-15"
  },
  {
    fname: "Julien",
    lname: "Dubois",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    birth_date: "1985-07-22",
    email: "julien.dubois@example.com",
    password: "hashedpassword456",
    adresse: {
      adress: "8 avenue des Champs",
      cp: 69001,
      city: "Lyon"
    },
    documents: {
      url: "https://example.com/docs/julien-dubois.pdf"
    },
    role: "admin",
    isActive: true,
    created_at: "2022-06-30"
  },
  {
    fname: "Sophie",
    lname: "Leclerc",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    birth_date: "1992-11-03",
    email: "sophie.leclerc@example.com",
    password: "hashedpassword789",
    adresse: {
      adress: "3 rue Lafayette",
      cp: 31000,
      city: "Toulouse"
    },
    documents: {
      url: "https://example.com/docs/sophie-leclerc.pdf"
    },
    role: "user",
    isActive: false,
    created_at: "2024-01-10"
  },
  {
    fname: "Marc",
    lname: "Renard",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    birth_date: "1988-05-10",
    email: "marc.renard@example.com",
    password: "hashedpassword321",
    adresse: {
      adress: "20 boulevard Haussmann",
      cp: 75009,
      city: "Paris"
    },
    documents: {
      url: "https://example.com/docs/marc-renard.pdf"
    },
    role: "user",
    isActive: true,
    created_at: "2023-03-21"
  },
  {
    fname: "Laura",
    lname: "Bernard",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    birth_date: "1995-09-18",
    email: "laura.bernard@example.com",
    password: "hashedpassword654",
    adresse: {
      adress: "15 place Bellecour",
      cp: 69002,
      city: "Lyon"
    },
    documents: {
      url: "https://example.com/docs/laura-bernard.pdf"
    },
    role: "admin",
    isActive: true,
    created_at: "2024-07-01"
  },
  {
    fname: "Nicolas",
    lname: "Petit",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    birth_date: "1982-02-27",
    email: "nicolas.petit@example.com",
    password: "hashedpassword987",
    adresse: {
      adress: "42 rue Nationale",
      cp: 59800,
      city: "Lille"
    },
    documents: {
      url: "https://example.com/docs/nicolas-petit.pdf"
    },
    role: "user",
    isActive: false,
    created_at: "2021-09-12"
  }
];

module.exports = listeEmployee;
