# ConcentraBackend

## DESCRIPCION DEL PROYECTO

Backend de la aplicacion concentra en node js, se conecta a la base de datos en mysql, permite insertar usuario, consultar usuario, actualizar usuario, consultar jugadores, subir imagenes a firebase, generar token, etc..

### Links
📌 Live site URL: [here](https://github.com/Tonyva002/nodeBackend)

### Built with

- Node js
- Express
- JWT
- Firebase
- Mysql

### Herramienta necerias:

Visual Studio Code

### Pasos para ejecutarlo:

- Paso 1. Descargar o clonar el repositorio.
  
- Paso 2. Descomprime el archivo si lo has descargado.
  
- Paso 3. Abrirlo en Visual Studio Code.
  
- Paso 4. Ejecutar npm install (para instalar los paquetes).
  
- Paso 5. Agregar la IP de su computadora al archivo server.js (debido a que la conexion se hace de manera local). Ver imagen.
- ![image](https://github.com/user-attachments/assets/06fe1148-d11b-411a-af7e-9974b5b1662d)

- Paso 6. Agregar esta informacion al archivo serviceAccountKey.json ( "type": "service_account",
  "project_id": "delivery-f2219",
  "private_key_id": "fa54437b93d12af02878c2cd438b9c945ef072eb",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7lTHDWK/4/AJi\n7fZUvajcrF4P2eYAcfIZsisGptlCkFPCFiq2sn6vjBbyMzkD5ATucLEcLlOFWWpV\nNDAYLEqBu1OXjQhVZUGsts4OyjQ7HQ5GocWJlQhyuCoHKtU8hXx2wWubilgGV/53\n7ibGJTHB/scbWkup/KyinhQ7OHJXO876V6hNlwlEr38Qwj7UmG7PFmnvhWC8vX2T\nD/bpgF6WD8bqhrB9t+7c+SPTkZHyEGD3sdobtoYMvIyIowDT/a9CJU4Q8CsQFmQx\nV6G3MkjCwg5tVzDKwylRJhwRjYK9VjVppoWRTs0toSqT21C0Z26kwzv+eOwwzcX1\n0zWjFoGbAgMBAAECggEACYU8hqvX3wXdIEEo727GKJe6it4UTJF770AoJDcsjCRR\nxp8c8vqfxTA8Vlk/oqoHHShJRrFTOha4lDNeUtvB82yMvgKW4Mzkm/okGy3WSpRw\nuJpWMZyHq+dUEBO6rRXnh7TM+HYyYYOZWkeTJY0k1AdRbJO/v81YiwvpGvTLWNdU\nhBadtsCA8harcG1g3RzpI/z4Lm7D0oag8zaJSVhaCSOrYW1uH8/EVjr6GB8hZKpX\nQeg4pXit5unirKBQr8eU+bfPsjDME1wLaO2kQ4tqCjiRaU8virzwyj5epa/SZqkp\nSAv1l/heGbmcRAfwmmqVzYTlL+JPblogVJZrd+NLAQKBgQD3GNa379ZIAywzlRJp\nxFMt/vvSVY9GW9+TKHGY1TM/Sy2tp4WEGanCMWQc3nsPfmd68o4WF/LlhQEPG8vq\nSWoTl5OxNT0czmP9ITkh+HcZ0GoPT9e5cjvdNl130V3RZWzx+MRsm95GG8ziqui1\nKTabEasstGyT9eqqCM/f3vyt6QKBgQDCV2lEK0PJ0C7KUjv6kTHAz+hC/KAA1F0r\nVcrU2kxQkliD3eWRt4tS7iHLnEM0CE5/R4pBqTh9Zb9ncUMc9v1rIU6HJ3ZwUGV2\n9mIrgZhXj331qqfVINZz6kaFSifRi7LywgcVyHGzyYoSLq2zlJdtsz7YvRaoxORx\nIU7bthps4wKBgQCiAv012OEskjf3EjTieED5lYfTHxozzaVHvWrOBGv3gflPNNmM\nBa+SjgPQEeep/v0mVcbnoYg3CP/qwhTvZndQpT/HHtsU+hYBMDlflqOwn0ALDhSp\nmMa7ghvCpdnXo6LM/Ij9lS0l1rB9pgWyUnVlMy6Cv0G5ubHFDsYNSQ1vkQKBgQC5\n+SIQDQL6zlDoZddlyan95DdUWyHWiWJ7RMcr95bOB63SyvaUAju+aYlHqkqZMVXE\n8TX57bDUNxj6KWXbAvSxnxbhuT7a7eSa+d4p2gNpzzPvcpbXGmx+UnOXu8Xs/a2K\nJ2jWTJGaRcPt8GNjFU/vt3btu81CReCB7ijjkhkplwKBgBd+6+AvT9nDkclXBv/+\nz3ZU3/hzeo2LXKtbBYmAmOWrkq4EXcxqqZJEhJbR42QO+Vnav0i3IhanvVOkGaCu\n+T6+PXkff5Zfqna+GXKAzIvgm0D2yDzOA0qb/nQgE46kkKs9ufK4/UT9x1I/J10m\nL3wgA/K9192EyJa8ffkdCV+V\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1a4yg@delivery-f2219.iam.gserviceaccount.com",
  "client_id": "106233455906803840601",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1a4yg%40delivery-f2219.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com")

- Ver imagen.
- ![image](https://github.com/user-attachments/assets/ac2c093a-9e3d-43d2-ba25-26f60ead9103)

  
- Paso 7. Instalar mysql en su computadora.

- Paso 8. Crear la base de datos concentra.
  
- Paso 9. Agregar la base de datos y contraseña que agrego cuando instalo mysql, en el archivo config.js. Ver imagen.
  
- ![image](https://github.com/user-attachments/assets/d3b045bc-ec05-4691-afac-c8a7a001ba1a)

  
- Paso 10. Usar el archivo db.sql  que esta en el proyecto, abrirlo y ejecutarlo en mysql para que se creen las tablas con las informaciones. Ver imagen.

- ![image](https://github.com/user-attachments/assets/e3f417c6-0d8d-45b4-85e2-f730ed98bd56)

  
- Paso 11. Ejecutar (nodemon server) en la terminal de vsc.

- ### Instalando mysql
- ### Links
📌 Live site URL: [here](https://www.mysql.com/downloads/)

- ![image](https://github.com/user-attachments/assets/6521d6ba-6592-4b80-acb6-d2f05a42b49b)

- Selecionar estas opciones al hacer la instalacion.

- ![image](https://github.com/user-attachments/assets/9fb9c975-060c-48c3-a171-93b80962adf1)

- Asignar contraseña al hacer la instalacion.

- ![image](https://github.com/user-attachments/assets/eee9fd91-7d4d-4fe4-8a5d-50d11cc7a264)




### Author

Tony Vasquez Arias
