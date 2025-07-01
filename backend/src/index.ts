import dotenv from 'dotenv';
// Los primeros dos import deben descomentarse antes
// de hacer el deploy a production
// import './register-aliases'
// import "module-alias/register"
dotenv.config()
import "@server/server"
