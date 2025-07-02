import dotenv from 'dotenv';
dotenv.config()
// Los primeros dos import deben descomentarse antes
// de hacer el deploy a production
// import './register-aliases'
// import "module-alias/register"
import "@server/server"
