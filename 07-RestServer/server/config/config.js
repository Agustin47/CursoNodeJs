// ==========================
//  Puerto
// ==========================
process.env.PORT = process.env.PORT || 3000;

// ==========================
//  Entorno
// ==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
//  Login, Fecha de expiración / JWT SEED
// ==========================
process.env.JWT_Expirate = process.env.JWT_Expirate || 60 * 60 * 60 * 24;
process.env.JWT_Seed = process.env.JWT_Seed || 'cafe-development';

// ==========================
//  Base de Datos
// ==========================
let urlDB = '';

process.env.MongoDB_URL = process.env.MongoDB_URL || 'mongodb://localhost:27017/cafe';

// ==========================
//  Google Client
// ==========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '219465742476-hifinku7ls9gmnnfmha38mf1j836em4k.apps.googleusercontent.com';