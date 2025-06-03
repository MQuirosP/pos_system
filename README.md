
# POS System (Backend)

Sistema de Punto de Venta con gestión de inventario, ventas, compras, reportes y control de usuarios mediante roles.

## Tecnologías utilizadas

* Node.js + Express como servidor backend  
* TypeORM como ORM  
* PostgreSQL como base de datos  
* JWT para autenticación  
* TypeScript como lenguaje principal  
* Winston para logging  
* Class-validator / class-transformer para validaciones y transformaciones  
* Soporte para aliases con module-alias  

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/pos_system.git
    cd pos_system
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Asegúrate de definir al menos:

    ```env
    NODE_ENV=development
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_datos
    JWT_SECRET=clave_secreta
    ```

4.  **IMPORTANTE** - Manejo de aliases:

    Si vas a ejecutar el proyecto en modo desarrollo, asegúrate de que en `src/index.ts` las siguientes líneas estén comentadas:

    ```typescript
    // import './register-aliases';
    // import 'module-alias/register';
    ```

    Antes de hacer el build para producción, descoméntalas para que los alias funcionen correctamente.

5.  Ejecuta el servidor en modo desarrollo:

    ```bash
    npm run dev
    ```

6.  Para compilar el proyecto (modo producción):

    ```bash
    npm run build
    ```

7.  Para iniciar el servidor con el código ya compilado:

    ```bash
    npm start
    ```

## Scripts útiles

* `npm run dev` # Ejecuta el servidor con `ts-node-dev`  
* `npm run build` # Compila el proyecto TypeScript  
* `npm start` # Corre el build generado  

## Funcionalidades previstas

* Inventario: Registro y control de productos  
* Ventas: Registro de transacciones con control de stock  
* Compras: Ingreso de inventario al sistema  
* Reportes: Estadísticas y reportes detallados  
* Usuarios: Sistema de login con control de roles y permisos  

## Licencia

Este proyecto está licenciado bajo la licencia MIT.

## Autor

Mario Quirós